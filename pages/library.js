import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useUser } from "@supabase/auth-helpers-react"

export default function Library() {
  const { user } = useUser()
  const [items, setItems] = useState([])
  
  useEffect(() => {
    if (!user) return
    
    async function loadLibrary() {
      const { data } = await supabase
        .from("vault_items")
        .select(`
          id,
          products (
            id,
            name,
            description
          )
        `)
        .eq("user_id", user.id)
      
      setItems(data || [])
    }
    
    loadLibrary()
  }, [user])
  
  return (
    <div>
      <h1>Your Library</h1>

      {items.length === 0 && (
        <p className="text-muted">
          You don’t own any assets yet.
        </p>
      )}

      {items.map(item => (
        <div key={item.id} className="product-card">
          <h3>{item.products.name}</h3>
          <p>{item.products.description}</p>
        </div>
      ))}
    </div>
  )
}