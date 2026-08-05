ALTER TABLE rag_sources DROP CONSTRAINT IF EXISTS rag_sources_language_check;
ALTER TABLE rag_sources ADD CONSTRAINT rag_sources_language_check CHECK (language IS NULL OR language = ANY (ARRAY['ko'::text, 'en'::text, 'ru'::text]));

ALTER TABLE rag_chunks DROP CONSTRAINT IF EXISTS rag_chunks_language_check;
ALTER TABLE rag_chunks ADD CONSTRAINT rag_chunks_language_check CHECK (language IS NULL OR language = ANY (ARRAY['ko'::text, 'en'::text, 'ru'::text]));

ALTER TABLE rag_search_cache DROP CONSTRAINT IF EXISTS rag_search_cache_language_check;
ALTER TABLE rag_search_cache ADD CONSTRAINT rag_search_cache_language_check CHECK (language IS NULL OR language = ANY (ARRAY['ko'::text, 'en'::text, 'ru'::text]));

ALTER TABLE ask_events DROP CONSTRAINT IF EXISTS ask_events_language_check;
ALTER TABLE ask_events ADD CONSTRAINT ask_events_language_check CHECK (language IS NULL OR language = ANY (ARRAY['ko'::text, 'en'::text, 'ru'::text]));
