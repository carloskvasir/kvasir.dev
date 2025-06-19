import { BaseSEO } from './base-seo'
import { createBlogPostSchema } from './dynamic-schemas'
import { StructuredData } from './structured-data'
import type { Note } from './types'

interface BlogPostSEOProps {
  post: Note & { content: string }
}

export function BlogPostSEO({ post }: BlogPostSEOProps) {
  // Schema do post
  const postSchema = createBlogPostSchema(post)
  
  // Breadcrumbs para o post
  const breadcrumbs = [
    { name: "Início", url: "https://kvasir.dev" },
    { name: "Notes", url: "https://kvasir.dev/notes" },
    { name: post.year, url: `https://kvasir.dev/notes/${post.year}` },
    { name: post.title, url: `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}` }
  ]

  // Meta tags adicionais para SEO avançado
  const additionalMetaTags = [
    // Meta description otimizada
    { name: 'description', content: post.metaDescription || post.description },
    
    // Keywords
    { name: 'keywords', content: [
      ...(post.keywords || []),
      ...(post.relatedKeywords || []),
      ...(post.tags || [])
    ].join(', ') },
    
    // Author information
    { name: 'author', content: post.author || 'Carlos Kvasir' },
    { name: 'article:author', content: post.authorUrl || 'https://kvasir.dev' },
    
    // Article metadata
    { name: 'article:published_time', content: post.publishedAt || post.date },
    { name: 'article:modified_time', content: post.updatedAt || post.lastModified || post.date },
    { name: 'article:section', content: post.category || 'Desenvolvimento' },
    { name: 'article:tag', content: post.tags?.join(', ') || '' },
    
    // Content classification
    { name: 'content-type', content: post.contentType || 'article' },
    { name: 'difficulty', content: post.difficulty || 'Intermediário' },
    { name: 'reading-time', content: `${post.readingTime || 5} min` },
    
    // Language and locale
    { name: 'language', content: post.language || 'pt-BR' },
    { name: 'locale', content: post.locale || 'pt_BR' },
    
    // Open Graph extended
    { property: 'og:title', content: post.ogTitle || post.title },
    { property: 'og:description', content: post.ogDescription || post.metaDescription || post.description },
    { property: 'og:image', content: post.ogImage || '/profile.jpg' },
    { property: 'og:image:alt', content: post.ogImageAlt || post.title },
    { property: 'og:type', content: post.ogType || 'article' },
    { property: 'og:site_name', content: post.ogSiteName || 'Kvasir.dev' },
    { property: 'og:locale', content: post.ogLocale || 'pt_BR' },
    { property: 'og:url', content: post.canonicalUrl || `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}` },
    
    // Twitter Card
    { name: 'twitter:card', content: post.twitterCard || 'summary_large_image' },
    { name: 'twitter:title', content: post.twitterTitle || post.ogTitle || post.title },
    { name: 'twitter:description', content: post.twitterDescription || post.ogDescription || post.metaDescription || post.description },
    { name: 'twitter:image', content: post.twitterImage || post.ogImage || '/profile.jpg' },
    { name: 'twitter:image:alt', content: post.twitterImageAlt || post.ogImageAlt || post.title },
    { name: 'twitter:site', content: post.twitterSite || '@kvasir_dev' },
    { name: 'twitter:creator', content: post.twitterCreator || '@kvasir_dev' },
    
    // Technical SEO
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    
    // Performance and quality indicators
    ...(post.featured ? [{ name: 'featured', content: 'true' }] : []),
    ...(post.trending ? [{ name: 'trending', content: 'true' }] : []),
    ...(post.priority ? [{ name: 'priority', content: post.priority }] : []),
  ].filter(tag => tag.content && tag.content.trim() !== '') // Remove empty values

  return (
    <BaseSEO breadcrumbs={breadcrumbs} additionalMetaTags={additionalMetaTags}>
      {/* Schema do post */}
      <StructuredData data={postSchema} />
      
      {/* Canonical URL */}
      {post.canonicalUrl && (
        <link rel="canonical" href={post.canonicalUrl} />
      )}
      
      {/* Alternate URLs for different languages */}
      {post.alternateUrls?.map((alternate, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={alternate.hreflang}
          href={alternate.href}
        />
      ))}
      
      {/* Series information */}
      {post.series && (
        <meta name="series" content={post.series} />
      )}
      
      {/* Topics for better categorization */}
      {post.topics && (
        <meta name="topics" content={post.topics.join(', ')} />
      )}
      
      {/* Target audience */}
      {post.target_audience && (
        <meta name="target-audience" content={post.target_audience.join(', ')} />
      )}
    </BaseSEO>
  )
}
