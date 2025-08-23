
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { log } from "node:console"
dotenv.config()

const JWT_SECRET_USER = process.env.jwt_secret
// console.log("usermiddle",JWT_SECRET_USER)

if (!JWT_SECRET_USER) {
    throw new Error('JWT_SECRET_USER is not defined in environment variables');
}

export function userMiddleware(req: Request,res: Response,next: NextFunction){

    const token = req.headers.token as string
    if (!token) {

         res.send({
            message:"token is required...."
        })

        return
    }

    try {
        const decodedInformation = jwt.verify(token,JWT_SECRET_USER as string)
        // @ts-ignore
        req.userId = decodedInformation.id 

        next()
    } catch (error: any) {

        res.status(401).send({
            message:"Invalid or expired token",
            error: error.message
        })
    }

}

