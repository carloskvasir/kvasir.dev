import { MainLayout } from "@/components/layout/main-layout";
import { getAllPosts } from "@/lib/notes";
import { Calendar, Tag } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Posts | Carlos Kvasir",
  description: "Compartilhando experiências, dicas e reflexões sobre desenvolvimento Rails, React, TypeScript e tecnologia em geral.",
  keywords: ["blog", "posts", "Rails", "React", "TypeScript", "desenvolvimento", "tecnologia", "Carlos Kvasir"],
  openGraph: {
    title: "Posts | Carlos Kvasir",
    description: "Compartilhando experiências, dicas e reflexões sobre desenvolvimento Rails, React, TypeScript e tecnologia em geral.",
    url: "https://kvasir.dev/notes",
    siteName: "Carlos Kvasir",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Posts do Carlos Kvasir",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | Carlos Kvasir",
    description: "Compartilhando experiências, dicas e reflexões sobre desenvolvimento Rails, React, TypeScript e tecnologia em geral.",
    images: ["/profile.jpg"],
  },
  alternates: {
    canonical: "https://kvasir.dev/notes",
  },
};

export default function NotesPage() {
  const posts = getAllPosts();

  return (
    <MainLayout>
      <div className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Posts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compartilhando experiências, dicas e reflexões sobre desenvolvimento 
              Rails e tecnologia em geral.
            </p>
          </div>

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={`${post.year}/${post.month}/${post.slug}`}
                  className="group border-b border-border pb-8 last:border-b-0"
                >
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        <Link
                          href={`/notes/${post.year}/${post.month}/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <span>{post.tags.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {post.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    
                    <Link
                      href={`/post/${post.slug}`}
                      className="inline-block text-primary hover:underline font-medium"
                    >
                      Ler mais →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Posts em breve</h3>
                <p className="text-muted-foreground">
                  Estou preparando conteúdo incrível para compartilhar. Volte em breve!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
