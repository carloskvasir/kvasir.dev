import type { BreadcrumbItem, Note, Projeto } from "./types";

export function createPortfolioSchema(projetos: Projeto[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://kvasir.dev/#portfolio",
    name: "Portfolio de Carlos Kvasir",
    description: "Projetos desenvolvidos por Carlos Kvasir",
    author: {
      "@type": "Person",
      name: "Carlos Kvasir",
    },
    hasPart: projetos.map((projeto, index) => ({
      "@type": "SoftwareApplication",
      "@id": `https://kvasir.dev/#projeto-${index}`,
      name: projeto.name,
      description: projeto.long_desc,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      author: {
        "@type": "Person",
        name: "Carlos Kvasir",
      },
      codeRepository: projeto.github,
      ...(projeto.link && { url: projeto.link }),
      programmingLanguage: ["Ruby", "JavaScript", "TypeScript"],
      runtimePlatform: "Web Browser",
    })),
  };
}

export function createBlogPostSchema(post: Note & { content: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      "@type": "Person",
      name: post.author || "Carlos Kvasir",
      url: "https://kvasir.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "Carlos Kvasir",
      logo: {
        "@type": "ImageObject",
        url: "https://kvasir.dev/profile.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        post.canonicalUrl ||
        `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`,
    },
    image: {
      "@type": "ImageObject",
      url: post.ogImage || "https://kvasir.dev/profile.jpg",
    },
    articleSection: post.category || "Desenvolvimento Web",
    keywords: post.keywords || post.tags,
    wordCount: post.content.length,
    timeRequired: `PT${post.readingTime || 5}M`,
    inLanguage: post.language || "pt-BR",
    url:
      post.canonicalUrl ||
      `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`,
    about: {
      "@type": "Thing",
      name: post.category || "Desenvolvimento Web",
    },
    ...(post.excerpt && { abstract: post.excerpt }),
  };
}

export function createBlogSchema(posts: Note[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog do Carlos Kvasir",
    description: "Posts sobre desenvolvimento web, Rails, React e tecnologia",
    url: "https://kvasir.dev/notes",
    author: {
      "@type": "Person",
      name: "Carlos Kvasir",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Carlos Kvasir",
      },
      url: `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`,
      keywords: post.tags,
    })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
