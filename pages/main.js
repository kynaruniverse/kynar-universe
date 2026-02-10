import Link from "next/link"

export default function Main() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-semibold">
          Welcome to the Kynar Universe
        </h1>
        <p className="text-muted mt-2">
          A connected ecosystem of worlds, identity, assets, and community.
        </p>
      </section>

      {/* Primary Navigation */}
      <section className="grid gap-4">
        <Link href="/worlds">
          <a className="nav-card">
            <h2>🌍 Worlds</h2>
            <p>Explore marketplaces, cultures, and economies.</p>
          </a>
        </Link>

        <Link href="/vault">
          <a className="nav-card">
            <h2>🗝 Vault</h2>
            <p>Access and manage your owned assets.</p>
          </a>
        </Link>

        <Link href="/square">
          <a className="nav-card">
            <h2>💬 Social Square</h2>
            <p>Join the conversation across worlds.</p>
          </a>
        </Link>

        <Link href="/account">
          <a className="nav-card">
            <h2>🧑 Identity</h2>
            <p>Your profile, presence, and settings.</p>
          </a>
        </Link>
      </section>
    </div>
  )
}