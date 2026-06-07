import { defineCollection, z } from 'astro:content';

const fiches = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    pathologie: z.string(),
    zone: z.enum(['dos', 'épaule', 'genou', 'cheville', 'pied', 'hanche', 'coude', 'poignet', 'cou', 'autre']),
    niveau: z.enum(['débutant', 'intermédiaire', 'avancé']),
    duree: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    pubDate: z.date(),
  }),
});

export const collections = { fiches };
