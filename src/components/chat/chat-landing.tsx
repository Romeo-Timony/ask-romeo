'use client';

import { getUiText } from '@/lib/i18n';
import { oosuProfile } from '@/lib/oosu-profile';
import { useDisplayPreferences } from '@/lib/use-display-preferences';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ChatLandingProps {
  hasReachedLimit?: boolean;
}

export default function ChatLanding({
  hasReachedLimit = false,
}: ChatLandingProps) {
  const { language } = useDisplayPreferences();
  const text = getUiText(language);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial={false}
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center">
        <div
          className={`mx-auto mb-5 ${hasReachedLimit ? 'opacity-70' : ''}`}
        >
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-teal-400/70 bg-slate-900 shadow-[0_0_45px_rgba(20,184,166,0.25)] md:h-44 md:w-44">
            <Image
              src="/images/profile/romeo-timony-new.webp"
              alt="Romeo Timony (Роман Тимошенко)"
              fill
              priority
              sizes="(min-width: 768px) 176px, 144px"
              className="scale-[1.35] object-cover"
              style={{ objectPosition: '50% 34%' }}
            />
          </div>
        </div>
        <p className="text-sm font-medium text-neutral-500">
          {oosuProfile.name}
        </p>
        <h2 className="text-foreground mt-1 text-2xl font-semibold md:text-4xl">
          Ask Romeo
        </h2>
        <p className="text-muted-foreground mt-2 text-sm font-medium md:text-base">
          {language === 'ko' ? oosuProfile.title : oosuProfile.titleEn}
        </p>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
          {text.presentationDescription}
        </p>
      </motion.div>
    </motion.div>
  );
}
