
import express , {Request, Response} from "express"
import { userModel } from "../models/user.model"
import { contentModel } from "../models/content.model"
import { LinksModel } from "../models/Links.model"

export const userInfo = express.Router()


userInfo.get("/", async function(req:Request,res:
    Response){

        console.log(req.url);
        
        //@ts-ignore
        const userid =  req.userId

        try {


        const user = await userModel.findById({
_id:userid
        })

        const contents = await contentModel.find({
                userId: userid
        })


        const youtube = await contentModel.find({
                type:"youtube",
                userId: userid
        })

         const twitter = await contentModel.find({
                type:"twitter",
                userId: userid
        })

        // console.log(twitter);

        const links = await LinksModel.find({
                userId: userid
        })
        

        const profile = {
                email: user?.email,
                content_Length : contents.length,
                youtube_Length : youtube.length,
                twitter_Length : twitter.length,
                link_Length : links.length
        }

        res.send({
                ProfileContent: profile
        })

                
        } catch (error) {
                
                      res.status(500).send({
                message:"Internal server error...",
                success: false
            })

            return

        }


})