'use client'

import Script from 'next/script'

export default function PageclipScript() {
  return (
    <Script 
      src="https://s.pageclip.co/v1/pageclip.js" 
      strategy="afterInteractive"
      charSet="utf-8"
    />
  )
}
