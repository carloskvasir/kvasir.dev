import { MainLayout } from "@/components/layout/main-layout";
import { HomepageSEO } from "@/components/seo";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

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

export default async function Home() {
  const projetos = await getProjetos();

  return (
    <MainLayout>
      {/* SEO e Dados estruturados */}
      <HomepageSEO projetos={projetos} />
      
      <div className="relative">
        {/* Hero Section */}
        <section className="py-8 lg:py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
            <div className="space-y-6">
              <div className="relative w-48 h-48 mx-auto group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse border-4 border-border" />
                <Image
                  src="/profile.jpg"
                  alt="Carlos Kvasir"
                  fill
                  className="rounded-full object-cover border-4 border-border transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Carlos Kvasir
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    Backend Developer
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4 pt-4">
                  <a
                    href="https://github.com/carloskvasir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-110 group"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/carloskvasir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-110 group"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://mastodon.social/@carloskvasir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-200 hover:scale-110 group"
                    aria-label="Mastodon"
                  >
                    <svg className="w-5 h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-left">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Olá, sou Carlos Kvasir! 🚀
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                  <p>
                    Desde 2019, atuo no desenvolvimento de software, sempre movido pela curiosidade e paixão por entender como 
                    grandes sistemas são projetados para suportar altas demandas e como são mantidos ao longo do tempo.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                  <p>
                    Atualmente, trabalho como desenvolvedor Ruby, utilizando <strong className="text-foreground">Ruby on Rails</strong>, onde aprimoro constantemente minhas 
                    habilidades em padrões de projeto, desenvolvimento ágil e soluções escaláveis.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                  <p>
                    Além do meu trabalho com Ruby e Rails, também possuo experiência em <strong className="text-foreground">Elixir</strong>, <strong className="text-foreground">Docker</strong>, <strong className="text-foreground">Kubernetes</strong>, <strong className="text-foreground">Terraform</strong> e
                    <strong className="text-foreground"> Digital Ocean</strong>, permitindo-me atuar em diferentes áreas do desenvolvimento backend. Estou sempre em busca de 
                    novos desafios para evoluir minhas habilidades e contribuir para o sucesso dos projetos em que atuo.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Áreas de interesse</h3>
                    <p>Arquitetura de software, escalabilidade, DevOps e boas práticas no desenvolvimento backend.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Projetos */}
      <section id="projetos" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              💻 Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Alguns dos projetos que desenvolvi utilizando tecnologias como Rails, 
              React, TypeScript e outras ferramentas modernas do ecossistema web.
            </p>
          </div>

          {projetos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {projeto.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {projeto.short_desc}
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-primary/20 pl-4 bg-muted/20 rounded-r p-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {projeto.long_desc}
                      </p>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      <a
                        href={projeto.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Github className="h-4 w-4" />
                        Código
                      </a>
                      {projeto.link && (
                        <a
                          href={projeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Projetos em desenvolvimento</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Estou organizando e preparando a documentação dos meus projetos. 
                    Em breve você encontrará aqui uma coleção dos trabalhos mais relevantes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
