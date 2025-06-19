const RSS = require('rss')
const fs = require('fs')
const path = require('path')

// Simular a função getAllPosts do notes.ts
function getAllPosts() {
  // Dados estáticos dos posts para o RSS - atualizar quando adicionar novos posts
  return [
    {
      title: "Por que Ruby on Rails é a Melhor Escolha para Desenvolvimento Web em 2025",
      slug: "por-que-ruby-on-rails-e-a-melhor-escolha",
      date: "2024-12-19",
      year: "2024",
      month: "12",
      description: "Ruby on Rails continua sendo o melhor framework web em 2025. Descubra por que GitHub, Shopify e Airbnb escolheram Rails para escalar globalmente com 3x mais produtividade.",
      metaDescription: "Ruby on Rails continua sendo o melhor framework web em 2025. Descubra por que GitHub, Shopify e Airbnb escolheram Rails para escalar globalmente com 3x mais produtividade.",
      excerpt: "Rails continua dominando o desenvolvimento web em 2025. Descubra por que empresas como GitHub (50M repos), Shopify (US$ 160B GMV) e Basecamp escolhem Rails para escalar globalmente.",
      author: "Carlos Kvasir",
      authorUrl: "https://kvasir.dev",
      tags: ["ruby on rails", "web development", "framework", "backend", "startup", "produtividade", "rails 7", "desenvolvimento", "tecnologia"],
      keywords: ["ruby on rails 2025", "melhor framework web", "rails vs react", "rails vs django", "rails produtividade", "startup framework", "escalabilidade rails", "github shopify rails", "desenvolvimento web", "backend framework", "produtividade desenvolvimento"],
      topics: ["Ruby on Rails", "Web Development", "Backend", "Frameworks", "Produtividade"],
      difficulty: "Intermediário",
      target_audience: ["Desenvolvedores", "CTOs", "Startups", "Empresas de Tecnologia"],
      readingTime: 8,
      contentType: "guide",
      category: "Desenvolvimento",
      ogImage: "/images/rails-2025-guide.jpg",
      ogImageAlt: "Ruby on Rails 2025 - Guia Completo de Produtividade e Cases de Sucesso",
      language: "pt-BR",
      publishedAt: "2024-12-19T10:00:00.000Z",
      featured: true,
      trending: true,
      series: "Rails Essentials"
    },
    {
      title: "Configurando um Ambiente de Desenvolvimento Rails Perfeito",
      slug: "ambiente-desenvolvimento-rails",
      date: "2024-12-19",
      year: "2024", 
      month: "12",
      description: "Guia completo para configurar um ambiente de desenvolvimento Ruby on Rails profissional no Linux, com Docker, PostgreSQL, Redis e ferramentas essenciais.",
      metaDescription: "Configure um ambiente Rails profissional: Docker, PostgreSQL, Redis, VSCode, ferramentas de debug e deploy. Guia completo para desenvolvedores.",
      excerpt: "Configure seu ambiente Rails como um profissional: Docker, PostgreSQL, Redis, ferramentas de debug e muito mais para máxima produtividade.",
      author: "Carlos Kvasir",
      authorUrl: "https://kvasir.dev",
      tags: ["ruby on rails", "ambiente desenvolvimento", "docker", "postgresql", "redis", "vscode", "setup", "ferramentas"],
      keywords: ["rails setup", "ambiente desenvolvimento rails", "docker rails", "postgresql rails", "redis rails", "vscode rails", "rails tools"],
      topics: ["Ruby on Rails", "DevOps", "Ferramentas", "Produtividade"],
      difficulty: "Iniciante",
      target_audience: ["Desenvolvedores", "Iniciantes Rails"],
      readingTime: 12,
      contentType: "tutorial",
      category: "Tutorial",
      language: "pt-BR",
      publishedAt: "2024-12-19T10:00:00.000Z",
      series: "Rails Essentials"
    },
    {
      title: "Bem-vindo às minhas notes",
      slug: "bem-vindo-as-notes", 
      date: "2024-12-19",
      year: "2024",
      month: "12",
      description: "Primeiro post do blog! Aqui vou compartilhar conhecimentos sobre Ruby on Rails, desenvolvimento web e tecnologias que uso no dia a dia.",
      metaDescription: "Bem-vindo ao blog Kvasir.dev! Artigos sobre Ruby on Rails, desenvolvimento web moderno, tutoriais práticos e experiências reais de desenvolvimento.",
      excerpt: "Primeiro post oficial! Descubra o que você vai encontrar neste blog sobre Rails, desenvolvimento web e tecnologias modernas.",
      author: "Carlos Kvasir",
      authorUrl: "https://kvasir.dev",
      tags: ["blog", "ruby on rails", "desenvolvimento web", "bem-vindo", "apresentação"],
      keywords: ["blog rails", "kvasir dev", "carlos kvasir", "desenvolvimento web", "ruby on rails blog"],
      topics: ["Blog", "Apresentação", "Ruby on Rails"],
      difficulty: "Iniciante",
      target_audience: ["Desenvolvedores", "Interessados em Rails"],
      readingTime: 3,
      contentType: "article",
      category: "Blog",
      language: "pt-BR",
      publishedAt: "2024-12-19T10:00:00.000Z",
      featured: false
    },
    {
      title: "Instalando mise e Ruby no Linux Mint/Ubuntu",
      slug: "instalando-mise-ruby-ubuntu",
      date: "2024-12-19",
      year: "2024",
      month: "12", 
      description: "Tutorial completo para instalar mise (substituto do rbenv) e Ruby no Linux Mint/Ubuntu. Gerenciamento moderno de versões Ruby.",
      metaDescription: "Instale mise e Ruby no Ubuntu/Linux Mint: tutorial completo com gerenciamento de versões, configuração e melhores práticas para desenvolvimento Rails.",
      excerpt: "Aprenda a instalar e configurar mise + Ruby no Ubuntu/Linux Mint. Gerenciamento moderno de versões para desenvolvimento Rails.",
      author: "Carlos Kvasir",
      authorUrl: "https://kvasir.dev",
      tags: ["ruby", "mise", "ubuntu", "linux mint", "instalação", "setup", "rbenv", "version manager"],
      keywords: ["mise ruby", "instalar ruby ubuntu", "ruby linux mint", "mise vs rbenv", "ruby version manager", "setup ruby linux"],
      topics: ["Ruby", "Setup", "Linux", "Ferramentas"],
      difficulty: "Iniciante",
      target_audience: ["Desenvolvedores", "Iniciantes Ruby"],
      readingTime: 6,
      contentType: "tutorial",
      category: "Tutorial",
      language: "pt-BR", 
      publishedAt: "2024-12-19T10:00:00.000Z",
      series: "Ruby Setup"
    },
    {
      title: "Como Organizar Imagens em Posts MDX: Guia Completo de Estrutura de Pastas",
      slug: "exemplo-post-com-imagem",
      date: "2024-12-19",
      year: "2024",
      month: "12",
      description: "Guia completo sobre organização de imagens em posts MDX: estrutura de pastas, boas práticas, versionamento com Git e otimização para blogs técnicos.",
      metaDescription: "Aprenda a organizar imagens em posts MDX de forma profissional. Estrutura de pastas, versionamento Git, caminhos relativos e boas práticas para blogs técnicos.",
      excerpt: "Tutorial prático sobre organização de imagens em posts MDX. Aprenda estrutura de pastas, caminhos relativos, versionamento e boas práticas para manter seu blog organizado.",
      author: "Carlos Kvasir",
      authorUrl: "https://kvasir.dev", 
      tags: ["mdx", "tutorial", "imagens", "organização", "blog", "markdown", "estrutura", "boas práticas", "versionamento", "git"],
      keywords: ["imagens mdx", "organização posts blog", "tutorial imagens markdown", "mdx images", "estrutura pastas blog", "caminhos relativos", "versionamento imagens", "blog técnico organização", "markdown images", "pasta estrutura"],
      topics: ["MDX", "Blog", "Organização", "Estrutura de Arquivos", "Markdown"],
      difficulty: "Iniciante",
      target_audience: ["Desenvolvedores", "Blogueiros Técnicos", "Content Creators", "Escritores Técnicos"],
      readingTime: 4,
      contentType: "tutorial",
      category: "Tutorial",
      language: "pt-BR",
      publishedAt: "2024-12-19T10:00:00.000Z",
      series: "MDX Essentials"
    }
  ]
}

