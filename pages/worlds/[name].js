import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function WorldPage() {
  const router = useRouter()
  const { name } = router.query
  const [world, setWorld] = useState(null)
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    if (!name) return
    
    async function loadWorldAndProducts() {
      const { data: worldData } = await supabase
        .from("worlds")
        .select("*")
        .ilike("name", name)
        .single()
      
      if (!worldData) return
      
      setWorld(worldData)
      
      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("world_id", worldData.id)
      
      setProducts(productData || [])
    }
    
    loadWorldAndProducts()
  }, [name])
  
  if (!world) return <p>Loading World…</p>
  
  return (
    <div>
      <h1>{world.name}</h1>
      <p>{world.description}</p>

      <h2>Products</h2>

      {products.length === 0 && <p>No products yet.</p>}

      <div className="product-grid">
        {products.map(product => (
          <Link href={`/products/${product.id}`}>
            <div className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>{product.price_cents === 0 ? "Free" : `£${product.price_cents / 100}`}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}