
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./routes/user"
import { contentRouter } from "./routes/content"
import { shareRouter } from "./routes/sharebrain"
import { dbConnection } from "./config"
import { filterRouter } from "./routes/filter"
import { userMiddleware } from "./middlewares/userMiddleware"
import { userInfo } from "./routes/userInfo"
import { LinkRouter } from "./routes/link"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URI as string

console.log("port",process.env.PORT);

// app.use((req, res, next) => {
//   console.log("Incoming Request =>", {
//     method: req.method,
//     url: req.url,
//     headers: req.headers,
//     body: req.body
//   });
//   next();
// });

app.use(cors({
  origin: "*", // or use your Vercel frontend URL
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/v1",userRouter)

app.use("/api/v1/profile",userMiddleware,userInfo)

app.use("/api/v1/content",userMiddleware,contentRouter)

app.use("/api/v1/links", userMiddleware ,LinkRouter)

app.use("/api/v1/brain", shareRouter)

app.use("/api/v1/filter",userMiddleware,filterRouter)


app.listen(PORT, function(){
    dbConnection(MONGODB_URL)
    console.log(`server is running on PORT ${PORT}`);
    
})