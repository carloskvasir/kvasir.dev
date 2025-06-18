import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "notes");

// Função para processar caminhos de imagens no conteúdo MDX
function processImagePaths(content: string, year: string, month: string, slug: string): string {
  // Substituir caminhos relativos de imagens por URLs da API
  return content.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    (match, alt, filename) => {
      return `![${alt}](/api/posts/${year}/${month}/${slug}/${filename})`;
    }
  );
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
          description: data.description || "",
          tags: data.tags || [],
          content: processImagePaths(content, year, month, slug),
          year,
          month,
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
          const { data, content } = matter(fileContents);        posts.push({
          slug,
          title: data.title || slug,
          date: data.date || "",
          description: data.description || "",
          tags: data.tags || [],
          content: processImagePaths(content, year, month, slug),
          year,
          month,
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
    const fullPath = path.join(postsDirectory, year, month, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      content: processImagePaths(content, year, month, slug),
      year,
      month,
    };
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
