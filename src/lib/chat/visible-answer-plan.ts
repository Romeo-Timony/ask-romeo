import type { ChatLanguage } from '@/lib/i18n/detect-language';

const MAX_VISIBLE_STEPS = 3;

type TopicRule = {
  ko: string;
  en: string;
  pattern: RegExp;
};

const TOPIC_RULES: TopicRule[] = [
  { ko: 'Проверяю IDE и рабочее окружение', en: 'Review IDE and workspace', pattern: /(vscode|intellij|ide|workspace|battery|sleep|window|редактор|окно|сон|энергосбережение)/i },
  { ko: 'Проверяю сервер и Docker', en: 'Review server and Docker', pattern: /(localserver|localhost|docker|server|gui|compose|container|сервер|докер|контейнер)/i },
  { ko: 'Анализирую использование памяти', en: 'Interpret memory usage', pattern: /(memory|ram|gb|pressure|swap|память|оперативная)/i },
  { ko: 'Сверяю данные по проектам', en: 'Check project evidence', pattern: /(project|portfolio|askoosu|ask romeo|aigram|instagram|проект|портфолио)/i },
  { ko: 'Уточняю роль AI в процессе', en: 'Clarify the AI workflow', pattern: /(ai|claude|codex|gemini|agent|workflow|искусственный интеллект|агент|процесс)/i },
  { ko: 'Проверяю контекст команды', en: 'Check collaboration context', pattern: /(collaboration|teamwork|team fit|work in a team|команда|сотрудничество)/i },
  { ko: 'Уточняю профессиональную роль', en: 'Frame role positioning', pattern: /(pm|po|product owner|developer|role|position|разработчик|роль|позиция)/i },
  { ko: 'Проверяю удобный канал связи', en: 'Check contact path', pattern: /(contact|email|github|linkedin|контакт|почта|связь)/i },
  { ko: 'Уточняю риски и ограничения', en: 'Calibrate risks and constraints', pattern: /(risk|concern|dependent|solo|weak|риск|сомнение|ограничение)/i },
];

export function buildVisibleAnswerPlan(question: string | null | undefined, language: ChatLanguage) {
  const normalizedQuestion = normalizeQuestion(question ?? '');
  if (!normalizedQuestion) return getDefaultVisiblePlan(language);

  const matchedTopics = uniqueValues(TOPIC_RULES.filter((rule) => rule.pattern.test(question ?? '')).map((rule) => rule[language]));
  if (matchedTopics.length > 0) {
    if (matchedTopics.length >= 2 || shouldSplitLongQuestion(normalizedQuestion)) return matchedTopics.slice(0, MAX_VISIBLE_STEPS);
    return [getQuestionSplitLabel(language, normalizedQuestion), ...matchedTopics].slice(0, MAX_VISIBLE_STEPS);
  }
  return shouldSplitLongQuestion(normalizedQuestion) ? getLongQuestionPlan(language) : getDefaultVisiblePlan(language);
}

function shouldSplitLongQuestion(question: string) {
  return question.length >= 80 || question.split(/[?？]/).filter(Boolean).length > 1 || /(и ещё|также|наконец|дополнительно|во-вторых|first|second|also|lastly)/i.test(question);
}

function getQuestionSplitLabel(language: ChatLanguage, question: string) {
  if (shouldSplitLongQuestion(question)) return language === 'ko' ? 'Разбиваю вопрос на 2–3 части' : 'Splitting the longer question into 2–3 points';
  return language === 'ko' ? 'Уточняю смысл вопроса' : 'Checking the question intent';
}

function getDefaultVisiblePlan(language: ChatLanguage) {
  return language === 'ko' ? ['Уточняю запрос', 'Проверяю источники Wiki и FAQ', 'Собираю структурированный ответ'] : ['Check intent', 'Review Wiki/FAQ evidence', 'Shape the answer'];
}

function getLongQuestionPlan(language: ChatLanguage) {
  return language === 'ko' ? ['Разбиваю вопрос на 2–3 части', 'Проверяю источники для каждой части', 'Убираю повторы и структурирую ответ'] : ['Splitting the longer question into 2–3 points', 'Checking evidence for each point', 'Removing repeated answer blocks'];
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeQuestion(input: string) {
  return input.trim().replace(/\s+/g, ' ').replace(/[“”‘’]/g, "'").toLowerCase();
}
