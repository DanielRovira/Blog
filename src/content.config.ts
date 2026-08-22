import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const saudeCollection = defineCollection({
  // Mudamos o 'base' para resolver o caminho relativo ao próprio arquivo config
  loader: glob({ pattern: '**/*.md', base: new URL('./content/saude', import.meta.url) }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string()
  })
});

export const collections = {
  saude: saudeCollection,
};