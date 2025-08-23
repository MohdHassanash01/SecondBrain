import express, {Request, Response} from "express"

import { userMiddleware } from "../middlewares/userMiddleware"
import { LinksModel } from "../models/Links.model";


export const LinkRouter = express.Router()


LinkRouter.post("/",userMiddleware,async function(req,res){
    const { title1, title2, link, type } = req.body

console.log(req.body);


    try {
        const createLink = await LinksModel.create({
            title1,
            title2,
            link,
            type,
            // @ts-ignore
            userId: req.userId,
        })

console.log(createLink);

   
        if (createLink) {
            res.status(200).send({
                message: "Links successfully created...",
                link: createLink
            })
        } else {
            res.send({
                message: "content is not created...",
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


LinkRouter.get("/all",userMiddleware,async function(req,res){

    console.log(req.url);
    //@ts-ignore
    console.log(req.userId);
    
    try {
        const Link = await LinksModel.find({
            //@ts-ignore
            userId: req.userId
        }).populate("userId")

        console.log(Link);
        

        if (Link && Link.length > 0) {
            res.status(200).send({
                message: "All Link here",
                Link
            })
        } else {
            res.status(404).send({
                message: "No links found for this user"
            })
        }
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        })
    }
})


LinkRouter.get("/:id",userMiddleware,async function(req,res){

    const id = req.params.id

try {
    const content = await LinksModel.findOne({
        _id:id,
         //@ts-ignore
        userId: req.userId
    }).populate("userId")

    if (content) {
         res.status(200).send({
            message:"your content here",
            content
        })
    }else{

         res.status(300).send({
            message:"No links found for this user"
        })
    }

} catch (error:any) {
    res.status(500).send({
        message:"Internal server error",
        error: error.message
    })
}

})



LinkRouter.delete("/:id",userMiddleware,async function(req,res){

     const id = req.params.id 
    try {
        
    const content = await LinksModel.findOneAndDelete({
        _id: id, 
         //@ts-ignore
        userId: req.userId
    })

    if (content) {
        res.status(201).send({
            message: "Link deleted successfully",
            content,
            success:true
        })
    }else{

       res.status(404).send({
           message: "No links found for this user."
        })
    }


    } catch (error: any) {

        res.status(500).send({
            message:"Internal server error",
            error: error.message
        })
        
    }

})




LinkRouter.get("/type/:type", userMiddleware, async (req:Request, res: Response) => {
  const type = req.params.type;

  try {
    const links = await LinksModel.find({
      type,
      //@ts-ignore
      userId: req.userId
    });

    if (links.length > 0) {
      res.status(200).send({
        message: "Links fetched successfully.",
        links
      });
    } else {
      res.status(404).send({
        message: "No links found for this type."
      });
    }
  } catch (error: any) {
    res.status(500).send({
      message: "Something went wrong. Please try again later.",
      error: error.message
    });
  }
});



