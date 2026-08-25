/**
 * @type {Record<string, {
 *   title: string;
 *   color: string;
 *   description: string;
 *   links: Array<{ label: string; url: string; principal?: boolean }>;
 *   infoproduto?: { title: string; description: string; buttonLabel: string; url: string; image?: string };
 * }>}
 */
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
    infoproduto: {
      title: "E-book Marmitas Saudáveis para a Semana",
      description: "Organize sua alimentação com receitas práticas, listas de compras e um plano simples para preparar marmitas saborosas sem complicação.",
      buttonLabel: "Quero conhecer o e-book",
      url: "#"
    },
    links: [
      { label: "Todos", url: "/receitas", principal: true },
      { label: "Café da manhã", url: "/receitas?category=cafe-da-manha", principal: true },
      { label: "Almoço e jantar", url: "/receitas?category=almoco-e-jantar", principal: true },
      { label: "Lanches", url: "/receitas?category=lanches" },
      { label: "Sobremesas", url: "/receitas?category=sobremesas" }
    ]
  },
  viagens: {
    title: "Guia de Viagens",
    color: "#3b82f6", // Azul
    description: "Explore destinos incríveis e planeje suas próximas aventuras.",
    infoproduto: {
      title: "E-book Roteiros de Viagem sem Perrengue",
      description: "Planeje sua próxima aventura com roteiros prontos, dicas de economia e checklists para viajar com mais tranquilidade e aproveitar melhor cada destino.",
      buttonLabel: "Quero conhecer o e-book",
      url: "#"
    },
    links: [
      { label: "Todos", url: "/viagens", principal: true },
      { label: "Europa", url: "/viagens?category=europa", principal: true },
      { label: "América do Sul", url: "/viagens?category=america-do-sul", principal: true },
      { label: "Brasil", url: "/viagens?category=brasil", principal: true },
      { label: "América Central e Caribe", url: "/viagens?category=america-central-e-caribe" },
      { label: "Ásia e África", url: "/viagens?category=asia-e-africa" },
      { label: "América do Norte", url: "/viagens?category=america-do-norte" }
    ]
  }
};