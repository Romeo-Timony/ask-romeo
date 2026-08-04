'use client';

import { getUiText } from '@/lib/i18n';
import { romeoProfile } from '@/lib/romeo-profile';
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
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center px-4 py-8 md:py-12"
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
          {romeoProfile.name}
        </p>
        <h2 className="text-foreground mt-1 text-2xl font-semibold md:text-4xl">
          Ask Romeo
        </h2>
        <p className="text-muted-foreground mt-2 text-sm font-medium md:text-base">
          {language === 'ru' ? romeoProfile.title : romeoProfile.titleEn}
        </p>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
          {text.presentationDescription}
        </p>
      </motion.div>
    </motion.div>
  );
}
