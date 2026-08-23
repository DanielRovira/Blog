# Projeto Multi-Blogs em Astro 🚀

Bem-vindo ao seu projeto Astro estruturado para **múltiplos nichos (sub-blogs)**! 

Diferente do template padrão do Astro (que possui apenas um blog genérico), este projeto foi arquitetado para comportar diversos assuntos independentes dentro do mesmo domínio (ex: `/saude`, `/viagens`), compartilhando os mesmos componentes base, mas possuindo identidade visual e dados de navegação únicos.

## 📁 Estrutura do Projeto

A arquitetura gira em torno de três pilares principais:

1. **`src/config/nichos.js`**: O "Coração" do projeto. Aqui você define os nichos, suas cores principais e os links de navegação do menu de cada sub-blog.
2. **`src/content.config.ts`**: Utiliza as **Content Collections** (Astro 5) para separar os arquivos Markdown de cada nicho de forma segura e tipada.
3. **`src/layouts/LayoutDinamico.astro`**: Um layout global inteligente. Ele recebe a propriedade `nicho` (ex: `nicho="saude"`), lê as configurações no `nichos.js` e pinta o header/footer automaticamente com a cor daquele nicho, montando os links corretos.

### Visão Geral de Pastas
```text
/
├── src/
│   ├── config/
│   │   └── nichos.js           <-- Configurações de tema, cores e links
│   ├── content/
│   │   ├── saude/              <-- Markdowns do nicho de Saúde
│   │   └── viagens/            <-- Markdowns do nicho de Viagens
│   ├── layouts/
│   │   └── LayoutDinamico.astro <-- Layout mestre responsivo aos nichos
│   ├── pages/
│   │   ├── saude/              <-- Rotas (Páginas) do nicho Saúde
│   │   ├── viagens/            <-- Rotas (Páginas) do nicho Viagens
│   │   └── index.astro         <-- Home principal (que lista todos os nichos no Header)
│   └── content.config.ts       <-- Declaração das coleções (Astro 5)
```

---

## 🛠️ Como Adicionar um Novo Nicho (Passo a Passo)

Sempre que você quiser criar um novo sub-blog (por exemplo, "Tecnologia"), siga estes passos exatos:

### Passo 1: Atualizar o arquivo de Configuração
Abra `src/config/nichos.js` e adicione o seu novo nicho ao objeto exportado:
```javascript
export const configNichos = {
  // ... nichos existentes
  tecnologia: {
    nome: "Mundo Tech",
    cor: "#8b5cf6", // Um roxo legal
    links: [
      { label: "Home Tech", url: "/tecnologia" },
      { label: "Análises", url: "/tecnologia/analises" }
    ]
  }
};
```
> **Nota:** Assim que você salvar isso, o Header do blog principal já ganhará o novo link automaticamente no menu "Blogs"!

### Passo 2: Criar a Coleção de Conteúdo
Abra `src/content.config.ts` e declare a coleção do novo nicho:
```typescript
const tecnologiaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./content/tecnologia', import.meta.url) }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string()
  })
});

export const collections = {
  // ... outras
  tecnologia: tecnologiaCollection,
};
```

### Passo 3: Criar a pasta de Conteúdo (Markdown)
Crie a pasta `src/content/tecnologia/` e adicione seus primeiros posts `.md` dentro dela.

### Passo 4: Criar as Rotas (Páginas)
Crie a pasta `src/pages/tecnologia/` e adicione:
1. `index.astro` (A página inicial de tecnologia, puxando `LayoutDinamico nicho="tecnologia"`)
2. As pastas internas, como `src/pages/tecnologia/analises/[slug].astro`, fazendo o `getStaticPaths` puxar da sua nova coleção de `tecnologia`.

E pronto! Todo o ecossistema funcionará perfeitamente.

---

## 🧹 Arquivos Residuais do Template Padrão

Como você iniciou com o template padrão do Astro e migrou para esta nova estrutura, alguns arquivos antigos podem ser excluídos com segurança se você desejar limpar o projeto:

*   `src/layouts/BlogPost.astro` (Substituído pelo nosso `LayoutDinamico`)
*   `src/components/FormattedDate.astro` (Específico do layout antigo)
*   `src/pages/rss.xml.js` (Apontava para a pasta "blog" que não existe mais. Pode deletar ou reconfigurar depois).

## 🚀 Comandos Úteis

- `npm run dev`: Inicia o servidor local de desenvolvimento.
- `npm run build`: Cria a versão de produção do site na pasta `dist/`.
