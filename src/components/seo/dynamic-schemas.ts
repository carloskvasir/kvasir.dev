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
    "@type": post.schemaType || "BlogPosting",
    headline: post.headline || post.title,
    description: post.metaDescription || post.description,
    datePublished: post.datePublished || post.publishedAt || post.date,
    dateModified:
      post.dateModified || post.updatedAt || post.lastModified || post.date,
    author: {
      "@type": "Person",
      name: post.author || "Carlos Kvasir",
      url: post.authorUrl || "https://kvasir.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "Carlos Kvasir",
      logo: {
        "@type": "ImageObject",
        url: "https://kvasir.dev/profile.jpg",
        width: 400,
        height: 400,
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
      width: 1200,
      height: 630,
      alt: post.ogImageAlt || post.title,
    },
    articleSection:
      post.articleSection || post.category || "Desenvolvimento Web",
    keywords: [
      ...(post.keywords || []),
      ...(post.relatedKeywords || []),
      ...(post.tags || []),
    ].join(", "),
    wordCount:
      post.wordcount || post.wordCount || Math.ceil(post.content.length / 5),
    timeRequired: `PT${post.readingTime || 5}M`,
    inLanguage: post.language || "pt-BR",
    url:
      post.canonicalUrl ||
      `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`,
    about: {
      "@type": "Thing",
      name: post.category || "Desenvolvimento Web",
      ...(post.topics && { sameAs: post.topics }),
    },
    ...(post.excerpt && { abstract: post.excerpt }),
    ...(post.difficulty && { educationalLevel: post.difficulty }),
    ...(post.target_audience && {
      audience: {
        "@type": "Audience",
        audienceType: post.target_audience.join(", "),
      },
    }),
    ...(post.series && {
      isPartOf: {
        "@type": "CreativeWorkSeries",
        name: post.series,
      },
    }),
    ...(post.contentType && { genre: post.contentType }),
    ...(post.focusKeyword && {
      mainEntity: {
        "@type": "Thing",
        name: post.focusKeyword,
      },
    }),
    // Informações de qualidade e credibilidade
    ...(post.contentQuality?.factChecked && {
      reviewedBy: {
        "@type": "Person",
        name: post.author || "Carlos Kvasir",
      },
    }),
    // Classificação de conteúdo
    ...(post.featured && {
      isAccessibleForFree: true,
      isFamilyFriendly: true,
    }),
    // Métricas de engajamento
    ...(post.socialProof?.shares &&
      post.socialProof.shares > 0 && {
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ShareAction",
          userInteractionCount: post.socialProof.shares,
        },
      }),
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
