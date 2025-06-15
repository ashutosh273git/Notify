import express from "express"
import router from "./routes/notes.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


// middleware 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json()) // this middleware parses json bodies: req.body
app.use(rateLimiter)

app.use("/api/notes", router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT)
    })
}) 