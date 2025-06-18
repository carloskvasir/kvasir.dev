import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false, // Precisamos desabilitar o mdxRs para usar plugins customizados
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm], // Suporte para tabelas GitHub Flavored Markdown
    rehypePlugins: [
      rehypeSlug, // Adiciona IDs aos cabeçalhos
      rehypeHighlight, // Destaque de sintaxe
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
});

export default withMDX(nextConfig);
