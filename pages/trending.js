import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function TrendingWorlds() {
  const [worlds, setWorlds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTrending() {
      setLoading(true)

      // 1. Get worlds
      const { data: worldsData } = await supabase
        .from("worlds")
        .select("id, name, description")

      if (!worldsData) {
        setLoading(false)
        return
      }

      // 2. For each world, count posts + products
      const enriched = await Promise.all(
        worldsData.map(async world => {
          const { count: postCount } = await supabase
            .from("world_posts")
            .select("*", { count: "exact", head: true })
            .eq("world_id", world.id)

          const { count: productCount } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("world_id", world.id)

          return {
            ...world,
            postCount: postCount || 0,
            productCount: productCount || 0
          }
        })
      )

      // 3. Sort by activity
      enriched.sort(
        (a, b) =>
          b.postCount * 2 + b.productCount -
          (a.postCount * 2 + a.productCount)
      )

      setWorlds(enriched)
      setLoading(false)
    }

    loadTrending()
  }, [])

  if (loading) return <p>Loading trending worlds…</p>

  return (
    <div>
      <h1>Trending Worlds</h1>
      <p style={{ opacity: 0.7 }}>
        Worlds gaining momentum across the universe
      </p>

      <div className="world-grid">
        {worlds.map(world => (
          <Link
            key={world.id}
            href={`/worlds/${world.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <a className="world-card">
              <h3>{world.name}</h3>
              <p>{world.description}</p>
              <small>
                {world.postCount} posts · {world.productCount} products
              </small>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}