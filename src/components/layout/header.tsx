"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ThemeToggle } from "../theme/theme-toggle"
import { Button } from "../ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === "/") {
      // Se estamos na home, scroll para a seção
      const projectsSection = document.getElementById("projetos")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Se não estamos na home, navega para home e depois scroll
      window.location.href = "/#projetos"
    }
    setMobileMenuOpen(false)
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === "/") {
      // Se estamos na home, scroll para a seção
      const contactSection = document.getElementById("contato")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Se não estamos na home, navega para home e depois scroll
      window.location.href = "/#contato"
    }
    setMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const getLinkClasses = (path: string) => {
    const baseClasses = "text-sm font-medium transition-colors hover:text-foreground/80"
    const activeClasses = isActive(path) 
      ? "text-foreground" 
      : "text-foreground/60"
    return `${baseClasses} ${activeClasses}`
  }

  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "block px-3 py-2 text-base font-medium transition-colors hover:text-foreground/80"
    const activeClasses = isActive(path) 
      ? "text-foreground" 
      : "text-foreground/60"
    return `${baseClasses} ${activeClasses}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg sm:text-xl">
                Carlos Kvasir
              </span>
            </Link>
          </div>

          {/* Right Side - Desktop Navigation + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Navegação principal">
              <Link
                href="/"
                className={getLinkClasses("/")}
                title="Página inicial - Carlos Kvasir Desenvolvedor Rails"
              >
                Home
              </Link>
              <a
                href="#projetos"
                onClick={handleProjectsClick}
                className={getLinkClasses("/projetos")}
                title="Portfolio de projetos desenvolvidos em Rails e React"
              >
                Projetos
              </a>
              <Link
                href="/notes"
                className={getLinkClasses("/notes")}
                title="Blog com artigos sobre desenvolvimento Rails e web"
              >
                Posts
              </Link>
              <a
                href="#contato"
                onClick={handleContactClick}
                className={getLinkClasses("/contato")}
                title="Entre em contato para projetos de desenvolvimento"
              >
                Contato
              </a>
            </nav>

            {/* RSS Button - discreto */}
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="RSS Feed"
              title="Subscribe ao RSS Feed"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 11a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 4a16 16 0 0 1 16 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5" cy="19" r="1" fill="currentColor" />
              </svg>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-background" role="navigation" aria-label="Menu de navegação mobile">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className={getMobileLinkClasses("/")}
                onClick={() => setMobileMenuOpen(false)}
                title="Página inicial - Carlos Kvasir Desenvolvedor Rails"
              >
                Home
              </Link>
              <a
                href="#projetos"
                onClick={handleProjectsClick}
                className={getMobileLinkClasses("/projetos")}
                title="Portfolio de projetos desenvolvidos em Rails e React"
              >
                Projetos
              </a>
              <Link
                href="/notes"
                className={getMobileLinkClasses("/notes")}
                onClick={() => setMobileMenuOpen(false)}
                title="Blog com artigos sobre desenvolvimento Rails e web"
              >
                Posts
              </Link>
              <a
                href="#contato"
                onClick={handleContactClick}
                className={getMobileLinkClasses("/contato")}
                title="Entre em contato para projetos de desenvolvimento"
              >
                Contato
              </a>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                title="Subscribe ao RSS Feed"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 11a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 4a16 16 0 0 1 16 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="5" cy="19" r="1" fill="currentColor" />
                </svg>
                RSS Feed
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
