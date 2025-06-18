import { MainLayout } from "@/components/layout/main-layout";
import { mdxComponents } from "@/components/mdx-components";
import { getAllPosts } from "@/lib/notes";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  // Buscar o post pelo slug em qualquer ano/mês
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para os posts
          </Link>

          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {post.description && (
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>
            )}
          </header>

          {/* Post content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote 
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeHighlight,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                        properties: {
                          className: ["anchor"],
                        },
                      },
                    ],
                  ],
                },
              }}
              components={mdxComponents}
            />
          </article>
        </div>
      </div>
    </MainLayout>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  return {
    title: `${post.title} | kvasir.dev`,
    description: post.description,
  };
}
