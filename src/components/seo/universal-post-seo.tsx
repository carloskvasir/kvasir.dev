import { BaseSEO } from './base-seo'
import { createBlogPostSchema } from './dynamic-schemas'
import { StructuredData } from './structured-data'
import type { Note } from './types'

interface UniversalPostSEOProps {
  post: Note & { content: string }
}

export function UniversalPostSEO({ post }: UniversalPostSEOProps) {
  const postUrl = post.canonicalUrl || `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`
  
  // Schema do post usando informações do frontmatter - será incluído no BaseSEO
  createBlogPostSchema(post)
  
  // Breadcrumbs dinâmicos baseados no conteúdo do post
  const baseBreadcrumbs = [
    { name: "Início", url: "https://kvasir.dev" },
    { name: "Notes", url: "https://kvasir.dev/notes" },
    { name: post.year, url: `https://kvasir.dev/notes/${post.year}` }
  ]

  // Adiciona breadcrumb específico se o post tem categoria principal
  const breadcrumbs = post.category && post.category !== "Desenvolvimento"
    ? [
        ...baseBreadcrumbs,
        { name: post.category, url: `https://kvasir.dev/notes?category=${encodeURIComponent(post.category)}` },
        { name: post.title, url: postUrl }
      ]
    : [
        ...baseBreadcrumbs,
        { name: post.title, url: postUrl }
      ]

  // Schema adicional baseado no tipo de conteúdo do frontmatter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const additionalSchemas: any[] = []
  
  // Adiciona schema específico para HowTo se indicado no frontmatter
  if (post.schemaType === 'HowTo' || post.isHowTo) {
    additionalSchemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": post.title,
      "description": post.metaDescription || post.description,
      "image": post.ogImage || "/profile.jpg",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BRL",
        "value": "0"
      },
      "supply": post.supplies || [],
      "tool": post.tools || [],
      "step": post.steps || [],
      "totalTime": post.duration || "PT30M"
    })
  }

  // Adiciona schema FAQ se o post tem perguntas frequentes
  if (post.faq && post.faq.length > 0) {
    additionalSchemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    })
  }

  // Adiciona schema Course se o post é educacional
  if (post.schemaType === 'Course' || post.isCourse) {
    additionalSchemas.push({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": post.title,
      "description": post.metaDescription || post.description,
      "provider": {
        "@type": "Organization",
        "name": "Carlos Kvasir",
        "url": "https://kvasir.dev"
      },
      "educationalLevel": post.difficulty || "Intermediate",
      "audience": {
        "@type": "Audience",
        "audienceType": post.target_audience || "Desenvolvedores"
      }
    })
  }

  // Meta tags dinâmicas baseadas no frontmatter
  const dynamicMetaTags = [
    // Meta description otimizada
    { name: 'description', content: post.metaDescription || post.description },
    
    // Keywords combinadas do frontmatter
    { name: 'keywords', content: [
      ...(post.keywords || []),
      ...(post.relatedKeywords || []),
      ...(post.tags || []),
      ...(post.topics || [])
    ].filter(Boolean).join(', ') },
    
    // Author information
    { name: 'author', content: post.author || 'Carlos Kvasir' },
    { name: 'article:author', content: post.authorUrl || 'https://kvasir.dev' },
    
    // Article metadata
    { name: 'article:published_time', content: post.publishedAt || post.date },
    { name: 'article:modified_time', content: post.updatedAt || post.lastModified || post.date },
    { name: 'article:section', content: post.category || 'Desenvolvimento' },
    
    // Content classification
    { name: 'content-type', content: post.contentType || 'article' },
    { name: 'difficulty', content: post.difficulty || 'Intermediário' },
    { name: 'reading-time', content: `${post.readingTime || post.estimatedReadTime || 5} minutos` },
    { name: 'target-audience', content: post.target_audience || 'Desenvolvedores' },
    
    // Language and locale
    { name: 'language', content: post.language || 'pt-BR' },
    { name: 'locale', content: post.locale || 'pt_BR' },
    
    // Technical SEO
    { name: 'robots', content: post.robots || 'index, follow' },
    { name: 'googlebot', content: post.googlebot || 'index, follow' },
    
    // Social proof indicators
    { name: 'article:opinion', content: post.isOpinion ? 'true' : 'false' },
    { name: 'educational-content', content: post.isEducational ? 'true' : 'false' },
    
    // Performance hints
    { name: 'preload', content: post.preloadResources || '' },
    
    // Series information se disponível
    ...(post.series ? [
      { name: 'article:series', content: post.series },
      { name: 'series-part', content: post.seriesPart?.toString() || '1' }
    ] : [])
  ].filter(tag => tag.content && typeof tag.content === 'string' && tag.content.trim() !== '')

  // Open Graph tags dinâmicas
  const openGraphTags = [
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.ogTitle || post.title },
    { property: 'og:description', content: post.ogDescription || post.metaDescription || post.description },
    { property: 'og:url', content: postUrl },
    { property: 'og:site_name', content: 'Carlos Kvasir' },
    { property: 'og:image', content: post.ogImage || '/profile.jpg' },
    { property: 'og:image:alt', content: post.ogImageAlt || `Imagem do post: ${post.title}` },
    { property: 'og:locale', content: post.ogLocale || 'pt_BR' },
    { property: 'article:author', content: post.authorUrl || 'https://kvasir.dev' },
    { property: 'article:published_time', content: post.publishedAt || post.date },
    { property: 'article:modified_time', content: post.updatedAt || post.lastModified || post.date },
    { property: 'article:section', content: post.category || 'Desenvolvimento' },
    ...(post.tags || []).map(tag => ({ property: 'article:tag', content: tag }))
  ]

  // Twitter Card tags dinâmicas
  const twitterTags = [
    { name: 'twitter:card', content: post.twitterCard || 'summary_large_image' },
    { name: 'twitter:site', content: post.twitterSite || '@carlosk' },
    { name: 'twitter:creator', content: post.twitterCreator || '@carlosk' },
    { name: 'twitter:title', content: post.twitterTitle || post.ogTitle || post.title },
    { name: 'twitter:description', content: post.twitterDescription || post.ogDescription || post.metaDescription || post.description },
    { name: 'twitter:image', content: post.twitterImage || post.ogImage || '/profile.jpg' },
    { name: 'twitter:image:alt', content: post.twitterImageAlt || post.ogImageAlt || `Imagem do post: ${post.title}` }
  ]

  // Links canônicos e alternativos
  const linkTags = [
    { rel: 'canonical', href: postUrl },
    ...(post.relatedPosts || []).map(relatedUrl => ({ rel: 'related', href: relatedUrl }))
  ]

  // URLs alternativas (para hreflang)
  const alternateLinks = post.alternateUrls || []

  return (
    <BaseSEO breadcrumbs={breadcrumbs} additionalSchemas={additionalSchemas}>
      {/* Meta tags dinâmicas */}
      {dynamicMetaTags.map((tag, index) => (
        <meta 
          key={`meta-${index}`} 
          name={tag.name} 
          content={Array.isArray(tag.content) ? tag.content.join(', ') : tag.content} 
        />
      ))}
      
      {/* Open Graph tags */}
      {openGraphTags.map((tag, index) => (
        <meta key={`og-${index}`} property={tag.property} content={tag.content} />
      ))}
      
      {/* Twitter Card tags */}
      {twitterTags.map((tag, index) => (
        <meta key={`twitter-${index}`} name={tag.name} content={tag.content} />
      ))}
      
      {/* Link tags */}
      {linkTags.map((tag, index) => (
        <link key={`link-${index}`} rel={tag.rel} href={tag.href} />
      ))}
      
      {/* Alternate URLs com hreflang */}
      {alternateLinks.map((link, index) => (
        <link 
          key={`alternate-${index}`} 
          rel="alternate" 
          href={link.href} 
          hrefLang={link.hreflang} 
        />
      ))}
      
      {/* Schema específico do foco do post (se disponível) */}
      {post.focusKeyword && (
        <meta name="focus-keyword" content={post.focusKeyword} />
      )}
      
      {/* Dados estruturados específicos do post */}
      {additionalSchemas.length > 0 && (
        <StructuredData data={additionalSchemas} />
      )}
    </BaseSEO>
  )
}
