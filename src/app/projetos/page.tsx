import { MainLayout } from "@/components/layout/main-layout";
import { ProjectsSEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projetos | Carlos Kvasir",
  description:
    "Conheça os projetos desenvolvidos por Carlos Kvasir, incluindo aplicações Rails, React, dashboards e APIs.",
  keywords: [
    "projetos",
    "portfolio",
    "Rails",
    "React",
    "TypeScript",
    "API",
    "dashboard",
    "Carlos Kvasir",
  ],
  openGraph: {
    title: "Projetos | Carlos Kvasir",
    description:
      "Conheça os projetos desenvolvidos por Carlos Kvasir, incluindo aplicações Rails, React, dashboards e APIs.",
    url: "https://kvasir.dev/projetos",
    siteName: "Carlos Kvasir",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Projetos do Carlos Kvasir",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos | Carlos Kvasir",
    description:
      "Conheça os projetos desenvolvidos por Carlos Kvasir, incluindo aplicações Rails, React, dashboards e APIs.",
    images: ["/profile.jpg"],
  },
  alternates: {
    canonical: "https://kvasir.dev/projetos",
  },
};

// Tipo para os projetos
interface Projeto {
  name: string;
  github: string;
  link?: string;
  short_desc: string;
  long_desc: string;
}

// Importar dados dos projetos
async function getProjetos(): Promise<Projeto[]> {
  try {
    const projetos = await import("@/content/projetos.json");
    return projetos.default;
  } catch {
    return [];
  }
}

export default async function ProjetosPage() {
  const projetos = await getProjetos();

  return (
    <MainLayout>
      {/* SEO e Dados estruturados */}
      <ProjectsSEO projetos={projetos} />
      
      <div className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Meus Projetos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma coleção dos projetos que desenvolvi, utilizando tecnologias como
              Rails, React, TypeScript e outras ferramentas modernas.
            </p>
          </div>

          {/* Projects Grid */}
          {projetos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{projeto.name}</h3>
                      <p className="text-muted-foreground mt-2">
                        {projeto.short_desc}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {projeto.long_desc}
                    </p>

                    <div className="flex gap-2 pt-4">
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={projeto.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      {projeto.link && (
                        <Button asChild size="sm">
                          <a
                            href={projeto.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Ver Projeto
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Projetos em breve</h3>
                <p className="text-muted-foreground">
                  Estou preparando a lista dos meus projetos. Volte em breve para
                  conferir!
                </p>
                <Button asChild variant="outline">
                  <Link href="/">Voltar para Home</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
