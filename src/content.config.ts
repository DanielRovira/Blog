import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const receitasCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/receitas', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    capa: z.string().optional()
  })
});

const viagensCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/viagens', import.meta.url) }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    capa: z.string().optional(),
    destino: z.string().optional()
  })
});

export const collections = {
  receitas: receitasCollection,
  viagens: viagensCollection,
};