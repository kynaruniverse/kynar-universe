import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function Worlds() {
  const [worlds, setWorlds] = useState([])
  
  useEffect(() => {
    async function loadWorlds() {
      const { data } = await supabase
        .from("worlds")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: true })
      
      setWorlds(data || [])
    }
    
    loadWorlds()
  }, [])
  
  return (
    <div>
      <h1 className="text-xl font-semibold">Worlds</h1>
      <p className="text-muted mt-2">
        Explore distinct worlds inside the Kynar Universe.
      </p>

      <div className="mt-6 space-y-4">
        {worlds.map(world => (
          <Link
            key={world.id}
            href={`/worlds/${world.name.toLowerCase()}`}
          >
            <a className="world-card">
              <h3>{world.name}</h3>
              <p>{world.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}