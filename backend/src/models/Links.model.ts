
import mongoose  from "mongoose";


enum ContentTypes {
  Youtube = "youtube",
  Twitter = "twitter",
  Cooking = "cooking",
  AI = "ai",
  ML = "ml",
  Coding = "coding",
  GitHub = "github",
  Google = "google",
  Affiliate = "affiliate",
  Fashion = "fashion",
  Others = "others"
}

const LinksSchema = new mongoose.Schema({
    title1:{
        type: String,
        required: true,
        trim: true,
    },
    title2: {
        type: String,
        trim: true,
    },

    type:{
         type: String,
         enum: Object.values(ContentTypes),
         default: ContentTypes.Others,
    },

    link : {
        type: String,
        required: true,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
         ref: "user",
        required: true,
    }

},{
    timestamps:true
})


export const LinksModel = mongoose.model("Links",LinksSchema)

