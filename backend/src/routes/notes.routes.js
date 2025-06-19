import express from "express"
import { createNote, getNoteById, deleteNote, getAllNotes, updateNote } from "../controllers/notes.controller.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express();

router.get("/", getAllNotes)

router.get("/:id", getNoteById)

router.post("/", rateLimiter, createNote)

router.put("/:id", updateNote)

router.delete("/:id", deleteNote)

export default router