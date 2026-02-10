import { useState, useEffect } from "react"
import "../styles/globals.css"
import BottomNav from "../components/BottomNav"
import { useRouter } from "next/router"
import Portal from "../components/Portal"

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light")
  const router = useRouter()
  const [portalOpen, setPortalOpen] = useState(false)

  function togglePortal() {
    setPortalOpen(prev => !prev)
  }
  
  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("kynar-theme")
    if (savedTheme) setTheme(savedTheme)
  }, [])
  
  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("kynar-theme", theme)
  }, [theme])
  
  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }
  
  return (
    <div className="app-root">
      <header className="top-bar">
        <span className="logo">Kynar</span>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main className="page">
        <Component {...pageProps} />
      </main>
      <Portal open={portalOpen} onClose={() => setPortalOpen(false)} />
      <BottomNav onPortal={togglePortal} />
      
    </div>
  )
}