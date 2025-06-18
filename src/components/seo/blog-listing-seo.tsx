import { BaseSEO } from './base-seo'
import { StructuredData } from './structured-data'
import type { Note } from './types'

interface BlogListingSEOProps {
  notes: Note[]
}

export function BlogListingSEO({ notes }: BlogListingSEOProps) {
  // Schema do blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Carlos Kvasir - Notes",
    "description": "Anotações e artigos sobre desenvolvimento, Ruby on Rails, React e tecnologia",
    "url": "https://kvasir.dev/notes",
    "author": {
      "@type": "Person",
      "name": "Carlos Kvasir"
    },
    "publisher": {
      "@type": "Person",
      "name": "Carlos Kvasir"
    },
    "inLanguage": "pt-BR",
    "blogPost": notes.map(note => ({
      "@type": "BlogPosting",
      "headline": note.title,
      "description": note.description,
      "url": `https://kvasir.dev/notes/${note.year}/${note.month}/${note.slug}`,
      "datePublished": note.date,
      "author": {
        "@type": "Person",
        "name": "Carlos Kvasir"
      },
      "keywords": note.tags
    }))
  }
  
  // Breadcrumbs para listagem de notes
  const breadcrumbs = [
    { name: "Início", url: "https://kvasir.dev" },
    { name: "Notes", url: "https://kvasir.dev/notes" }
  ]

  return (
    <BaseSEO breadcrumbs={breadcrumbs}>
      {/* Schema do blog */}
      <StructuredData data={blogSchema} />
    </BaseSEO>
  )
}
