
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true})

export const userModel = mongoose.model("user",userSchema)

