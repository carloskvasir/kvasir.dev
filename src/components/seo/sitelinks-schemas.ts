import { JsonLdSchema } from "./types";

export const createSitelinksSearchboxSchema = (): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://kvasir.dev",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://kvasir.dev/notes?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
});

export const createMainNavigationSchema = (): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://kvasir.dev#mainnavigation",
  name: "Navegação Principal",
  description: "Links principais do site Carlos Kvasir",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      description: "Página inicial - Carlos Kvasir Desenvolvedor Rails",
      url: "https://kvasir.dev",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projetos",
      description: "Portfolio de projetos desenvolvidos em Rails e React",
      url: "https://kvasir.dev/#projetos",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Posts",
      description: "Blog com artigos sobre desenvolvimento Rails e web",
      url: "https://kvasir.dev/notes",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contato",
      description: "Entre em contato para projetos de desenvolvimento",
      url: "https://kvasir.dev/#contato",
    },
  ],
});
