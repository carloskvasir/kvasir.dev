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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
