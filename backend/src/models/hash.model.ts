
import mongoose from "mongoose";

const hashSchema = new mongoose.Schema({
    
    hash: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
        unique: true
        
    }
},{timestamps: true})

export const hashModel = mongoose.model("hash",hashSchema)

