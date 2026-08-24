export const configNichos = {
  default: {
    title: "Guia Prático",
    color: "#333333", // Cor padrão (Home principal)
    description: "Bem-vindo ao Guia Prático, seu recurso confiável para informações úteis e práticas.",
    links: [
      { label: "Início", url: "/" },
      { label: "Sobre", url: "/sobre" }
    ]
  },
  receitas: {
    title: "Receitas saudáveis",
    color: "#10b981", // Verde
    description: "Descubra receitas saudáveis e deliciosas para o seu dia a dia.",
    links: [
      { label: "Home", url: "/receitas" },
      { label: "Receitas", url: "/receitas/conteudos" },
    //   { label: "Ferramentas", url: "/receitas/ferramentas" }
    ]
  },
  viagens: {
    title: "Guia de Viagens",
    color: "#3b82f6", // Azul
    description: "Explore destinos incríveis e planeje suas próximas aventuras.",
    links: [
      { label: "Home", url: "/viagens" },
      { label: "Roteiros", url: "/viagens/conteudos" },
    //   { label: "Checklist", url: "/viagens/checklist" }
    ]
  }
};