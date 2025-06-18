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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={getLinkClasses("/")}
              >
                Home
              </Link>
              <a
                href="#projetos"
                onClick={handleProjectsClick}
                className={getLinkClasses("/projetos")}
              >
                Projetos
              </a>
              <Link
                href="/notes"
                className={getLinkClasses("/notes")}
              >
                Posts
              </Link>
            </nav>

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
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className={getMobileLinkClasses("/")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#projetos"
                onClick={handleProjectsClick}
                className={getMobileLinkClasses("/projetos")}
              >
                Projetos
              </a>
              <Link
                href="/notes"
                className={getMobileLinkClasses("/notes")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