async function generateRSSFeed() {
  try {
    console.log('🔄 Gerando RSS feed estático...')
    
    const posts = getAllPosts()
    
    // Configuração do feed RSS
    const feed = new RSS({
      title: 'Kvasir.dev - Ruby on Rails & Web Development',
      description: 'Blog especializado em Ruby on Rails, desenvolvimento web e tecnologias modernas. Tutoriais práticos, dicas e experiências reais de desenvolvimento.',
      site_url: 'https://kvasir.dev',
      feed_url: 'https://kvasir.dev/rss.xml',
      copyright: `Copyright ${new Date().getFullYear()} Carlos Kvasir`,
      language: 'pt-BR',
      ttl: 60,
      pubDate: new Date(),
      generator: 'Next.js Static RSS Generator',
      managingEditor: 'carlos@kvasir.dev (Carlos Kvasir)',
      webMaster: 'carlos@kvasir.dev (Carlos Kvasir)',
      categories: ['Technology', 'Programming', 'Ruby on Rails', 'Web Development', 'JavaScript', 'React'],
      custom_namespaces: {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/',
        'atom': 'http://www.w3.org/2005/Atom',
        'sy': 'http://purl.org/rss/1.0/modules/syndication/'
      },
      custom_elements: [
        { 'atom:link': { 
          _attr: { 
            href: 'https://kvasir.dev/rss.xml', 
            rel: 'self', 
            type: 'application/rss+xml' 
          } 
        }},
        { 'sy:updatePeriod': 'weekly' },
        { 'sy:updateFrequency': '1' },
      ]
    })

    // Adicionar cada post ao feed
    posts.forEach((post) => {
      const postUrl = `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`
      
      feed.item({
        title: post.title,
        description: post.metaDescription || post.description || post.excerpt || '',
        url: postUrl,
        guid: postUrl,
        date: new Date(post.publishedAt || post.date),
        author: `${post.authorUrl || 'carlos@kvasir.dev'} (${post.author || 'Carlos Kvasir'})`,
        categories: [
          ...(post.tags || []),
          ...(post.topics || []),
          post.category || 'Desenvolvimento'
        ].filter(Boolean),
        custom_elements: [
          // Content encoded (HTML completo)
          { 'content:encoded': {
            _cdata: `
              <p>${post.excerpt || post.description || ''}</p>
              ${post.ogImage ? `<img src="https://kvasir.dev${post.ogImage}" alt="${post.ogImageAlt || post.title}" style="max-width: 100%; height: auto;" />` : ''}
              <p><strong>Tempo de leitura:</strong> ${post.readingTime || 5} minutos</p>
              <p><strong>Dificuldade:</strong> ${post.difficulty || 'Intermediário'}</p>
              ${post.keywords && post.keywords.length > 0 ? `<p><strong>Palavras-chave:</strong> ${post.keywords.join(', ')}</p>` : ''}
              <p><a href="${postUrl}">Leia o artigo completo →</a></p>
            `
          }},
          // Dublin Core metadata
          { 'dc:creator': post.author || 'Carlos Kvasir' },
          { 'dc:subject': (post.keywords || post.tags || []).join(', ') },
          { 'dc:type': post.contentType || 'Text' },
          { 'dc:format': 'text/html' },
          { 'dc:language': post.language || 'pt-BR' },
          // Custom metadata
          ...(post.readingTime ? [{ 'readingTime': `${post.readingTime} min` }] : []),
          ...(post.difficulty ? [{ 'difficulty': post.difficulty }] : []),
          ...(post.contentType ? [{ 'contentType': post.contentType }] : []),
          ...(post.target_audience ? [{ 'audience': post.target_audience.join(', ') }] : []),
          ...(post.series ? [{ 'series': post.series }] : []),
        ],
        // Enclosure para imagem (se existir)
        ...(post.ogImage ? {
          enclosure: {
            url: `https://kvasir.dev${post.ogImage}`,
            type: 'image/jpeg'
          }
        } : {})
      })
    })

    // Gerar XML
    const xml = feed.xml({ indent: true })
    
    // Salvar na pasta public
    const outputPath = path.join(process.cwd(), 'public', 'rss.xml')
    fs.writeFileSync(outputPath, xml, 'utf8')
    
    console.log(`✅ RSS feed gerado com sucesso: ${outputPath}`)
    console.log(`📝 ${posts.length} posts incluídos no feed`)
    console.log(`🔗 Disponível em: https://kvasir.dev/rss.xml`)
    
  } catch (error) {
    console.error('❌ Erro ao gerar RSS feed:', error)
    process.exit(1)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateRSSFeed()
}

module.exports = { generateRSSFeed }
