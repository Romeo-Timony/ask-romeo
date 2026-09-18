import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'Show Romeo Timony resumes (QA Engineer and Project Manager) with hh.ru links and direct PDF downloads.',
  inputSchema: z.object({}),
  execute: async () => {
    return 'Резюме Романа Тимошенко (QA-инженер и Project Manager) отображены со ссылками на hh.ru и кнопками для прямого скачивания PDF.';
  },
});
