import PageclipScript from "@/components/pageclip-script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Carlos Kvasir - Desenvolvedor Rails Full Stack",
    template: "%s | Carlos Kvasir"
  },
  description: "Site pessoal de Carlos Kvasir - Desenvolvedor Rails Full Stack. Especialista em desenvolvimento web com Ruby on Rails, React, TypeScript e soluções escaláveis.",
  keywords: ["Carlos Kvasir", "Desenvolvedor Rails", "Ruby on Rails", "React", "TypeScript", "Full Stack", "Desenvolvedor Web", "API REST", "JavaScript"],
  authors: [{ name: "Carlos Kvasir" }],
  creator: "Carlos Kvasir",
  publisher: "Carlos Kvasir",
  metadataBase: new URL("https://kvasir.dev"),
  alternates: {
    canonical: "/",
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'Kvasir.dev RSS Feed' }
      ]
    }
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://kvasir.dev",
    siteName: "Carlos Kvasir",
    title: "Carlos Kvasir - Desenvolvedor Rails Full Stack",
    description: "Site pessoal de Carlos Kvasir - Desenvolvedor Rails Full Stack. Especialista em desenvolvimento web com Ruby on Rails, React, TypeScript e soluções escaláveis.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Kvasir - Desenvolvedor Rails Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Kvasir - Desenvolvedor Rails Full Stack",
    description: "Site pessoal de Carlos Kvasir - Desenvolvedor Rails Full Stack. Especialista em desenvolvimento web com Ruby on Rails, React, TypeScript e soluções escaláveis.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "", // adicione se tiver
    "msvalidate.01": "", // adicione se tiver  
    // Meta tags para sitelinks
    "sitelinks-searchbox-target": "https://kvasir.dev/notes?q={searchTerms}",
    "navigation-elements": "Home,Projetos,Posts,Contato"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen" />
        
        {/* Sitelinks para Google Search */}
        <link rel="alternate" href="https://kvasir.dev" hrefLang="pt-br" title="Home - Carlos Kvasir Desenvolvedor Rails" />
        <link rel="alternate" href="https://kvasir.dev/#projetos" hrefLang="pt-br" title="Projetos - Portfolio Rails e React" />
        <link rel="alternate" href="https://kvasir.dev/notes" hrefLang="pt-br" title="Posts - Blog sobre Desenvolvimento" />
        <link rel="alternate" href="https://kvasir.dev/#contato" hrefLang="pt-br" title="Contato - Desenvolvedor Rails" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Add preload class to disable transitions during initial load
                document.documentElement.classList.add('preload');
                
                // Remove preload class after a short delay to enable smooth transitions
                const removePreload = () => {
                  setTimeout(() => {
                    document.documentElement.classList.remove('preload');
                  }, 100);
                };
                
                // Use multiple event listeners to ensure transitions are enabled
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', removePreload);
                } else {
                  removePreload();
                }
                
                window.addEventListener('load', removePreload);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <PageclipScript />
      </body>
    </html>
  );
}
