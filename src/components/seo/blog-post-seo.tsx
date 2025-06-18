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

  return (
    <BaseSEO breadcrumbs={breadcrumbs}>
      {/* Schema do post */}
      <StructuredData data={postSchema} />
    </BaseSEO>
  )
}
