import type { ChatLanguage } from '@/lib/i18n/detect-language';

export const PROMPT_LEAK_DETECTED_ERROR_CODE = 'prompt_leak_detected';

const PROMPT_LEAKAGE_PATTERNS = [
  /Retrieved Wiki Context/i,
  /chunk_id\s*=/i,
  /entity_id\s*=/i,
  /section_path\s*=/i,
  /SYSTEM_PROMPT/i,
  /RAG_CHAT_SYSTEM_PROMPT/i,
];

export function detectPromptLeakage(answer: string) {
  return PROMPT_LEAKAGE_PATTERNS.some((pattern) => pattern.test(answer));
}

export function buildInsufficientEvidenceAnswer(language: ChatLanguage) {
  if (language === 'ko') {
    return [
      'В Wiki недостаточно подтверждённых данных для уверенного ответа на этот вопрос.',
      '',
      'Попробуйте спросить об опыте Романа, его QA-проектах, навыках или способах связи.',
    ].join('\n');
  }

  return [
    'I could not find enough Wiki evidence to answer that confidently.',
    '',
    'Try asking about AskOosu architecture, representative projects, skills, or contact details.',
  ].join('\n');
}
