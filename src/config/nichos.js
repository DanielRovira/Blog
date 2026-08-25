export const configNichos = {
  default: {
    title: "Guia Prático",
    color: "#333333", // Cor padrão (Home principal)
    description: "",
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
      { label: "Todos", url: "/receitas" },
      { label: "Café da manhã", url: "/receitas?category=cafe-da-manha" },
      { label: "Almoço e jantar", url: "/receitas?category=almoco-e-jantar" },
      { label: "Lanches", url: "/receitas?category=lanches" },
      { label: "Sobremesas", url: "/receitas?category=sobremesas" }
    ]
  },
  viagens: {
    title: "Guia de Viagens",
    color: "#3b82f6", // Azul
    description: "Explore destinos incríveis e planeje suas próximas aventuras.",
    links: [
      { label: "Todos", url: "/viagens" },
      { label: "Europa", url: "/viagens?category=europa" },
      { label: "América do Sul", url: "/viagens?category=america-do-sul" },
      { label: "Brasil", url: "/viagens?category=brasil" },
      { label: "América Central e Caribe", url: "/viagens?category=america-central-e-caribe" },
      { label: "Ásia e África", url: "/viagens?category=asia-e-africa" },
      { label: "América do Norte", url: "/viagens?category=america-do-norte" }
    ]
  }
};