export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:px-8 md:h-20 md:flex-row md:gap-4 md:py-0">
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2025 Carlos Kvasir. Todos os direitos reservados.
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/carloskvasir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/carloskvasir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              aria-label="RSS Feed"
              title="Subscribe ao RSS Feed"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
