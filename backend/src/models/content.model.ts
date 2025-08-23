

import mongoose, { Mongoose }  from "mongoose";

enum contentTypes {
    Youtube = "youtube",
    Twitter = "twitter",   
}

const contentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    link: {
        type: String,
        required: true
    },

    type:{
         type: String,
         required:true,
         enum: Object.values(contentTypes)
    },

    tags:[{type: mongoose.Schema.Types.ObjectId, ref:"tags"}],

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },

}, {
    timestamps:true
})


export const contentModel = mongoose.model("content",contentSchema)

