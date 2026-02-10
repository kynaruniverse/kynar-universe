import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function PostComposer({ onClose, onPost }) {
  const [content, setContent] = useState("")
  const [worlds, setWorlds] = useState([])
  const [worldId, setWorldId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadWorlds() {
      const { data } = await supabase
        .from("worlds")
        .select("id, name")
        .order("name")

      setWorlds(data || [])
    }

    loadWorlds()
  }, [])

  async function submitPost() {
    if (!content.trim()) return
    setLoading(true)

    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from("posts")
      .insert({
        content,
        user_id: user.id,
        world_id: worldId
      })
      .select()
      .single()

    setLoading(false)

    if (!error) {
      onPost?.(data)
      onClose()
    }
  }

  return (
    <div className="composer-overlay">
      <div className="composer">
        <h2>Broadcast</h2>

        <textarea
          placeholder="Share something with the universe…"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <select onChange={e => setWorldId(e.target.value)}>
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