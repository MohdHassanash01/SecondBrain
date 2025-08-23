
import  express,{Request,Response}  from "express";
import { userMiddleware } from "../middlewares/userMiddleware";
import { contentModel } from "../models/content.model";

export const filterRouter = express.Router()

filterRouter.get("/filter",userMiddleware,async function(req:Request,res:Response){

    try {

          const { type, title } = req.query;

    // Build dynamic filter
    const filter: any = {};

    if (type) filter.type = type;
    if (title) {
      // Case-insensitive partial match for title
      filter.title = { $regex: title, $options: "i" };
    }

    const contents = await contentModel
      .find(filter)
      .populate("tags")
      .populate("userId");

     res.status(200).json({
      success: true,
      data: contents,
    });
        
    } catch (error:any) {
        
         console.error("Find user error:", error);
     res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }

})