'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { getUiText } from '@/lib/i18n';
import { romeoProfile } from '@/lib/romeo-profile';
import { useDisplayPreferences } from '@/lib/use-display-preferences';

export function Resume() {
  const { language } = useDisplayPreferences();
  const text = getUiText(language);

  // Resume versions with URLs and PDF downloads
  const versions = [
    {
      id: 'qa',
      label: text.resumeQa,
      url: romeoProfile.resumeQaUrl,
      pdfUrl: romeoProfile.resumeQaPdfUrl,
      downloadName: 'Резюме_Роман_Тимошенко_QA.pdf',
      dotColor: 'bg-emerald-500',
      badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      buttonAccent: 'hover:border-emerald-500/50 hover:bg-emerald-500/10',
    },
    {
      id: 'pm',
      label: text.resumePm,
      url: romeoProfile.resumePmUrl,
      pdfUrl: romeoProfile.resumePmPdfUrl,
      downloadName: 'Резюме_Роман_Тимошенко_Project_Manager.pdf',
      dotColor: 'bg-blue-500',
      badgeClass: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20',
      buttonAccent: 'hover:border-blue-500/50 hover:bg-blue-500/10',
    },
  ];

  return (
    <div className="mx-auto w-full py-4 font-sans">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/[0.04]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-lg font-semibold tracking-tight">
                {text.resumeTitle}
              </h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {romeoProfile.title}
            </p>
            <div className="text-muted-foreground/80 mt-1.5 flex items-center gap-2 text-xs">
              <span>{text.resumeUpdated}</span>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[460px]">
            {versions.map((version) => (
              <div
                key={version.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/70 bg-white/60 p-3.5 shadow-2xs backdrop-blur-xs transition-colors dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className={`h-2.5 w-2.5 rounded-full ${version.dotColor}`} />
                    {version.label}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${version.badgeClass}`}>
                    PDF / hh.ru
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={version.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/90 hover:text-foreground inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200/70 bg-white/80 px-3 py-2 text-xs font-medium transition-all hover:bg-slate-100 hover:shadow-2xs dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
                  >
                    <span>hh.ru</span>
                    <ExternalLink className="text-muted-foreground h-3.5 w-3.5" />
                  </a>

                  <a
                    href={version.pdfUrl}
                    download={version.downloadName}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200/70 bg-white/80 px-3 py-2 text-xs font-semibold shadow-2xs transition-all dark:border-white/10 dark:bg-white/[0.06] ${version.buttonAccent}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{text.download}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
