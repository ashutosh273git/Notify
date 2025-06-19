import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import CreatNote from "./pages/CreatNote.jsx"
import NoteDetail from "./pages/NoteDetail.jsx"

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00BFFF40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  )
}

export default App
