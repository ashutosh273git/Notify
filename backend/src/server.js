import express from "express"
import router from "./routes/notes.routes.js"

const app = express()

app.use("/api/notes", router)

app.listen(5001, () => {
    console.log("Server started on port 5001")
})