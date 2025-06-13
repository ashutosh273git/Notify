import express from "express"
import router from "./routes/notes.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

// middleware 
app.use(express.json())

app.use("/api/notes", router)

app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT)
})