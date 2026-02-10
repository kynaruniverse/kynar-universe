import { useRouter } from "next/router"
import PostComposer from "../components/PostComposer"
export default function Portal({ open, onClose }) {
  const router = useRouter()
  const [showComposer, setShowComposer] = useState(false)

  if (!open) return null

  function getActions() {
    switch (router.pathname) {
      case "/":
        return ["Search Worlds", "Teleport"]
      case "/square":
        return ["Create Post"]
      case "/library":
        return ["Recent Downloads"]
      case "/account":
        return ["Edit Profile", "Settings"]
      default:
        return []
    }
  }
  
  {showComposer && (
    <PostComposer
      onClose={() => setShowComposer(false)}
    />
  )}

  return (
    <div className="portal-overlay" onClick={onClose}>
      <div className="portal-sheet" onClick={e => e.stopPropagation()}>
        {getActions().map(action => (
          <button onClick={() => setShowComposer(true)}>
            Portal
          </button>
          
          
        ))}
        
        
      </div>
    </div>
  )
}