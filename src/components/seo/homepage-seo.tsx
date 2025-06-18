import { BaseSEO } from './base-seo'
import { createPortfolioSchema } from './dynamic-schemas'
import {
    FAQSchema,
    OrganizationSchema,
    ProfessionalServiceSchema
} from './schemas'
import { StructuredData } from './structured-data'
import type { Projeto } from './types'

interface HomepageSEOProps {
  projetos: Projeto[]
}

export function HomepageSEO({ projetos }: HomepageSEOProps) {
  // Schemas específicos da homepage
  const homepageSchemas = [
    OrganizationSchema,
    ProfessionalServiceSchema,
    FAQSchema
  ]

  // Schema para o portfolio se houver projetos
  const portfolioSchema = projetos.length > 0 ? createPortfolioSchema(projetos) : null

  return (
    <BaseSEO additionalSchemas={homepageSchemas}>
      {/* Portfolio schema se houver projetos */}
      {portfolioSchema && <StructuredData data={portfolioSchema} />}
    </BaseSEO>
  )
}
