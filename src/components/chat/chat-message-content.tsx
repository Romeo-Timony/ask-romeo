'use client';

import type { UIMessage } from 'ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Component, useState, type ReactNode } from 'react';
import { RagEvidencePanel } from './rag-evidence';
import {
  hasRichAnswerPayload,
  RichAnswerRenderer,
} from './rich-answer-renderer';
import { normalizeMarkdownSpacing } from '@/lib/chat/markdown-spacing';
import { QuoteBlock } from '@/components/ui/quote-block';

export type ChatMessageContentProps = {
  message: UIMessage;
  isLast?: boolean;
  isLoading?: boolean;
  regenerate?: () => Promise<void>;
  skipToolRendering?: boolean;
  feedbackContext?: {
    sessionId?: string | null;
    question?: string | null;
  };
};

const CodeBlock = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Extract language if present in the first line
  const firstLineBreak = content.indexOf('\n');
  const firstLine = content.substring(0, firstLineBreak).trim();
  const language = firstLine || 'text';
  const code = firstLine ? content.substring(firstLineBreak + 1) : content;

  // Get first few lines for preview
  const previewLines = code.split('\n').slice(0, 1).join('\n');
  const hasMoreLines = code.split('\n').length > 1;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="my-4 w-full overflow-hidden rounded-md"
    >
      <div className="bg-secondary text-secondary-foreground flex items-center justify-between rounded-t-md border-b px-4 py-1">
        <span className="text-xs">
          {language !== 'text' ? language : 'Code'}
        </span>
        <CollapsibleTrigger className="hover:bg-secondary/80 rounded p-1">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
      </div>

      <div className="bg-accent/80 text-accent-foreground rounded-b-md">
        {!isOpen && hasMoreLines ? (
          <pre className="px-4 py-3">
            <code className="text-sm">{previewLines + '\n...'}</code>
          </pre>
        ) : (
          <CollapsibleContent>
            <div className="custom-scrollbar" style={{ overflowX: 'auto' }}>
              <pre className="min-w-max px-4 py-3">
                <code className="text-sm whitespace-pre">{code}</code>
              </pre>
            </div>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};

export default function ChatMessageContent({
  message,
  feedbackContext,
}: ChatMessageContentProps) {
  const messageText = getMessageText(message);
  const hasRichAnswer =
    message.role === 'assistant' && hasRichAnswerPayload(message.metadata);

  // Only handle text parts
  const renderContent = () => {
    if (hasRichAnswer) {
      return (
        <RichAnswerErrorBoundary
          fallback={<PlainMarkdownContent content={messageText} />}
        >
          <RichAnswerRenderer
            metadata={message.metadata}
            markdownContent={messageText}
          />
        </RichAnswerErrorBoundary>
      );
    }

    return message.parts?.map((part, partIndex) => {
      if (part.type !== 'text' || !part.text) return null;

      // Split content by code block markers
      const contentParts = part.text.split('```');

      return (
        <div key={partIndex} className="w-full space-y-4">
          {contentParts.map((content, i) =>
            i % 2 === 0 ? (
              // Regular text content
              <PlainMarkdownContent key={`text-${i}`} content={content} />
            ) : (
              // Code block content
              <CodeBlock key={`code-${i}`} content={content} />
            )
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      {renderContent()}
      {message.role === 'assistant' && (
        <RagEvidencePanel
          metadata={message.metadata}
          feedbackContext={{
            sessionId: feedbackContext?.sessionId,
            messageId: message.id,
            question: feedbackContext?.question,
            answer: messageText,
          }}
        />
      )}
    </div>
  );
}

function PlainMarkdownContent({ content }: { content: string }) {
  const localizedContent = localizeLegacyRepeatedAnswer(content);

  return (
    <div className="prose dark:prose-invert w-full whitespace-normal leading-7">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="my-2 break-words first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-2 list-disc space-y-2 pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 list-decimal space-y-2 pl-5">{children}</ol>
          ),
          li: ({ children }) => <li className="my-0 pl-0">{children}</li>,
          blockquote: ({ children }) => (
            <QuoteBlock attribution="Romeo">{children}</QuoteBlock>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {normalizeMarkdownSpacing(localizedContent)}
      </Markdown>
    </div>
  );
}

function localizeLegacyRepeatedAnswer(content: string) {
  const contactFollowUp = `Способы связи и форматы сотрудничества указаны выше. Чтобы перейти к предметному разговору, напишите:\n\n- кратко о продукте и текущей задаче;\n- какие QA-риски или процессы нужно улучшить;\n- ожидаемый результат и сроки;\n- удобный канал для дальнейшей связи.\n\nДля быстрого контакта используйте почту или Telegram.`;

  if (
    content.includes('В этом диалоге мы уже обсуждали тему «Контакты»') ||
    (content.includes('이 대화 안에서는') && content.includes('"Контакты"'))
  ) {
    return contactFollowUp;
  }

  if (!content.includes('이 대화 안에서는')) return content;

  const repeatedLabel = content.match(
    /^이 대화 안에서는(?: "([^"]+)")? 질문을/
  )?.[1];
  const topic = repeatedLabel ? ` тему «${repeatedLabel}»` : ' этот вопрос';

  return `В этом диалоге мы уже обсуждали${topic}. Чтобы не повторять ту же карточку, продолжим с другого ракурса.\n\nМожно уточнить вопрос так:\n- Свяжи это с примерами из проектов\n- Покажи подтверждение через технологии и опыт\n- Сформулируй ответ с точки зрения найма или сотрудничества`;
}

class RichAnswerErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('Rich answer render failed. Showing plain answer.', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();
}
