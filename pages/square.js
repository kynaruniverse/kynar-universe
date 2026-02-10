import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

function renderPostContent(text) {
  const parts = text.split(/(#[a-zA-Z0-9_-]+)/g)

  return parts.map((part, index) => {
    if (part.startsWith("#")) {
      const worldName = part.substring(1)
      return (
        <Link
          key={index}
          href={`/worlds/${worldName.toLowerCase()}`}
        >
          <a className="hashtag">{part}</a>
        </Link>
      )
    }
    return <span key={index}>{part}</span>
  })
}

export default function SocialSquare() {
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
          world_posts (
            worlds (
              name
            )
          )
        `)
        .order("created_at", { ascending: false })
        .limit(50)
      
      if (error) {
        console.error("Error loading posts:", error)
        return
      }
      
      setPosts(data || [])
    }
  
    loadFeed()
  }, [])
  
  return (
    <div>
      <h1>Social Square</h1>

      {posts.map(post => (
        <div key={post.id} className="post">
          <strong>@{post.profiles?.username}</strong>
          <p>{renderPostContent(post.content)}</p>

          <div className="hashtags">
            {post.world_posts?.map(wp => (
              <span key={wp.worlds.name}>
                #{wp.worlds.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}