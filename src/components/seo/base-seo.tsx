import { createBreadcrumbSchema } from './dynamic-schemas'
import { PersonSchema, WebSiteSchema } from './schemas'
import { StructuredData } from './structured-data'
import type { BreadcrumbItem, JsonLdSchema } from './types'

interface BaseSEOProps {
  breadcrumbs?: BreadcrumbItem[]
  additionalSchemas?: JsonLdSchema[]
  children?: React.ReactNode
}

export function BaseSEO({ breadcrumbs, additionalSchemas = [], children }: BaseSEOProps) {
  // Schemas base que aparecem em todas as páginas
  const baseSchemas = [PersonSchema, WebSiteSchema]
  
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
      {/* Schemas base */}
      <StructuredData data={allSchemas} />
      
      {/* Schemas adicionais customizados */}
      {children}
    </>
  )
}
