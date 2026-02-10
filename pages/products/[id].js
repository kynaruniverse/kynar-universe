import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!id) return

    async function loadProduct() {
      const { data } = await supabase
        .from("products")
        .select(`
          *,
          worlds (
            name
          )
        `)
        .eq("id", id)
        .single()

      setProduct(data)
    }

    loadProduct()
  }, [id])

  if (!product) return <p>Loading product…</p>
  
  async function addToVault() {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) return alert("Please sign in")

  await supabase.from("vault_items").insert({
    user_id: user.id,
    product_id: product.id
  })

  router.push("/library")
}

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <p>
        World: <strong>{product.worlds?.name}</strong>
      </p>

      <p>
        {product.price_cents === 0
          ? "This is a free artifact"
          : `Price: £${product.price_cents / 100}`}
      </p>

      <button
        onClick={addToVault}
        disabled={product.price_cents > 0}
      >
        Add to Vault
      </button>
    </div>
  )
}