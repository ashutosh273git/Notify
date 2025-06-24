import express from "express"
import { createNote, getNoteById, deleteNote, getAllNotes, updateNote } from "../controllers/notes.controller.js";
import rateLimiter from "../middleware/rateLimiter.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const notesRoutes = express();
notesRoutes.use(authMiddleware)

notesRoutes.get("/", getAllNotes)

notesRoutes.get("/:id", getNoteById)

notesRoutes.post("/", rateLimiter, createNote)

notesRoutes.put("/:id", updateNote)

notesRoutes.delete("/:id", deleteNote)

export default notesRoutes