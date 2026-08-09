import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const { Pool } = pg;

const documentPath = process.argv[2];
const sourceKey = process.argv[3] || documentPath;
const language = process.argv[4] || 'ru';
const embeddingModel =
  process.env.ASKOOSU_EMBEDDING_MODEL || 'text-embedding-3-small';
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const openAiApiKey = process.env.OPENAI_API_KEY;

if (!documentPath || !databaseUrl || !openAiApiKey) {
  console.error(
    'Usage: DATABASE_URL=... OPENAI_API_KEY=... node scripts/import-markdown-rag.mjs <document.md> [source-key] [ko|en]'
  );
  process.exit(1);
}

const absoluteDocumentPath = path.resolve(documentPath);
const markdown = await readFile(absoluteDocumentPath, 'utf8');
const { frontmatter, body } = parseFrontmatter(markdown);
const documentTitle =
  unquote(frontmatter.title) ||
  body.match(/^#\s+(.+)$/m)?.[1]?.trim() ||
  path.basename(documentPath, path.extname(documentPath));
const chunks = buildChunks(body, documentTitle).filter(
  (chunk) => !/пункты для проверки владельцем данных/i.test(chunk.sectionHeading)
);

if (chunks.length === 0) {
  throw new Error('No RAG chunks were produced from the Markdown document.');
}

const embeddings = await createEmbeddings(chunks.map((chunk) => chunk.content));
const pool = new Pool({ connectionString: databaseUrl });
const client = await pool.connect();

try {
  await client.query('BEGIN');
  const sourceResult = await client.query(
    `
      INSERT INTO rag_sources
        (type, source_key, title, language, last_synced_at, created_at, updated_at)
      VALUES ('markdown', $1, $2, $3, now(), now(), now())
      ON CONFLICT (type, source_key) DO UPDATE SET
        title = EXCLUDED.title,
        language = EXCLUDED.language,
        last_synced_at = now(),
        updated_at = now()
      RETURNING id
    `,
    [sourceKey, documentTitle, language]
  );
  const sourceId = sourceResult.rows[0].id;
  const activeChunkIds = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const chunkId = `${sourceKey}.${String(index + 1).padStart(3, '0')}`;
    const contentHash = createHash('sha256')
      .update(chunk.content)
      .digest('hex');
    const entityId = extractEntityId(chunk.content);
    const metadata = {
      sourceKind: 'local_markdown',
      sourceKey,
      documentPath: sourceKey,
      docId: frontmatter.docId || sourceKey,
      sourceType: frontmatter.sourceType || 'professional-experience',
      language,
      sectionHeading: chunk.sectionHeading,
      sectionPath: chunk.sectionPath,
      visibility: 'public',
      freshness: 'current',
      confidence: frontmatter.confidence || 'medium',
    };

    await client.query(
      `
        INSERT INTO rag_chunks
          (source_id, chunk_id, entity_id, title, section_path, content,
           content_hash, metadata, visibility, freshness, has_todo,
           confidence, language, embedding, created_at, updated_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, 'public', 'current',
           false, $9, $10, $11::vector, now(), now())
        ON CONFLICT (source_id, chunk_id) DO UPDATE SET
          entity_id = EXCLUDED.entity_id,
          title = EXCLUDED.title,
          section_path = EXCLUDED.section_path,
          content = EXCLUDED.content,
          content_hash = EXCLUDED.content_hash,
          metadata = EXCLUDED.metadata,
          visibility = EXCLUDED.visibility,
          freshness = EXCLUDED.freshness,
          has_todo = EXCLUDED.has_todo,
          confidence = EXCLUDED.confidence,
          language = EXCLUDED.language,
          embedding = EXCLUDED.embedding,
          updated_at = now()
      `,
      [
        sourceId,
        chunkId,
        entityId,
        `${documentTitle} — ${chunk.sectionHeading}`,
        chunk.sectionPath,
        chunk.content,
        contentHash,
        JSON.stringify(metadata),
        normalizeConfidence(frontmatter.confidence),
        language,
        `[${embeddings[index].join(',')}]`,
      ]
    );
    activeChunkIds.push(chunkId);
  }

  await client.query(
    `DELETE FROM rag_chunks WHERE source_id = $1 AND NOT (chunk_id = ANY($2::text[]))`,
    [sourceId, activeChunkIds]
  );
  await client.query('COMMIT');

  console.log(
    JSON.stringify({
      ok: true,
      sourceKey,
      title: documentTitle,
      chunks: chunks.length,
      embeddings: embeddings.length,
      embeddingModel,
    })
  );
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
}

function parseFrontmatter(value) {
  const match = value.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: value };

  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const delimiter = line.indexOf(':');
    if (delimiter < 1) continue;
    frontmatter[line.slice(0, delimiter).trim()] = unquote(
      line.slice(delimiter + 1).trim()
    );
  }
  return { frontmatter, body: value.slice(match[0].length) };
}

function buildChunks(markdownBody, fallbackTitle) {
  const sections = [];
  const headingPath = [];
  let current = {
    sectionHeading: fallbackTitle,
    sectionPath: [fallbackTitle],
    lines: [],
  };

  for (const line of markdownBody.split(/\r?\n/)) {
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      if (current.lines.some((item) => item.trim())) sections.push(current);
      const level = heading[1].length;
      const text = heading[2].trim();
      headingPath.splice(level - 1);
      headingPath[level - 1] = text;
      current = {
        sectionHeading: text,
        sectionPath: headingPath.filter(Boolean),
        lines: [],
      };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.some((item) => item.trim())) sections.push(current);

  return sections.flatMap((section) =>
    splitText(section.lines.join('\n').trim(), 1400, 180).map((content) => ({
      sectionHeading: section.sectionHeading,
      sectionPath: section.sectionPath,
      content: `${section.sectionPath.join(' > ')}\n\n${content}`,
    }))
  );
}

function splitText(value, maxLength, overlap) {
  const paragraphs = value.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
  const output = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if (!current) {
      current = paragraph;
      continue;
    }
    if (`${current}\n\n${paragraph}`.length <= maxLength) {
      current = `${current}\n\n${paragraph}`;
      continue;
    }
    output.push(current);
    current = `${current.slice(-overlap)}\n\n${paragraph}`;
  }
  if (current) output.push(current);

  return output.flatMap((item) => {
    if (item.length <= maxLength) return [item];
    const pieces = [];
    for (let offset = 0; offset < item.length; offset += maxLength - overlap) {
      pieces.push(item.slice(offset, offset + maxLength));
    }
    return pieces;
  });
}

async function createEmbeddings(inputs) {
  const output = [];
  for (let offset = 0; offset < inputs.length; offset += 64) {
    const batch = inputs.slice(offset, offset + 64);
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: embeddingModel, input: batch }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(
        `OpenAI embeddings failed (${response.status}): ${payload.error?.message || 'unknown error'}`
      );
    }
    output.push(...payload.data.sort((a, b) => a.index - b.index).map((item) => item.embedding));
  }
  return output;
}

function extractEntityId(value) {
  return value.match(/\*\*Entity ID:\*\*\s*`([^`]+)`/i)?.[1] || null;
}

function normalizeConfidence(value) {
  if (value === 'high') return 0.95;
  if (value === 'low') return 0.55;
  return 0.8;
}

function unquote(value) {
  return String(value || '').replace(/^['"]|['"]$/g, '').trim();
}
