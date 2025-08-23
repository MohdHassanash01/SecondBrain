import express from "express"
import { userMiddleware } from "../middlewares/userMiddleware"
import { hashModel } from "../models/hash.model"
import { ramdom } from "../utils"
import { contentModel } from "../models/content.model"
import { userModel } from "../models/user.model"


export const shareRouter = express.Router()

shareRouter.post("/share",userMiddleware,async function(req, res){

    const share = req.body.share
    console.log(share);
    
try {
        if (share) {

        const existingLink = await hashModel.findOne({
            //@ts-ignore
            userid: req.userId
        })

        console.log("existingLink :",existingLink);
        

        if (existingLink) {
            res.json({
                message:"share is enabled",
                link: `http://localhost:5173/share/${existingLink.hash}`
            })

            return
        }
     const link =  await hashModel.create({
        //@ts-ignore
        userid:  req.userId,
        hash: ramdom(21)
      })

      console.log("link",link);
      

        res.json({
         message:"share is enabled",   
         link:`https://secondbrain-1-mbt9.onrender.com/share/${link.hash}`
        
         })
    

    }else{

      await  hashModel.deleteOne({
        // @ts-ignore
            userid: req.userId
        })

        res.json({
            message: "share is disabled"
        })

    }
} catch (error) {

    res.send({
        message:"Internal server error"
    })
    
}

})





shareRouter.get("/share/:shareLink",async function(req, res){
      
    const hash = req.params.shareLink 
    console.log(hash);
    
try {
    
        const link = await hashModel.findOne({
        hash
    })

    if (!link) {
        res.status(411).send({
            message: "Sorry incorrect input"
        })

        return
    }

    const content = await contentModel.find({
        userId: link.userid
    }).populate("tags")

    const user = await userModel.findOne({
        _id:link.userid
    })

    if (!user) {
        res.status(411).send({
            message: "user not found error should ideally not happen"
        })

        return
    }

    res.send({
        
        username: user?.email,
        content
    })


} catch (error) {
    
    res.send({
        message:"Internal server error"
    })
}

})