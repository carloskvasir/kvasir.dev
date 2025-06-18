import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  url?: string
  image?: string
  type?: string
}

export function SEO({
  title = 'Carlos Kvasir - Desenvolvedor Rails',
  description = 'Site pessoal de Carlos Kvasir - Desenvolvedor Rails Full Stack especializado em desenvolvimento web moderno',
  keywords = 'Carlos Kvasir, desenvolvedor rails, ruby on rails, desenvolvimento web, full stack developer, programador',
  author = 'Carlos Kvasir',
  url = 'https://kvasir.dev',
  image = '/og-image.jpg',
  type = 'website'
}: SEOProps) {
  const fullTitle = title.includes('Carlos Kvasir') ? title : `${title} - Carlos Kvasir`
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Carlos Kvasir" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#000000" />
    </Head>
  )
}
