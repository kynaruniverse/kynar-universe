import BottomNav from "./BottomNav"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-16">
      <main className="p-4">{children}</main>
      <BottomNav />
    </div>
  )
}