import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Library() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    async function loadVault() {
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
      
      setItems(data || [])
    }
    
    loadVault()
  }, [])
  
  return (
    <div>
      <h1>Your Vault</h1>

      {items.length === 0 && <p>Your vault is empty.</p>}

      {items.map(item => (
        <div key={item.id} className="product-card">
          <h3>{item.products.name}</h3>
          <p>{item.products.description}</p>
        </div>
      ))}
    </div>
  )
}