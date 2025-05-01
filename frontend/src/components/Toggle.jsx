import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeContextProvider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="relative">
      {/* Sun Icon (visible in light mode) */}
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all scale-100 rotate-0 dark:scale-0 dark:rotate-90" />

      {/* Moon Icon (visible in dark mode) */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
