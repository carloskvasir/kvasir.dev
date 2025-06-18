import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src", "content", "notes");

// Função para processar caminhos de imagens no conteúdo MDX
function processImagePaths(
  content: string,
  year: string,
  month: string
): string {
  // Substituir caminhos relativos de imagens por URLs estáticas
  return content.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    (match, alt, filename) => {
      return `![${alt}](/posts/${year}/${month}/${filename})`;
    }
  );
}

// Função para calcular tempo de leitura estimado
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Média de palavras por minuto em português
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Mínimo de 1 minuto
}

// Função para extrair palavras-chave do conteúdo
function extractKeywords(
  content: string,
  tags: string[],
  title: string
): string[] {
  const keywords = new Set<string>();

  // Adicionar tags como keywords
  tags.forEach((tag) => keywords.add(tag.toLowerCase()));

  // Extrair palavras importantes do título
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 3);
  titleWords.forEach((word) => keywords.add(word));

  // Palavras técnicas comuns em posts de desenvolvimento
  const techKeywords = [
    "rails",
    "ruby",
    "react",
    "typescript",
    "javascript",
    "desenvolvimento",
    "api",
    "docker",
    "postgresql",
  ];
  techKeywords.forEach((keyword) => {
    if (content.toLowerCase().includes(keyword)) {
      keywords.add(keyword);
    }
  });

  return Array.from(keywords).slice(0, 10); // Máximo de 10 keywords
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  year: string;
  month: string;
  // Campos SEO adicionais
  excerpt?: string;
  keywords?: string[];
  author?: string;
  category?: string;
  readingTime?: number;
  lastModified?: string;
  canonicalUrl?: string;
  ogImage?: string;
  featured?: boolean;
  language?: string;
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  // Percorrer anos
  const years = fs.readdirSync(postsDirectory).filter((year) => {
    return fs.statSync(path.join(postsDirectory, year)).isDirectory();
  });

  years.forEach((year) => {
    const yearPath = path.join(postsDirectory, year);

    // Percorrer meses
    const months = fs.readdirSync(yearPath).filter((month) => {
      return fs.statSync(path.join(yearPath, month)).isDirectory();
    });

    months.forEach((month) => {
      const monthPath = path.join(yearPath, month);

      // Verificar se existem arquivos MDX diretos no mês
      const directFiles = fs
        .readdirSync(monthPath)
        .filter((file) => file.endsWith(".mdx"));

      // Processar arquivos MDX diretos
      directFiles.forEach((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(monthPath, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        posts.push({
          slug,
          title: data.title || slug,
          date: data.date || "",
          description: data.description || data.excerpt || "",
          tags: data.tags || [],
          content: processImagePaths(content, year, month),
          year,
          month,
          // Campos SEO adicionais
          excerpt: data.excerpt || data.description || "",
          keywords:
            data.keywords ||
            extractKeywords(content, data.tags || [], data.title || slug),
          author: data.author || "Carlos Kvasir",
          category: data.category || "Desenvolvimento",
          readingTime: data.readingTime || calculateReadingTime(content),
          lastModified: data.lastModified || data.date || "",
          canonicalUrl:
            data.canonicalUrl ||
            `https://kvasir.dev/notes/${year}/${month}/${slug}`,
          ogImage: data.ogImage || "/profile.jpg",
          featured: data.featured || false,
          language: data.language || "pt-BR",
        });
      });

      // Verificar se existem pastas de posts (como 1.post, 2.post, etc.)
      const postFolders = fs.readdirSync(monthPath).filter((item) => {
        const itemPath = path.join(monthPath, item);
        return fs.statSync(itemPath).isDirectory() && item.includes(".post");
      });

      // Processar posts dentro das pastas
      postFolders.forEach((folder) => {
        const folderPath = path.join(monthPath, folder);
        const filesInFolder = fs
          .readdirSync(folderPath)
          .filter((file) => file.endsWith(".mdx"));

        filesInFolder.forEach((file) => {
          const slug = file.replace(/\.mdx$/, "");
          const fullPath = path.join(folderPath, file);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          posts.push({
            slug,
            title: data.title || slug,
            date: data.date || "",
            description: data.description || data.excerpt || "",
            tags: data.tags || [],
            content: processImagePaths(content, year, month),
            year,
            month,
            // Campos SEO adicionais
            excerpt: data.excerpt || data.description || "",
            keywords:
              data.keywords ||
              extractKeywords(content, data.tags || [], data.title || slug),
            author: data.author || "Carlos Kvasir",
            category: data.category || "Desenvolvimento",
            readingTime: data.readingTime || calculateReadingTime(content),
            lastModified: data.lastModified || data.date || "",
            canonicalUrl:
              data.canonicalUrl ||
              `https://kvasir.dev/notes/${year}/${month}/${slug}`,
            ogImage: data.ogImage || "/profile.jpg",
            featured: data.featured || false,
            language: data.language || "pt-BR",
          });
        });
      });
    });
  });

  // Ordenar por data (mais recente primeiro)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(
  year: string,
  month: string,
  slug: string
): BlogPost | null {
  try {
    const monthPath = path.join(postsDirectory, year, month);

    // Primeiro, tentar arquivo MDX direto no mês
    try {
      const directPath = path.join(monthPath, `${slug}.mdx`);
      const fileContents = fs.readFileSync(directPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        description: data.description || "",
        tags: data.tags || [],
        content: processImagePaths(content, year, month),
        year,
        month,
      };
    } catch {
      // Se não encontrou diretamente, procurar nas pastas .post
      const postFolders = fs.readdirSync(monthPath).filter((item) => {
        const itemPath = path.join(monthPath, item);
        return fs.statSync(itemPath).isDirectory() && item.includes(".post");
      });

      for (const folder of postFolders) {
        try {
          const folderPath = path.join(monthPath, folder);
          const postPath = path.join(folderPath, `${slug}.mdx`);
          const fileContents = fs.readFileSync(postPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title || slug,
            date: data.date || "",
            description: data.description || "",
            tags: data.tags || [],
            content: processImagePaths(content, year, month),
            year,
            month,
          };
        } catch {
          // Continue procurando na próxima pasta
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag: string) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
