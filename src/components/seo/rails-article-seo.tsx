import { BaseSEO } from './base-seo'
import { createBlogPostSchema } from './dynamic-schemas'
import { createRailsArticleSchema, createRailsFAQSchema, createRailsHowToSchema } from './rails-seo-schemas'
import type { Note } from './types'

interface RailsArticleSEOProps {
  post: Note & { content: string }
}

export function RailsArticleSEO({ post }: RailsArticleSEOProps) {
  const postUrl = `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`
  
  // Schemas otimizados para artigos sobre Rails
  const schemas = [
    createBlogPostSchema(post),
    createRailsArticleSchema(
      post.title,
      post.description,
      postUrl,
      post.date,
      post.lastModified || post.date,
      "8 min"
    ),
    createRailsHowToSchema(),
    createRailsFAQSchema()
  ]
  
  // Breadcrumbs específicos para artigos Rails
  const breadcrumbs = [
    { name: "Início", url: "https://kvasir.dev" },
    { name: "Posts", url: "https://kvasir.dev/notes" },
    { name: "Ruby on Rails", url: "https://kvasir.dev/notes?tag=rails" },
    { name: post.title, url: postUrl }
  ]

  return (
    <BaseSEO breadcrumbs={breadcrumbs} additionalSchemas={schemas}>
      {/* Meta específico para Rails */}
      <meta name="article:tag" content="Ruby on Rails" />
      <meta name="article:tag" content="Web Development" />
      <meta name="article:tag" content="Framework" />
      <meta name="article:tag" content="Backend Development" />
      <meta name="article:section" content="Technology" />
      <meta name="article:published_time" content={post.date} />
      <meta name="article:modified_time" content={post.lastModified || post.date} />
      <meta name="article:author" content="Carlos Kvasir" />
      
      {/* Open Graph específico */}
      <meta property="og:type" content="article" />
      <meta property="og:article:author" content="Carlos Kvasir" />
      <meta property="og:article:section" content="Technology" />
      <meta property="og:article:tag" content="Ruby on Rails" />
      <meta property="og:article:tag" content="Web Development" />
      <meta property="og:article:published_time" content={post.date} />
      
      {/* Twitter específico */}
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content="8 min read" />
      <meta name="twitter:label2" content="Filed under" />
      <meta name="twitter:data2" content="Ruby on Rails" />
    </BaseSEO>
  )
}
