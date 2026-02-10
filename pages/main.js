import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"
export default function Main() {
  const [worlds, setWorlds] = useState([])
  
  useEffect(() => {
    async function loadWorlds() {
      const { data } = await supabase
        .from("worlds")
        .select("*")
        .order("created_at")
      
      setWorlds(data || [])
    }
    
    loadWorlds()
  }, [])
  
  return (
    <div>
      <h1>Worlds</h1>

      <Link href={`/worlds/${world.name.toLowerCase()}`} key={world.id}>
        <a className="world-card">
          <h3>{world.name}</h3>
          <p>{world.description}</p>
        </a>
      </Link>
    </div>
  )
}