import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const saudeCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/saude', import.meta.url) }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string()
  })
});

const viagensCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/viagens', import.meta.url) }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string(),
    destino: z.string().optional()
  })
});

export const collections = {
  saude: saudeCollection,
  viagens: viagensCollection,
};