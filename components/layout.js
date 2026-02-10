import { useState } from "react"
import BottomNav from "./BottomNav"
import Portal from "./portal"

export default function Layout({ children }) {
  const [portalOpen, setPortalOpen] = useState(false)

  return (
    <div className="app-root">
      <main className="page">{children}</main>

      <BottomNav onPortal={() => setPortalOpen(true)} />

      <Portal
        open={portalOpen}
        onClose={() => setPortalOpen(false)}
      />
    </div>
  )
}