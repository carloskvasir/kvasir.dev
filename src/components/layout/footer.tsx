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
          </div>
        </div>
      </div>
    </footer>
  )
}
