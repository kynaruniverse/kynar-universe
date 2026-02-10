import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"
import PostComposer from "../../components/PostComposer"

export default function WorldPage() {
  const router = useRouter()
  const { name } = router.query
  
  const [world, setWorld] = useState(null)
  const [products, setProducts] = useState([])
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({ posts: 0, products: 0 })
  const [loading, setLoading] = useState(true)
  const [showComposer, setShowComposer] = useState(false)
  
  useEffect(() => {
    if (!name) return
    
    async function loadWorldData() {
      setLoading(true)
      const worldSlug = name.replace(/-/g, " ")
      
      /* 1. Load world */
      const { data: worldData } = await supabase
        .from("worlds")
        .select("*")
        .ilike("name", worldSlug)
        .single()
      
      if (!worldData) {
        setLoading(false)
        return
      }
      
      setWorld(worldData)
      
      /* 2. Products */
      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("world_id", worldData.id)
      
      setProducts(productData || [])
      
      /* 3. Posts */
      const { data: postData } = await supabase
        .from("world_posts")
        .select(`
          posts (
            id,
            content,
            created_at,
            profiles (
              username
            )
          )
        `)
        .eq("world_id", worldData.id)
        .order("created_at", { ascending: false })
        .limit(5)
      
      const cleanedPosts =
        postData?.map(p => p.posts).filter(Boolean) || []
      
      setPosts(cleanedPosts)
      
      /* 4. Stats */
      setStats({
        posts: cleanedPosts.length,
        products: productData?.length || 0
      })
      
      setLoading(false)
    }
    
    loadWorldData()
  }, [name])
  
  if (loading) return <p>Loading World…</p>
  if (!world) return <p>World not found.</p>
  
  return (
    <div>
      <h1>{world.name}</h1>
      <p>{world.description}</p>

      {/* World stats */}
      <div style={{ marginTop: 12, opacity: 0.7 }}>
        {stats.posts} posts · {stats.products} products
      </div>

      <button onClick={() => setShowComposer(true)}>
        Post to this World
      </button>

      {showComposer && (
        <PostComposer
          defaultWorldId={world.id}
          onClose={() => setShowComposer(false)}
        />
      )}

      {/* Activity */}
      <h2 style={{ marginTop: 24 }}>Recent Activity</h2>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map(post => (
        <div key={post.id} className="post">
          <strong>@{post.profiles?.username}</strong>
          <p>{post.content}</p>
        </div>
      ))}

      {/* Products */}
      <h2 style={{ marginTop: 32 }}>Products</h2>

      {products.length === 0 && <p>No products yet.</p>}

      <div className="product-grid">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <a className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>
                {product.price_cents === 0
                  ? "Free"
                  : `£${product.price_cents / 100}`}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}