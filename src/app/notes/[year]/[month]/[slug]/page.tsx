import { MainLayout } from "@/components/layout/main-layout";
import { mdxComponents } from "@/components/mdx-components";
import { BlogPostSEO } from "@/components/seo";
import { getAllPosts, getPostBySlug } from "@/lib/notes";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface NotePostPageProps {
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NotePostPageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = getPostBySlug(year, month, slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você procura não foi encontrado.",
    };
  }

  const postUrl = post.canonicalUrl || `https://kvasir.dev/notes/${year}/${month}/${slug}`;

  return {
    title: post.title,
    description: post.excerpt || post.description || `Post sobre ${post.title} por ${post.author || 'Carlos Kvasir'}`,
    keywords: post.keywords || post.tags,
    authors: [{ name: post.author || "Carlos Kvasir" }],
    category: post.category || "Desenvolvimento",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description || `Post sobre ${post.title} por ${post.author || 'Carlos Kvasir'}`,
      url: postUrl,
      siteName: "Carlos Kvasir",
      images: [
        {
          url: post.ogImage || "/profile.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author || "Carlos Kvasir"],
      tags: post.tags,
      section: post.category || "Desenvolvimento",
      locale: post.language || "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.description || `Post sobre ${post.title} por ${post.author || 'Carlos Kvasir'}`,
      images: [post.ogImage || "/profile.jpg"],
      creator: "@carloskvasir",
    },
    alternates: {
      canonical: postUrl,
    },
    other: {
      "article:reading_time": `${post.readingTime || 5} minutos`,
      "article:word_count": post.content?.length.toString() || "0",
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    slug: post.slug,
  }));
}

export default async function NotePostPage({ params }: NotePostPageProps) {
  const { year, month, slug } = await params;
  const post = getPostBySlug(year, month, slug);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      {/* SEO e Dados estruturados */}
      <BlogPostSEO post={post} />
      
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
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} min de leitura
                </div>
              )}
              
              {post.author && post.author !== "Carlos Kvasir" && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </div>
              )}
              
              {post.category && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {post.category}
                </div>
              )}
              
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
            
            {(post.excerpt || post.description) && (
              <p className="text-xl text-muted-foreground">
                {post.excerpt || post.description}
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
