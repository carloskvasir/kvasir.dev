# Content Directory

Este diretório contém todo o conteúdo do site, incluindo:

## Estrutura

- `projetos.json` - Lista de projetos exibidos no site
- `notes/` - Posts e artigos do blog organizados por ano/mês

## Como adicionar conteúdo

### Adicionar um novo projeto

Edite o arquivo `projetos.json` e adicione um novo objeto com a seguinte estrutura:

```json
{
  "name": "Nome do Projeto",
  "github": "https://github.com/usuario/repo",
  "link": "https://projeto.com", // opcional
  "short_desc": "Descrição curta do projeto",
  "long_desc": "Descrição mais detalhada do projeto"
}
```

### Adicionar um novo post

1. Navegue até `notes/YYYY/MM/` (crie os diretórios se não existirem)
2. Crie um arquivo `.mdx` com o nome do post ou uma pasta `N.post/` com um arquivo `.mdx` dentro
3. Use o seguinte formato no início do arquivo:

```mdx
---
title: "Título do Post"
date: "YYYY-MM-DD"
description: "Descrição do post"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...
```

## Estrutura de diretórios

```
src/content/
├── projetos.json
└── notes/
    └── 2024/
        └── 12/
            ├── exemplo-post.mdx
            └── 1.post/
                └── exemplo-post-pasta.mdx
```
