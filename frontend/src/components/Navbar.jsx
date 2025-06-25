import { PlusIcon, LogOutIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import api from "../libs/axios"
import toast from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error)
      toast.error("Failed to logout")
    }
  }

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary font-mono tracking-tight">
            Notify
          </h1>

          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              New Note
            </Link>

            <button onClick={handleLogout} className="btn btn-error">
              <LogOutIcon className="size-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
