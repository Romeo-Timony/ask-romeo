#!/bin/bash
set -e

# Load environment
set -a
source /root/ask-romeo/.env.production
set +a

# Clean DB
echo "Cleaning existing RAG DB entries..."
docker exec ask-romeo-postgres psql -U ask_romeo -d ask_romeo -c "TRUNCATE TABLE rag_chunks, rag_sources CASCADE;"

# Copy scripts and RAG docs into the container (using root permission)
echo "Copying scripts and markdown documents into app container..."
docker exec -u root ask-romeo-app mkdir -p /app/scripts
docker exec -u root ask-romeo-app mkdir -p /app/docs/rag
docker cp /root/ask-romeo/scripts/import-markdown-rag.mjs ask-romeo-app:/app/scripts/
docker cp /root/ask-romeo/docs/rag/romeo-answer-guidance-ru.md ask-romeo-app:/app/docs/rag/
docker cp /root/ask-romeo/docs/rag/romeo-answer-guidance-en.md ask-romeo-app:/app/docs/rag/
docker cp /root/ask-romeo/docs/rag/romeo-past-work-experience-ru.md ask-romeo-app:/app/docs/rag/
docker cp /root/ask-romeo/docs/rag/romeo-past-work-experience-en.md ask-romeo-app:/app/docs/rag/
docker exec -u root ask-romeo-app chown -R nextjs:nodejs /app/scripts /app/docs/rag

# Run import inside the container
echo "Importing RU Answer Guidance..."
docker exec -e DATABASE_URL="${DATABASE_URL}" -e OPENAI_API_KEY="${OPENAI_API_KEY}" -w /app ask-romeo-app node scripts/import-markdown-rag.mjs docs/rag/romeo-answer-guidance-ru.md romeo.answer-guidance.ru ru

echo "Importing EN Answer Guidance..."
docker exec -e DATABASE_URL="${DATABASE_URL}" -e OPENAI_API_KEY="${OPENAI_API_KEY}" -w /app ask-romeo-app node scripts/import-markdown-rag.mjs docs/rag/romeo-answer-guidance-en.md romeo.answer-guidance.en en

echo "Importing RU Past Experience..."
docker exec -e DATABASE_URL="${DATABASE_URL}" -e OPENAI_API_KEY="${OPENAI_API_KEY}" -w /app ask-romeo-app node scripts/import-markdown-rag.mjs docs/rag/romeo-past-work-experience-ru.md romeo.past-work-experience.ru ru

echo "Importing EN Past Experience..."
docker exec -e DATABASE_URL="${DATABASE_URL}" -e OPENAI_API_KEY="${OPENAI_API_KEY}" -w /app ask-romeo-app node scripts/import-markdown-rag.mjs docs/rag/romeo-past-work-experience-en.md romeo.past-work-experience.en en

echo "All RAG files successfully imported!"
