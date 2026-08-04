import { createHash } from 'node:crypto';
import pg from 'pg';

const { Pool } = pg;

const folderId = process.env.GDRIVE_FOLDER_ID || '1glzsHH-WyCUMtJsrnTxFE14wGanYGB8F';
const googleApiKey = process.env.GOOGLE_API_KEY;
const embeddingModel = process.env.ASKOOSU_EMBEDDING_MODEL || 'text-embedding-3-small';
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const openAiApiKey = process.env.OPENAI_API_KEY;

if (!databaseUrl || !openAiApiKey) {
  console.error('Usage: DATABASE_URL=... OPENAI_API_KEY=... [GOOGLE_API_KEY=...] node scripts/sync-gdrive-rag.mjs [folderId]');
  process.exit(1);
}

console.log(`[Google Drive RAG Sync] Target Folder ID: ${folderId}`);

// If Google API Key is provided, fetch list of files from Drive API v3
async function listGoogleDriveFiles() {
  if (!googleApiKey) {
    console.log('[Google Drive RAG Sync] No GOOGLE_API_KEY provided; fetching public Drive folder metadata...');
  }

  if (googleApiKey) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,modifiedTime)&key=${googleApiKey}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.files || [];
    }
  }

  // Fallback: Return folder info
  return [];
}

async function fetchFileContent(fileId, mimeType) {
  let downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  if (mimeType === 'application/vnd.google-apps.document') {
    downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=txt`;
  }

  const res = await fetch(downloadUrl);
  if (!res.ok) {
    throw new Error(`Failed to download Google Drive file ${fileId} (${res.status})`);
  }
  return await res.text();
}

async function main() {
  console.log('[Google Drive RAG Sync] Starting Google Drive synchronization...');
  const files = await listGoogleDriveFiles();

  if (files.length === 0) {
    console.log('[Google Drive RAG Sync] Google Drive folder is configured. Pass GOOGLE_API_KEY or place markdown files in docs/rag for local sync.');
    process.exit(0);
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const client = await pool.connect();

  try {
    for (const file of files) {
      console.log(`[Google Drive RAG Sync] Processing ${file.name} (${file.id})...`);
      const content = await fetchFileContent(file.id, file.mimeType);
      if (!content || !content.trim()) continue;

      const sourceKey = `gdrive.${file.id}`;
      const title = file.name.replace(/\.[^/.]+$/, '');
      const language = /[А-Яа-яЁё]/.test(content) ? 'ko' : 'en';

      const chunks = buildChunks(content, title);
      if (chunks.length === 0) continue;

      const embeddings = await createEmbeddings(chunks.map((c) => c.content));

      await client.query('BEGIN');
      const sourceResult = await client.query(
        `
          INSERT INTO rag_sources
            (type, source_key, title, language, last_synced_at, created_at, updated_at)
          VALUES ('gdrive', $1, $2, $3, now(), now(), now())
          ON CONFLICT (type, source_key) DO UPDATE SET
            title = EXCLUDED.title,
            language = EXCLUDED.language,
            last_synced_at = now(),
            updated_at = now()
          RETURNING id
        `,
        [sourceKey, title, language]
      );
      const sourceId = sourceResult.rows[0].id;
      const activeChunkIds = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkId = `${sourceKey}.${String(i + 1).padStart(3, '0')}`;
        const contentHash = createHash('sha256').update(chunk.content).digest('hex');
        const metadata = {
          sourceKind: 'gdrive',
          sourceKey,
          gdriveFileId: file.id,
          language,
          sectionHeading: chunk.sectionHeading,
          sectionPath: chunk.sectionPath,
          visibility: 'public',
          freshness: 'current',
        };

        await client.query(
          `
            INSERT INTO rag_chunks
              (source_id, chunk_id, entity_id, title, section_path, content,
               content_hash, metadata, visibility, freshness, has_todo,
               confidence, language, embedding, created_at, updated_at)
            VALUES
              ($1, $2, null, $3, $4, $5, $6, $7::jsonb, 'public', 'current',
               false, 0.9, $8, $9::vector, now(), now())
            ON CONFLICT (source_id, chunk_id) DO UPDATE SET
              title = EXCLUDED.title,
              section_path = EXCLUDED.section_path,
              content = EXCLUDED.content,
              content_hash = EXCLUDED.content_hash,
              metadata = EXCLUDED.metadata,
              language = EXCLUDED.language,
              embedding = EXCLUDED.embedding,
              updated_at = now()
          `,
          [
            sourceId,
            chunkId,
            `${title} — ${chunk.sectionHeading}`,
            chunk.sectionPath,
            chunk.content,
            contentHash,
            JSON.stringify(metadata),
            language,
            `[${embeddings[i].join(',')}]`,
          ]
        );
        activeChunkIds.push(chunkId);
      }

      await client.query(
        `DELETE FROM rag_chunks WHERE source_id = $1 AND NOT (chunk_id = ANY($2::text[]))`,
        [sourceId, activeChunkIds]
      );
      await client.query('COMMIT');

      console.log(`[Google Drive RAG Sync] Synced ${chunks.length} chunks for ${title}`);
    }
  } finally {
    client.release();
    await pool.end();
  }
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
      throw new Error(`OpenAI embeddings failed (${response.status}): ${payload.error?.message || 'unknown error'}`);
    }
    output.push(...payload.data.sort((a, b) => a.index - b.index).map((item) => item.embedding));
  }
  return output;
}

main().catch((err) => {
  console.error('[Google Drive RAG Sync Error]:', err);
  process.exit(1);
});
