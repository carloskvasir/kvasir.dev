import { createBreadcrumbSchema } from './dynamic-schemas'
import { PersonSchema, SiteNavigationSchema, WebSiteSchema } from './schemas'
import { createMainNavigationSchema, createSitelinksSearchboxSchema } from './sitelinks-schemas'
import { StructuredData } from './structured-data'
import type { BreadcrumbItem, JsonLdSchema } from './types'

interface MetaTag {
  name?: string
  property?: string
  content: string
}

interface BaseSEOProps {
  breadcrumbs?: BreadcrumbItem[]
  additionalSchemas?: JsonLdSchema[]
  additionalMetaTags?: MetaTag[]
  children?: React.ReactNode
}

export function BaseSEO({ breadcrumbs, additionalSchemas = [], additionalMetaTags = [], children }: BaseSEOProps) {
  // Schemas base que aparecem em todas as páginas
  const baseSchemas = [
    PersonSchema, 
    WebSiteSchema, 
    SiteNavigationSchema,
    createSitelinksSearchboxSchema(),
    createMainNavigationSchema()
  ]
  
  // Breadcrumb schema se fornecido
  const breadcrumbSchema = breadcrumbs ? createBreadcrumbSchema(breadcrumbs) : null
  
  // Todos os schemas combinados
  const allSchemas = [
    ...baseSchemas,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...additionalSchemas
  ]

  return (
    <>
      {/* Meta tags adicionais */}
      {additionalMetaTags.map((tag, index) => (
        <meta
          key={index}
          {...(tag.name ? { name: tag.name } : {})}
          {...(tag.property ? { property: tag.property } : {})}
          content={tag.content}
        />
      ))}
      
      {/* Schemas base */}
      <StructuredData data={allSchemas} />
      
      {/* Schemas adicionais customizados */}
      {children}
    </>
  )
}
