import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Square() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    async function loadFeed() {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          content,
          created_at,
          profiles (
            username,
            avatar_url
          ),
          worlds (
            name
          )
        `)
        .order("created_at", { ascending: false })
        .limit(50)
      
      if (!error) setPosts(data || [])
    }
    
    loadFeed()
  }, [])
  
  return (
    <div className="page">
      <h1>Social Square</h1>

      {posts.length === 0 && (
        <p className="muted">The universe is quiet… for now.</p>
      )}

      {posts.map(post => (
        <div key={post.id} className="card post">
          <div className="post-header">
            <strong>@{post.profiles?.username}</strong>
            <span className="muted">
              {" "}· {post.worlds?.name}
            </span>
          </div>

          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}