import express from "express"
import router from "./routes/notes.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"


const app = express()
const PORT = process.env.PORT || 5001

dotenv.config()
connectDB()

app.use("/api/notes", router)

app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT)
})