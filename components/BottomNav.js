import Link from "next/link"
import { useRouter } from "next/router"

export default function BottomNav({ onPortal }) {
  const router = useRouter()
  
  function isActive(path) {
    return router.pathname === path
  }
  
  return (
    <nav className="bottom-nav">
      <Link href="/">
        <a className={isActive("/") ? "active" : ""}>🌍</a>
      </Link>

      <Link href="/square">
        <a className={isActive("/square") ? "active" : ""}>💬</a>
      </Link>

      {/* Portal slot (inactive for now) */}
      <button className="portal-btn" onClick={onPortal}>⬤</button>

      <Link href="/library">
        <a className={isActive("/library") ? "active" : ""}>📚</a>
      </Link>

      <Link href="/account">
        <a className={isActive("/account") ? "active" : ""}>👤</a>
      </Link>
    </nav>
  )
}