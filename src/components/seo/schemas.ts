export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carlos Kvasir",
  jobTitle: "Desenvolvedor Rails Full Stack",
  description:
    "Desenvolvedor especializado em Ruby on Rails, React, TypeScript e soluções web escaláveis",
  url: "https://kvasir.dev",
  image: "https://kvasir.dev/profile.jpg",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressRegion: "São Paulo",
  },
  sameAs: [
    "https://github.com/carloskvasir",
    "https://linkedin.com/in/carloskvasir",
    "https://twitter.com/carloskvasir",
  ],
  knowsAbout: [
    "Ruby on Rails",
    "React",
    "TypeScript",
    "JavaScript",
    "API REST",
    "Desenvolvimento Web",
    "Full Stack Development",
    "PostgreSQL",
    "Docker",
    "AWS",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Desenvolvedor de Software",
    occupationLocation: {
      "@type": "Country",
      name: "Brasil",
    },
    skills: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Docker"],
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelancer",
  },
};

export const WebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Carlos Kvasir - Desenvolvedor Rails",
  url: "https://kvasir.dev",
  description: "Site pessoal de Carlos Kvasir - Desenvolvedor Rails Full Stack",
  inLanguage: "pt-BR",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: "https://kvasir.dev/notes?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  ],
  author: {
    "@type": "Person",
    name: "Carlos Kvasir",
  },
  mainEntity: [
    {
      "@type": "SiteNavigationElement",
      name: "Home",
      url: "https://kvasir.dev",
      description: "Página inicial - Carlos Kvasir Desenvolvedor Rails",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Projetos",
      url: "https://kvasir.dev#projetos",
      description: "Portfolio de projetos desenvolvidos em Rails e React",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Posts",
      url: "https://kvasir.dev/notes",
      description: "Blog com artigos sobre desenvolvimento Rails e web",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Contato",
      url: "https://kvasir.dev#contato",
      description: "Entre em contato para projetos de desenvolvimento",
    },
  ],
};

export const OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Carlos Kvasir",
  url: "https://kvasir.dev",
  logo: "https://kvasir.dev/profile.jpg",
  description:
    "Serviços de desenvolvimento web especializado em Ruby on Rails e React",
  founder: {
    "@type": "Person",
    name: "Carlos Kvasir",
  },
  employee: {
    "@type": "Person",
    name: "Carlos Kvasir",
  },
  serviceType: [
    "Desenvolvimento Web",
    "API REST",
    "Aplicações Rails",
    "Frontend React",
  ],
  areaServed: "Brasil",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Desenvolvimento",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desenvolvimento Rails",
          description: "Desenvolvimento de aplicações web com Ruby on Rails",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Frontend React",
          description:
            "Desenvolvimento de interfaces modernas com React e TypeScript",
        },
      },
    ],
  },
};

export const ProfessionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Carlos Kvasir - Desenvolvimento Web",
  url: "https://kvasir.dev",
  description:
    "Serviços especializados em desenvolvimento web com Ruby on Rails, React e TypeScript",
  provider: {
    "@type": "Person",
    name: "Carlos Kvasir",
  },
  areaServed: "Brasil",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desenvolvimento Ruby on Rails",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desenvolvimento React",
        },
      },
    ],
  },
};

export const SiteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": "https://kvasir.dev#navigation",
  name: "Navegação Principal",
  hasPart: [
    {
      "@type": "SiteNavigationElement",
      name: "Home",
      url: "https://kvasir.dev",
      description: "Página inicial - Carlos Kvasir Desenvolvedor Rails",
      position: 1,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Projetos",
      url: "https://kvasir.dev/#projetos",
      description: "Portfolio de projetos desenvolvidos em Rails e React",
      position: 2,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Posts",
      url: "https://kvasir.dev/notes",
      description: "Blog com artigos sobre desenvolvimento Rails e web",
      position: 3,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Contato",
      url: "https://kvasir.dev/#contato",
      description: "Entre em contato para projetos de desenvolvimento",
      position: 4,
    },
  ],
};

export const FAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é Ruby on Rails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ruby on Rails é um framework de desenvolvimento web escrito em Ruby que facilita a criação de aplicações web robustas e escaláveis.",
      },
    },
    {
      "@type": "Question",
      name: "Quais tecnologias Carlos Kvasir domina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Carlos Kvasir é especialista em Ruby on Rails, React, TypeScript, JavaScript, PostgreSQL, Docker e AWS.",
      },
    },
    {
      "@type": "Question",
      name: "Como contratar serviços de desenvolvimento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entre em contato através do GitHub ou LinkedIn para discutir seu projeto de desenvolvimento web.",
      },
    },
  ],
};
