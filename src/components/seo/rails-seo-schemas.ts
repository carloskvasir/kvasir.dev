import type { JsonLdSchema } from "./types";

export const createRailsArticleSchema = (
  title: string,
  description: string,
  url: string,
  publishDate: string,
  modifiedDate: string,
  readingTime: string
): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": url,
  headline: title,
  description: description,
  url: url,
  datePublished: publishDate,
  dateModified: modifiedDate,
  author: {
    "@type": "Person",
    name: "Carlos Kvasir",
    url: "https://kvasir.dev",
    jobTitle: "Desenvolvedor Rails Full Stack",
    knowsAbout: [
      "Ruby on Rails",
      "Web Development",
      "Full Stack Development",
      "React",
      "TypeScript",
    ],
  },
  publisher: {
    "@type": "Person",
    name: "Carlos Kvasir",
    url: "https://kvasir.dev",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  image: "https://kvasir.dev/profile.jpg",
  articleSection: "Technology",
  keywords: [
    "Ruby on Rails",
    "Rails 7",
    "Web Development",
    "Framework",
    "Produtividade",
    "Desenvolvimento Web",
    "Backend Development",
    "Full Stack",
  ],
  about: [
    {
      "@type": "Thing",
      name: "Ruby on Rails",
      description: "Framework de desenvolvimento web em Ruby",
      url: "https://rubyonrails.org",
    },
    {
      "@type": "Thing",
      name: "Web Development",
      description: "Desenvolvimento de aplicações web",
    },
    {
      "@type": "Thing",
      name: "Framework",
      description: "Estrutura para desenvolvimento de software",
    },
  ],
  mentions: [
    {
      "@type": "SoftwareApplication",
      name: "Ruby on Rails",
      applicationCategory: "Web Framework",
      operatingSystem: "Cross-platform",
      programmingLanguage: "Ruby",
    },
    {
      "@type": "Organization",
      name: "GitHub",
      description: "Plataforma que usa Ruby on Rails",
    },
    {
      "@type": "Organization",
      name: "Shopify",
      description: "E-commerce platform built with Rails",
    },
    {
      "@type": "Organization",
      name: "Basecamp",
      description: "Project management tool built with Rails",
    },
  ],
  teaches: [
    "Vantagens do Ruby on Rails",
    "Produtividade em desenvolvimento web",
    "Escalabilidade de aplicações Rails",
    "Comparação entre frameworks",
    "Casos de uso ideais para Rails",
  ],
  timeRequired: readingTime,
  proficiencyLevel: "Beginner to Intermediate",
  learningResourceType: "Article",
  educationalLevel: "Professional Development",
  isAccessibleForFree: true,
  license: "https://creativecommons.org/licenses/by/4.0/",
  inLanguage: "pt-BR",
  audience: {
    "@type": "Audience",
    audienceType: "Developers",
    name: "Web Developers and Software Engineers",
  },
});

export const createRailsHowToSchema = (): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como Escolher Ruby on Rails para Desenvolvimento Web",
  description:
    "Guia completo sobre quando e por que escolher Ruby on Rails para projetos de desenvolvimento web",
  image: "https://kvasir.dev/profile.jpg",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "BRL",
    value: "0",
  },
  supply: [
    {
      "@type": "HowToSupply",
      name: "Conhecimento básico em programação",
    },
    {
      "@type": "HowToSupply",
      name: "Computador com acesso à internet",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "Ruby on Rails Framework",
    },
    {
      "@type": "HowToTool",
      name: "Editor de código (VS Code)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Avaliar Necessidades do Projeto",
      text: "Identifique se seu projeto precisa de desenvolvimento rápido e escalabilidade",
    },
    {
      "@type": "HowToStep",
      name: "Analisar Vantagens do Rails",
      text: "Compare produtividade, ecosystem e cases de sucesso",
    },
    {
      "@type": "HowToStep",
      name: "Considerar Casos de Uso",
      text: "Avalie se Rails é adequado para startups, e-commerce ou SaaS",
    },
    {
      "@type": "HowToStep",
      name: "Implementar e Começar",
      text: "Instale Rails e comece seu primeiro projeto",
    },
  ],
  totalTime: "PT8M",
});

export const createRailsFAQSchema = (): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Por que Ruby on Rails é bom para desenvolvimento web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ruby on Rails oferece produtividade excepcional, ecosystem maduro, escalabilidade comprovada e developer experience superior. Permite desenvolvimento rápido com menos código e mais funcionalidades.",
      },
    },
    {
      "@type": "Question",
      name: "Rails é melhor que outros frameworks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rails oferece vantagens únicas em produtividade, convenções inteligentes e time-to-market. Comparado a Node.js ou Django, Rails se destaca em rapidez de desenvolvimento e qualidade de código.",
      },
    },
    {
      "@type": "Question",
      name: "Quais empresas usam Ruby on Rails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grandes empresas como GitHub, Shopify, Basecamp, Airbnb e Twitch usam Rails em produção, provando sua escalabilidade e confiabilidade.",
      },
    },
    {
      "@type": "Question",
      name: "Rails é adequado para startups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, Rails é ideal para startups devido ao desenvolvimento rápido de MVPs, baixo custo inicial, facilidade de pivot e escalabilidade conforme crescimento.",
      },
    },
    {
      "@type": "Question",
      name: "Como começar com Ruby on Rails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instale Ruby e Rails com 'gem install rails', crie uma nova aplicação com 'rails new projeto' e inicie o servidor com 'rails server'. A documentação oficial oferece tutoriais completos.",
      },
    },
  ],
});
