import { getAllPosts } from "@/lib/notes";
import RSS from "rss";

export async function GET() {
  const posts = getAllPosts();

  // Configuração do feed RSS
  const feed = new RSS({
    title: "Kvasir.dev - Ruby on Rails & Web Development",
    description:
      "Blog especializado em Ruby on Rails, desenvolvimento web e tecnologias modernas. Tutoriais práticos, dicas e experiências reais de desenvolvimento.",
    site_url: "https://kvasir.dev",
    feed_url: "https://kvasir.dev/rss.xml",
    copyright: `Copyright ${new Date().getFullYear()} Carlos Kvasir`,
    language: "pt-BR",
    ttl: 60,
    pubDate: new Date(),
    generator: "Next.js RSS Generator",
    managingEditor: "carlos@kvasir.dev (Carlos Kvasir)",
    webMaster: "carlos@kvasir.dev (Carlos Kvasir)",
    categories: [
      "Technology",
      "Programming",
      "Ruby on Rails",
      "Web Development",
      "JavaScript",
      "React",
    ],
    custom_namespaces: {
      content: "http://purl.org/rss/1.0/modules/content/",
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
    },
    custom_elements: [
      {
        "atom:link": {
          _attr: {
            href: "https://kvasir.dev/rss.xml",
            rel: "self",
            type: "application/rss+xml",
          },
        },
      },
      { "sy:updatePeriod": "weekly" },
      { "sy:updateFrequency": "1" },
    ],
  });

  // Adicionar cada post ao feed
  posts.forEach((post) => {
    const postUrl = `https://kvasir.dev/notes/${post.year}/${post.month}/${post.slug}`;

    feed.item({
      title: post.title,
      description:
        post.metaDescription || post.description || post.excerpt || "",
      url: postUrl,
      guid: postUrl,
      date: new Date(post.publishedAt || post.date),
      author: `${post.authorUrl || "carlos@kvasir.dev"} (${
        post.author || "Carlos Kvasir"
      })`,
      categories: [
        ...(post.tags || []),
        ...(post.topics || []),
        post.category || "Desenvolvimento",
      ].filter(Boolean),
      custom_elements: [
        // Content encoded (HTML completo)
        {
          "content:encoded": {
            _cdata: `
            <p>${post.excerpt || post.description || ""}</p>
            ${
              post.ogImage
                ? `<img src="https://kvasir.dev${post.ogImage}" alt="${
                    post.ogImageAlt || post.title
                  }" style="max-width: 100%; height: auto;" />`
                : ""
            }
            <p><strong>Tempo de leitura:</strong> ${
              post.readingTime || 5
            } minutos</p>
            <p><strong>Dificuldade:</strong> ${
              post.difficulty || "Intermediário"
            }</p>
            ${
              post.keywords && post.keywords.length > 0
                ? `<p><strong>Palavras-chave:</strong> ${post.keywords.join(
                    ", "
                  )}</p>`
                : ""
            }
            <p><a href="${postUrl}">Leia o artigo completo →</a></p>
          `,
          },
        },
        // Dublin Core metadata
        { "dc:creator": post.author || "Carlos Kvasir" },
        { "dc:subject": (post.keywords || post.tags || []).join(", ") },
        { "dc:type": post.contentType || "Text" },
        { "dc:format": "text/html" },
        { "dc:language": post.language || "pt-BR" },
        // Custom metadata
        ...(post.readingTime
          ? [{ readingTime: `${post.readingTime} min` }]
          : []),
        ...(post.difficulty ? [{ difficulty: post.difficulty }] : []),
        ...(post.contentType ? [{ contentType: post.contentType }] : []),
        ...(post.target_audience
          ? [{ audience: post.target_audience.join(", ") }]
          : []),
        ...(post.series ? [{ series: post.series }] : []),
      ],
      // Enclosure para imagem (se existir)
      ...(post.ogImage
        ? {
            enclosure: {
              url: `https://kvasir.dev${post.ogImage}`,
              type: "image/jpeg",
            },
          }
        : {}),
    });
  });

  // Retornar o XML com headers apropriados
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "CDN-Cache-Control": "public, max-age=3600",
      "Vercel-CDN-Cache-Control": "public, max-age=3600",
    },
  });
}

// Configuração para build estático
export const dynamic = "force-static";
export const revalidate = 3600; // Revalida a cada hora
