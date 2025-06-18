// Tipos para dados estruturados JSON-LD

export interface JsonLdSchema {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface PersonSchemaType extends JsonLdSchema {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface OrganizationSchemaType extends JsonLdSchema {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  founder?: PersonSchemaType;
}

export interface WebSiteSchemaType extends JsonLdSchema {
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

export interface BlogPostingSchemaType extends JsonLdSchema {
  "@type": "BlogPosting";
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: PersonSchemaType;
  publisher?: OrganizationSchemaType;
  url?: string;
  keywords?: string[];
}

export interface BreadcrumbListSchemaType extends JsonLdSchema {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SoftwareApplicationSchemaType extends JsonLdSchema {
  "@type": "SoftwareApplication";
  name: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  author?: PersonSchemaType;
  codeRepository?: string;
  url?: string;
  programmingLanguage?: string[];
}

// Tipos para props dos componentes
export interface Projeto {
  name: string;
  github: string;
  link?: string;
  short_desc: string;
  long_desc: string;
}

export interface Note {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  year: string;
  month: string;
  content?: string;
  // Campos SEO adicionais
  excerpt?: string;
  keywords?: string[];
  author?: string;
  category?: string;
  readingTime?: number;
  lastModified?: string;
  canonicalUrl?: string;
  ogImage?: string;
  featured?: boolean;
  language?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
