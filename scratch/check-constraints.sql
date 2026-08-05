SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid IN ('ask_events'::regclass, 'rag_search_cache'::regclass, 'rag_chunks'::regclass, 'rag_sources'::regclass);
