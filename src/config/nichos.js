export const configNichos = {
  default: {
    nome: "Guia Prático",
    cor: "#333333", // Cor padrão (Home principal)
    links: [
      { label: "Início", url: "/" },
      { label: "Sobre", url: "/sobre" }
    ]
  },
  saude: {
    nome: "Saúde & Rotina",
    cor: "#10b981", // Verde
    links: [
      { label: "Home", url: "/saude" },
      { label: "Receitas", url: "/saude/receitas" },
      { label: "Ferramentas", url: "/saude/ferramentas" }
    ]
  },
  viagens: {
    nome: "Guia de Viagens",
    cor: "#3b82f6", // Azul
    links: [
      { label: "Home", url: "/viagens" },
      { label: "Roteiros", url: "/viagens/roteiros" },
      { label: "Checklist", url: "/viagens/checklist" }
    ]
  }
};