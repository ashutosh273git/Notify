import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.jsx"
import CreatNote from "./pages/CreatNote.jsx"
import NoteDetail from "./pages/NoteDetail.jsx"

const App = () => {
  return (
    <div data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  )
}

export default App