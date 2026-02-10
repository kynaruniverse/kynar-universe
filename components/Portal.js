import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import PostComposer from "./PostComposer"

export default function Portal({ open, onClose }) {
  const router = useRouter()
  const [showComposer, setShowComposer] = useState(false)

  // Close on ESC (client-safe)
  useEffect(() => {
    if (!open) return

    function handleKey(e) {
      if (e.key === "Escape") onClose()
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKey)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKey)
      }
    }
  }, [open, onClose])

  if (!open) return null

  function getActions() {
    switch (router.pathname) {
      case "/":
        return [
          {
            label: "Trending Worlds",
            action: () => {
              router.push("/trending")
              onClose()
            }
          },
          {
            label: "Explore Worlds",
            action: () => {
              router.push("/worlds")
              onClose()
            }
          }
        ]

      case "/square":
        return [
          {
            label: "Broadcast",
            action: () => setShowComposer(true)
          }
        ]

      case "/library":
        return [
          {
            label: "Your Vault",
            action: () => {
              router.push("/library")
              onClose()
            }
          }
        ]

      case "/account":
        return [
          {
            label: "Edit Profile",
            action: () => {
              router.push("/account")
              onClose()
            }
          }
        ]

      default:
        return []
    }
  }

  return (
    <>
      <div className="portal-overlay" onClick={onClose}>
        <div
          className="portal-sheet"
          onClick={e => e.stopPropagation()}
        >
          {getActions().map((item, index) => (
            <button
              key={index}
              className="portal-action"
              onClick={item.action}
            >
              {item.label}
            </button>
          ))}

          <button
            className="portal-action"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>

      {showComposer && (
        <PostComposer
          onClose={() => setShowComposer(false)}
        />
      )}
    </>
  )
}