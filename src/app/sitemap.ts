import { getAllPosts } from "@/lib/notes";

export const dynamic = "force-static";

export default function sitemap() {
  const posts = getAllPosts();
  const baseUrl = "https://kvasir.dev";

  // URLs estáticas
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // URLs dos posts
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/notes/${post.year}/${post.month}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // URLs dos posts (rota alternativa)
  const postAltUrls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticUrls, ...postUrls, ...postAltUrls];
}
