"use client";

import projetos from "@/content/projetos.json";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  year: string;
  month: string;
  content: string;
}

export default function ContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados de posts para a página de conteúdo
    // Em um cenário real, você buscaria esses dados de uma API
    const mockPosts: Post[] = [
      {
        slug: "bem-vindo-as-notes",
        title: "Bem-vindo às minhas notes",
        date: "2024-12-17",
        description: "Primeiro post das notes pessoais onde compartilho experiências como desenvolvedor Rails",
        tags: ["notes", "apresentação", "rails"],
        year: "2024",
        month: "12",
        content: "Mock content..."
      },
      {
        slug: "ambiente-desenvolvimento-rails",
        title: "Configurando um Ambiente de Desenvolvimento Rails Perfeito",
        date: "2024-12-18",
        description: "Um guia completo para configurar um ambiente de desenvolvimento Rails moderno",
        tags: ["rails", "desenvolvimento", "ambiente"],
        year: "2024",
        month: "12",
        content: "Mock content..."
      }
    ];
    
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  // Estado e função comentados para uso futuro
  // const [newProject, setNewProject] = useState({
  //   name: "",
  //   github: "",
  //   link: "",
  //   short_desc: "",
  //   long_desc: ""
  // });

  // const handleProjectSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Aqui você pode implementar a lógica para salvar o projeto
  //   console.log("Novo projeto:", newProject);
  //   alert("Projeto adicionado! (Para implementar: salvar no arquivo JSON)");
  //   setNewProject({
  //     name: "",
  //     github: "",
  //     link: "",
  //     short_desc: "",
  //     long_desc: ""
  //   });
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Gerenciamento de Conteúdo</h1>
      
      {/* Seção de Projetos */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Projetos</h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-medium mb-4">JSON dos Projetos:</h3>
          <pre className="bg-white dark:bg-gray-800 p-4 rounded border overflow-x-auto text-sm">
            <code>{JSON.stringify(projetos, null, 2)}</code>
          </pre>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto, index) => (
            <div key={index} className="border rounded-lg p-6 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">{projeto.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{projeto.short_desc}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{projeto.long_desc}</p>
              <div className="flex gap-2">
                <a
                  href={projeto.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  GitHub
                </a>
                {projeto.link && (
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Posts */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Posts</h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-medium mb-4">JSON dos Posts:</h3>
          <pre className="bg-white dark:bg-gray-800 p-4 rounded border overflow-x-auto text-sm max-h-96">
            <code>{JSON.stringify(posts.map(post => ({
              slug: post.slug,
              title: post.title,
              date: post.date,
              description: post.description,
              tags: post.tags,
              year: post.year,
              month: post.month,
              contentLength: post.content.length
            })), null, 2)}</code>
          </pre>
        </div>
        
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <div key={index} className="border rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{post.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/notes/${post.year}/${post.month}/${post.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Ler Post
                </Link>
                <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {post.content.length} caracteres
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
