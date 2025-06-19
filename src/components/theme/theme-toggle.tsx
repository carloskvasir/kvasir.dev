"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleThemeChange = () => {
    setIsAnimating(true)
    setTheme(theme === "light" ? "dark" : "light")
    
    // Add animation class to body for complex transition
    document.body.classList.add('theme-change-trigger')
    
    // Remove animation class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-change-trigger')
      setIsAnimating(false)
    }, 600)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className={`h-9 w-9 ${isAnimating ? 'theme-change-elastic' : ''}`}
      disabled={isAnimating}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
