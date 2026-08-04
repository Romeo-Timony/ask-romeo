import { romeoProfile, romeoProjects } from '@/lib/romeo-profile';
import { chunkLongText, normalizeText } from './text';
import type { RagChunk } from './types';

export function getStaticChunks(): RagChunk[] {
  const profileText = normalizeText(`
Name: ${romeoProfile.name}
Title: ${romeoProfile.title}
Location: ${romeoProfile.location}
Residence: ${romeoProfile.residence}
Education: ${romeoProfile.education}
Email: ${romeoProfile.email}
GitHub: ${romeoProfile.github}
LinkedIn: ${romeoProfile.linkedin}
Instagram: ${romeoProfile.instagram}
Portfolio: ${romeoProfile.currentPortfolioUrl}
Wiki: ${romeoProfile.notionWikiUrl}
  `);

  return [
    ...chunkLongText({
      id: 'static-profile',
      title: 'Romeo profile',
      source: 'static',
      text: profileText,
      url: romeoProfile.notionSourceUrl,
      metadata: {
        sourceKind: 'profile',
      },
    }),
    ...romeoProjects.flatMap((project) =>
      chunkLongText({
        id: `static-project-${project.title}`,
        title: project.title,
        source: 'static',
        text: normalizeText(
          [
            project.category,
            project.date,
            project.description,
            project.techStack.join(', '),
            project.links.map((link) => `${link.name}: ${link.url}`).join('\n'),
          ].join('\n')
        ),
        url: project.links[0]?.url,
        metadata: {
          sourceKind: 'project',
          category: project.category,
          date: project.date,
        },
      })
    ),
  ];
}
