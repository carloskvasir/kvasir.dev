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

  // Campos SEO básicos
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

  // Campos SEO avançados
  metaDescription?: string;
  focusKeyword?: string;
  relatedKeywords?: string[];
  authorUrl?: string;
  subcategory?: string;
  topics?: string[];
  difficulty?: string;
  target_audience?: string[];
  wordCount?: number;
  contentType?: string;
  format?: string;
  trending?: boolean;
  priority?: string;
  publishedAt?: string;
  updatedAt?: string;
  locale?: string;
  alternateUrls?: Array<{ hreflang: string; href: string }>;

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
  ogType?: string;
  ogSiteName?: string;
  ogLocale?: string;

  // Twitter Card
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  twitterSite?: string;
  twitterCreator?: string;

  // Schema.org
  schemaType?: string;
  datePublished?: string;
  dateModified?: string;
  headline?: string;
  articleSection?: string;
  wordcount?: number;

  // Classificação interna
  series?: string;
  seriesPart?: number;
  relatedPosts?: string[];
  crossLinks?: string[];

  // Campos para diferentes tipos de conteúdo
  isHowTo?: boolean;
  isCourse?: boolean;
  isOpinion?: boolean;
  isEducational?: boolean;

  // Campos específicos para HowTo
  supplies?: string[];
  tools?: string[];
  steps?: Array<{ name: string; text: string }>;
  duration?: string;

  // FAQ
  faq?: Array<{ question: string; answer: string }>;

  // Tempo de leitura
  estimatedReadTime?: number;

  // SEO técnico adicional
  robots?: string;
  googlebot?: string;
  preloadResources?: string;

  // Métricas de qualidade
  performance?: {
    loadTime?: string;
    imageOptimization?: boolean;
    mobileOptimized?: boolean;
  };
  accessibility?: {
    altTexts?: boolean;
    headingStructure?: boolean;
    colorContrast?: string;
  };
  socialProof?: {
    shares?: number;
    comments?: number;
    engagement?: string;
  };
  contentQuality?: {
    originalContent?: boolean;
    factChecked?: boolean;
    sources?: string[];
    lastReview?: string;
  };
  technicalSEO?: {
    structured_data?: boolean;
    meta_tags?: boolean;
    internal_links?: boolean;
    external_links?: boolean;
    image_alt_tags?: boolean;
    heading_hierarchy?: boolean;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
