import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Account() {
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData?.user) return
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single()
      
      setProfile(data)
    }
    
    loadProfile()
  }, [])
  
  async function saveProfile() {
    await supabase
      .from("profiles")
      .update({
        username: profile.username,
        bio: profile.bio,
        updated_at: new Date().toISOString()
      })
      .eq("id", profile.id)
    
    alert("Profile saved")
  }
  
  if (!profile) return <p>Loading...</p>
  
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

      <textarea
        placeholder="Bio"
        value={profile.bio || ""}
        onChange={e =>
          setProfile({ ...profile, bio: e.target.value })
        }
      />

      <button onClick={saveProfile}>Save</button>
    </div>
  )
}