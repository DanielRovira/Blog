# Projeto Multi-Blogs em Astro 🚀

Bem-vindo ao seu projeto Astro estruturado para **múltiplos nichos (sub-blogs)**!

Diferente do template padrão do Astro (que possui apenas um blog genérico), este projeto foi arquitetado para comportar diversos assuntos independentes dentro do mesmo domínio (ex: `/receitas`, `/viagens`), compartilhando layouts inteligentes, componentes reutilizáveis e uma arquitetura de rotas dinâmicas por convenção.

## 📁 Estrutura do Projeto

A arquitetura gira em torno de pilares modernos que eliminam a duplicação de código:

1. **`src/config/nichos.js`**: O "Coração" de configuração do portal. Define os títulos, descrições, cores e links de cada sub-blog e da home.
2. **`src/content.config.ts`**: Utiliza as **Content Collections** (Astro 5) com loaders glob para gerenciar e tipar os Markdowns de cada nicho.
3. **`src/layouts/LayoutDinamico.astro`**: Layout global inteligente que adapta headers, footers e identidades visuais com base no nicho ativo.
4. **Rotas Dinâmicas (`[niche]`)**: Um único conjunto de arquivos gerencia todas as listagens e artigos de qualquer nicho automaticamente.

### Visão Geral de Pastas

```text
/
├── public/                    <-- Arquivos publicos que nao passam pelo Astro
├── scripts/
│   └── converter_imagens_para_webp.py
├── src/
│   ├── config/
│   │   └── nichos.js           <-- Configurações globais de temas, cores e links
│   ├── content/
│   │   ├── receitas/           <-- Artigos e imagens WebP de Receitas
│   │   └── viagens/            <-- Artigos e imagens WebP de Viagens
│   ├── layouts/
│   │   └── LayoutDinamico.astro <-- Layout mestre responsivo aos nichos
│   ├── pages/
│   │   ├── index.astro         <-- Home principal do portal
│   │   ├── blogs/
│   │   │   └── index.astro     <-- Listagem dinâmica de todos os blogs disponíveis
│   │   └── [niche]/
│   │       ├── index.astro     <-- Listagem dinâmica dos posts do nicho (Grid)
│   │       └── contents/
│   │           └── [slug].astro <-- Página de leitura dinâmica do artigo
│   └── content.config.ts       <-- Declaração das coleções e esquemas Zod (Astro 5)

```

---

## 🛠️ Como Adicionar um Novo Nicho (Passo a Passo)

Sempre que você quiser criar um novo sub-blog (por exemplo, "Tecnologia"), siga estes passos enxutos:

### Passo 1: Atualizar o arquivo de Configuração

Abra `src/config/nichos.js` e adicione o seu novo nicho ao objeto exportado:

```javascript
export const configNichos = {
  // ... nichos existentes (default, receitas, viagens)
  tecnologia: {
    title: "Mundo Tech",
    color: "#8b5cf6", // Cor de destaque
    description: "Análises de tecnologia e inovação.",
    links: [
      { label: "Home", url: "/tecnologia" },
      { label: "Conteúdos", url: "/tecnologia/contents" }
    ]
  }
};

```

### Passo 2: Declarar a Coleção de Conteúdo

Abra `src/content.config.ts` e adicione a nova coleção utilizando o loader do Astro:

```typescript
const tecnologiaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/tecnologia', import.meta.url) }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string()
  })
});

export const collections = {
  // ... outras coleções
  tecnologia: tecnologiaCollection,
};

```

### Passo 3: Criar as Pastas Físicas (Conteúdo e Imagens)

1. **Markdowns:** Crie uma pasta para cada artigo em `src/content/tecnologia/meu-artigo/` e salve o conteúdo como `index.md`.
2. **Imagens do artigo (Opcional):** Salve a capa como `capa.webp` e as demais imagens como `imagem1.webp`, `imagem2.webp` etc. Use caminhos relativos no Markdown, por exemplo `![Descrição](./imagem1.webp)`.
3. **Padronização:** Se você colocar imagens JPEG, PNG, AVIF ou outro WebP nessas pastas, use o script de conversão descrito abaixo antes de enviar as alterações para o repositório.

Com essa estrutura, **nenhum arquivo de rota nova precisa ser criado**. O sistema dinâmico assume o controle de tudo instantaneamente.

---

## 🧹 Boas Práticas e Convenções

* **Convenção sobre Configuração:** As imagens das capas são importadas de `src/content` e processadas pelo pipeline de imagens do Astro.
* **Fallback Automático:** Se um post não possuir `capa.webp`, o layout renderiza uma caixinha colorida de fallback baseada na cor configurada no `nichos.js`.

## Converter Imagens para WebP

O script `scripts/converter_imagens_para_webp.py` percorre recursivamente as pastas de `src/content`, converte imagens `.jpg`, `.jpeg`, `.png`, `.avif` e `.webp` para WebP e mantém o mesmo nome do arquivo. Por segurança, ele apenas simula as alterações por padrão.

Antes de aplicar, verifique a lista de conversões:

```bash
python3 scripts/converter_imagens_para_webp.py
```

Executar a conversão e remover os arquivos originais:

```bash
python3 scripts/converter_imagens_para_webp.py --apply
```

Executar a conversão mantendo os arquivos originais:

```bash
python3 scripts/converter_imagens_para_webp.py --apply --keep-originals
```

Alterar a qualidade do WebP, usando um valor entre 1 e 100:

```bash
python3 scripts/converter_imagens_para_webp.py --apply --quality 85
```

O script exige Pillow. Caso ainda não esteja instalado:

```bash
python3 -m pip install Pillow
```

---

## 🚀 Comandos Úteis

* `pnpm run dev`: Inicia o servidor local de desenvolvimento.
* `pnpm run build`: Compila a versão estática de produção do site na pasta `dist/`.
* `pnpm run astro sync`: Atualiza as tipagens internas do Astro para as coleções de conteúdo.

## Ícones
https://www.svgrepo.com/collection/flat-icon-design-dark-vectors