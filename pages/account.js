import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useUser } from "@supabase/auth-helpers-react"

export default function Account() {
  const { user } = useUser()
  const [profile, setProfile] = useState(null)
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    if (!user) return
    
    async function loadProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, bio, avatar_url")
        .eq("id", user.id)
        .single()
      
      setProfile(data)
    }
    
    loadProfile()
  }, [user])
  
  async function saveProfile() {
    if (!profile) return
    
    setSaving(true)
    
    await supabase
      .from("profiles")
      .update({
        username: profile.username,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq("id", profile.id)
    
    setSaving(false)
  }
  
  if (!user) return <p>Please sign in.</p>
  if (!profile) return <p>Loading your account…</p>
  
  return (
    <div>
      <h1>Your Account</h1>

      <input
        placeholder="Username"
        value={profile.username || ""}
        onChange={e =>
          setProfile({ ...profile, username: e.target.value })
        }
      />

      <input
        placeholder="Avatar URL"
        value={profile.avatar_url || ""}
        onChange={e =>
          setProfile({ ...profile, avatar_url: e.target.value })
        }
      />

      <textarea
        placeholder="Bio"
        value={profile.bio || ""}
        onChange={e =>
          setProfile({ ...profile, bio: e.target.value })
        }
      />

      <button onClick={saveProfile} disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  )
}