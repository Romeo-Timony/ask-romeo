# Ask Romeo

AI-connected portfolio for **Romeo Timony** (QA Engineer / Prompt Engineer).

Adapted from [AskOosu](https://github.com/oosuhada/AskOosu): conversational Ask UI, RAG-ready knowledge layer, Docker deploy.

Live (VPS): http://91.132.196.202  
Repo: https://github.com/Romeo-Timony/ask-romeo

## Features (MVP)

- Chat “Ask Romeo” with OpenAI
- RU / EN UI (Russian uses internal locale key `ko` for compatibility)
- Center **video visit card** placeholder (replace later with real mp4/webm)
- Static profile/projects knowledge (full RAG/Notion later)
- Docker image on port **80**

## Local

```bash
pnpm install
cp .env.example .env.local
# set OPENAI_API_KEY
pnpm dev
```

## Production (Docker)

```bash
cp .env.production.example .env.production
# set OPENAI_API_KEY and NEXT_PUBLIC_APP_URL
docker compose up -d --build
```

App listens on host port **80** → container `3000`.

## Notes

- Do not commit `.env.production`
- n8n / host Postgres / cloudflared on the VPS are left untouched
- Knowledge base content and real video will be filled in later
