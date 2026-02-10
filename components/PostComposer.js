import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

function extractHashtags(text) {
  const matches = text.match(/#[a-zA-Z0-9_-]+/g)
  return matches ? matches.map(tag => tag.substring(1)) : []
}

export default function PostComposer({
  onClose,
  onPost,
  defaultWorldId = null
}) {
  const [content, setContent] = useState("")
  const [worlds, setWorlds] = useState([])
  const [worldId, setWorldId] = useState(defaultWorldId)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function loadWorlds() {
      const { data, error } = await supabase
        .from("worlds")
        .select("id, name")
        .order("name")
      
      if (!error) setWorlds(data || [])
    }
    
    loadWorlds()
  }, [])
  
  async function submitPost() {
    if (!content.trim()) return
    setLoading(true)
    setError(null)
    
    const {
      data: { user }
    } = await supabase.auth.getUser()
    
    if (!user) {
      setError("You must be signed in")
      setLoading(false)
      return
    }
    
    /* 1. Create post */
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        content,
        user_id: user.id
      })
      .select()
      .single()
    
    if (postError) {
      setError("Failed to create post")
      setLoading(false)
      return
    }
    
    /* 2. Link selected world */
    if (worldId) {
      await supabase.from("world_posts").insert({
        post_id: post.id,
        world_id: worldId
      })
    }
    
    /* 3. Link hashtag worlds */
    const hashtags = extractHashtags(content)
    
    if (hashtags.length > 0) {
      const { data: tagWorlds } = await supabase
        .from("worlds")
        .select("id, name")
        .in("name", hashtags)
      
      if (tagWorlds?.length) {
        const links = tagWorlds.map(w => ({
          post_id: post.id,
          world_id: w.id
        }))
        
        await supabase.from("world_posts").insert(links)
      }
    }
    
    setLoading(false)
    onPost?.(post)
    onClose()
  }
  
  return (
    <div className="composer-overlay">
      <div className="composer">
        <h2>Broadcast</h2>

        {error && <p className="error">{error}</p>}

        <textarea
          placeholder="Share something with this world…"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <select
          value={worldId || ""}
          onChange={e => setWorldId(e.target.value || null)}
        >
          <option value="">Choose a World</option>
          {worlds.map(world => (
            <option key={world.id} value={world.id}>
              {world.name}
            </option>
          ))}
        </select>

        <div className="composer-actions">
          <button onClick={onClose} className="ghost">
            Cancel
          </button>

          <button onClick={submitPost} disabled={loading}>
            {loading ? "Posting…" : "Post"}
          </button>
        </div>
      </div>
    </div>
  )
}