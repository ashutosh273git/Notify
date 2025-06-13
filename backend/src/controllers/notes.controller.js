import Note from "../models/Notes.js"
import mongoose from "mongoose"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}) // .sort(-1) will show the newest first 

        res.status(200).json({
            message: "Notes fetched successfully",
            notes: notes
        })
    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getNoteById(req, res) {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: "No such note exists - invalid id format"})
        }

        const note = await Note.findById(id)

        if(!note){
            return res.status(404).json({message: "No such note exists for this id"})
        }
        
        return res.status(404).json({
            message: "Note fetched",
            note: note
        })

    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body
        const note = new Note({title, content})

        const savedNote = await note.save()
        res.status(201).json({
            message: "Note created successfully",
            note: savedNote
        })
    } catch (error) {
        console.error("Error in createNote controller", error)
        res.status(500).json({message: "internal server error"})
    }
}
export async function updateNote(req, res) {
    try {
        const {title, content} = req.body
        const {id} = req.params

        // checking the format of id is right or wrong

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No such note exists- invalid id format" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, content},
            {new: true} // it will show the update note
        ) 

        // checking if the id was right or wrong (its format was correct as checked earlier)
        if(!updatedNote) return res.status(404).json({message: "No such note exist for this id"})

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote: updatedNote
        })
    } catch (error) {
        console.error("Error in updateNote controller", error)
        res.status(500).json({message: "internal server error"})
    }
}

export async function deleteNote(req, res) {
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message: "No such no note exists - invalid id format"})
        }

        const deleteNote = await Note.findByIdAndDelete(id)

        if(!deleteNote){
            return res.status(404).json({message: "No such note exist for this id"})
        }

        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        console.error("Error in deleteNote controller", error)
        res.status(500).json({message: "internal server error"})
    }
}