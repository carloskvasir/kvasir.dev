# Site Pessoal - Carlos Kvasir

Site pessoal estático desenvolvido com Next.js, TypeScript, Tailwind CSS e shadcn/ui. Inclui sistema de posts com MDX, modo escuro/claro e otimizado para SEO.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework de estilização
- **shadcn/ui** - Componentes de interface
- **MDX** - Sistema de posts com Markdown + JSX
- **next-themes** - Gerenciamento de tema claro/escuro
- **Lucide React** - Ícones
- **mise** - Gerenciamento de versões de ferramentas

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/                  # App Router do Next.js
│   │   ├── notes/           # Sistema de notes
│   │   ├── projetos/        # Página de projetos
│   │   ├── layout.tsx       # Layout raiz
│   │   ├── page.tsx         # Página home
│   │   └── globals.css      # Estilos globais
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes shadcn/ui
│   │   ├── header.tsx      # Cabeçalho com navegação
│   │   ├── footer.tsx      # Rodapé
│   │   ├── main-layout.tsx # Layout principal
│   │   ├── theme-*.tsx     # Componentes de tema
│   │   └── seo.tsx         # Componente de SEO
│   ├── data/               # Dados estáticos
│   │   └── projetos.json   # Lista de projetos
│   └── lib/                # Utilitários
│       ├── notes.ts        # Funções das notes
│       └── utils.ts        # Utilitários gerais
├── notes/                  # Posts em MDX
│   └── ano/mês/N.post/    # Estrutura: notes/2024/12/1.post/
│       ├── post.mdx       # Arquivo do post
│       └── imagem.png     # Imagens do post
├── public/                 # Arquivos estáticos
├── .tool-versions         # Versões das ferramentas (mise)
└── LICENSE                # Licença MPL 2.0
```

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] **Tema Claro/Escuro** - Toggle automático com detecção do sistema
- [x] **Página Home** - Apresentação pessoal com foto e links
- [x] **Página de Projetos** - Lista dinâmica de projetos a partir de JSON
- [x] **Sistema de Posts** - Posts em MDX com estrutura organizada por data
- [x] **SEO Otimizado** - Meta tags, Open Graph, Twitter Cards
- [x] **Design Responsivo** - Interface adaptável para todos os dispositivos
- [x] **Navegação** - Header com links e footer informativo
- [x] **Build Estático** - Compatível com deploy na Netlify

## 🛠 Desenvolvimento

### Pré-requisitos

- **Node.js 20.11.1** (gerenciado via mise)
- **mise** instalado

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repo>
cd psite
```

2. Instale o Node.js via mise:
```bash
mise install
```

3. Instale as dependências:
```bash
npm install
```

4. Execute em modo desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## 🚀 Deploy

### Netlify

O projeto está configurado para deploy automático na Netlify:

1. Conecte o repositório à Netlify
2. Configure as variáveis de ambiente (se necessário)
3. O build será feito automaticamente com `npm run build`
4. Site será servido como estático

## 📝 Adicionando Conteúdo

### Nova Note

1. Crie uma pasta `notes/ano/mes/N.post/` (onde N é um número sequencial)
2. Crie o arquivo MDX dentro da pasta: `titulo-do-post.mdx`
3. Adicione as imagens na mesma pasta
4. Use caminhos relativos no MDX: `![alt](./imagem.png)`
5. Adicione o frontmatter necessário
6. Escreva o conteúdo em Markdown/JSX
7. O post aparecerá automaticamente na lista

Consulte [docs/IMAGES.md](docs/IMAGES.md) para mais detalhes sobre imagens.

### Novo Projeto

1. Edite `src/data/projetos.json`
2. Adicione um novo objeto com as informações do projeto
3. O projeto aparecerá automaticamente na página

## 📄 Licença

Este projeto está licenciado sob a Mozilla Public License 2.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📧 Contato

- **GitHub**: [github.com/carloskvasir](https://github.com/carloskvasir)
- **LinkedIn**: [linkedin.com/in/carloskvasir](https://linkedin.com/in/carloskvasir)
- **Site**: [kvasir.dev](https://kvasir.dev)

---

Desenvolvido com ❤️ por Carlos Kvasir
