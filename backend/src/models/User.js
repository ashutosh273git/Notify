import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSChema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    }
}, {timestamps: true})

userSChema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSChema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSChema)

export default User