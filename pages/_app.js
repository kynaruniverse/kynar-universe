import { useState, useEffect } from "react"
import "../styles/globals.css"
import BottomNav from "../components/BottomNav"
import Portal from "../components/Portal"

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light")
  const [portalOpen, setPortalOpen] = useState(false)
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("kynar-theme")
    if (savedTheme) setTheme(savedTheme)
  }, [])
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("kynar-theme", theme)
  }, [theme])
  
  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }
  
  function togglePortal() {
    setPortalOpen(prev => !prev)
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