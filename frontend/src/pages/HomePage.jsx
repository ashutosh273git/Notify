import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../libs/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        // console.log(res.data)
        // console.log(Array.isArray(res.data))
        setNotes(res.data.notes)
        setIsRateLimited(false)
      }catch (error) {
        console.error("Error fetching notes", error)
        if(error.response?.status === 429){
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
      }finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

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
