import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../libs/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  const navigate = useNavigate()
  
  useEffect(() => {
    const checkAuthAndFetchNotes = async () => {
      try {
        // Step 1: Check auth
        await api.get("/auth/me")

        // Step 2: Fetch notes
        const res = await api.get("/notes")
        setNotes(res.data.notes)
        setIsRateLimited(false)
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Please login to view notes")
          navigate("/login")
        } else if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setAuthLoading(false)
        setLoading(false)
      }
    }

    checkAuthAndFetchNotes()
  }, [navigate])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        Checking authentication...
      </div>
    )
  }

  // console.log("Notes to render", notes)
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => {
            // console.log("Note in jsx", note)
              return(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            )})}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
