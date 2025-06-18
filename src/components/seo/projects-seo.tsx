import { BaseSEO } from './base-seo'
import { createPortfolioSchema } from './dynamic-schemas'
import { StructuredData } from './structured-data'
import type { Projeto } from './types'

interface ProjectsSEOProps {
  projetos: Projeto[]
}

export function ProjectsSEO({ projetos }: ProjectsSEOProps) {
  // Schema do portfolio
  const portfolioSchema = createPortfolioSchema(projetos)
  
  // Breadcrumbs para projetos
  const breadcrumbs = [
    { name: "Início", url: "https://kvasir.dev" },
    { name: "Projetos", url: "https://kvasir.dev/projetos" }
  ]

  return (
    <BaseSEO breadcrumbs={breadcrumbs}>
      {/* Schema do portfolio */}
      <StructuredData data={portfolioSchema} />
    </BaseSEO>
  )
}
