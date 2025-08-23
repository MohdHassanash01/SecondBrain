import express from "express"
import { contentModel } from "../models/content.model"
import { userMiddleware } from "../middlewares/userMiddleware"
import { TagModel } from "../models/tags.model"
import { userModel } from "../models/user.model"

export const contentRouter = express.Router()

interface AuthenticatedRequest extends Request {
  userId: string;
}

contentRouter.post("/",userMiddleware,async function(req,res){
    const { title, link, type, tags } = req.body

    try {
        const content = await contentModel.create({
            title,
            link,
            type,
            // @ts-ignore
            userId: req.userId,
            
        })

        console.log("tagss : ",tags);
        
           if (typeof tags === "string" && tags.trim() !== "") {
            let tag = await TagModel.findOne({ title: tags });

            if (!tag) {
                tag = await TagModel.create({ title: tags });
            }

            content.tags.push(tag._id);
            await content.save();
        }

   
        if (content) {
            res.status(200).send({
                message: "content is successfully created...",
                content
            })
        } else {
            res.send({
                message: "course is not created...",
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            //@ts-ignore
            error: error.message
        })
    }
})


contentRouter.get("/allData",userMiddleware,async function(req,res){

    console.log(req);
    
    try {
        const contents = await contentModel.find({
            //@ts-ignore
            userId: req.userId
        }).populate("tags")
          .populate("userId")

   

        if (contents && contents.length > 0) {
            res.status(200).send({
                message: "All content here",
                contents
            })
        } else {
            res.status(200).send({
                message: "no Collections found for this user."
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        })
    }
})


contentRouter.get("/:id",userMiddleware,async function(req,res){

    const id = req.params.id

try {
    const content = await contentModel.findOne({
        _id:id,
         //@ts-ignore
        userId: req.userId
    }).populate("tags")

    if (content) {
         res.status(200).send({
            message:"your content here",
            content
        })
    }else{

         res.status(200).send({
            message:"no content found for this user."
        })
    }

} catch (error:any) {
    res.status(500).send({
        message:"Internal server error",
        error: error.message
    })
}

})



contentRouter.delete("/:id",userMiddleware,async function(req,res){

     const id = req.params.id 
    try {
        
    const content = await contentModel.findOneAndDelete({
        _id: id, 
         //@ts-ignore
        userId: req.userId
    })

    if (content) {
        res.status(201).send({
            message: "content deleted successfully",
            content,
            success:true
        })
    }else{

       res.status(404).send({
           message: "content not found or you are not authorized to delete it"
        })
    }


    } catch (error: any) {

        res.status(500).send({
            message:"Internal server error",
            error: error.message
        })
        
    }

})



contentRouter.patch("/:id",userMiddleware,async function(req,res){

     const id = req.params.id 
      const { title, link,  type } = req.body

    try {
        
    const content = await contentModel.findOneAndUpdate({
        _id: id, 
         //@ts-ignore
        userId: req.userId
    },{
       title, link,  type 
    },{new : true}).populate("tags")

    if (content) {
        res.status(201).send({
            message: "content updated successfully",
            content
        })
    }else{

       res.status(404).send({
           message: "content not found or you are not authorized to update it"
        })
    }

    } catch (error: any) {

        res.status(500).send({
            message:"Internal server error",
            error: error.message
        })
        
    }

})



contentRouter.get("/type/:type",userMiddleware,async function(req,res){

    // console.log("res get type : ", req.url);
    
     const type = req.params.type
    // console.log(type);
     

    if (!type) {
        res.send({
            message:"type is required"
        })
    }

    try {
        
        
    const content = await contentModel.find({
        type,
        //@ts-ignore
        userId: req.userId
    }).populate("tags")
          .populate("userId")

    if (content.length > 0) {
        res.status(200).send({
            message:"data fetch successflly",
            content
        })
    }else{

        res.status(404).send({
            message:"content not found"
        })
    }

    } catch (error:any) {
        
        res.status(500).send({
            message: "Internal server error",
            error: error.message as unknown
        })
    }


})


