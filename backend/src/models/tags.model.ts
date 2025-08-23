

import mongoose from "mongoose"

const TagSchema = new mongoose.Schema({

    title: {
        type:String,
        required:false,
        trim:true,
        index: true,
        unique: true
    }


},{
    timestamps:true
})


export const TagModel = mongoose.model("tags",TagSchema)