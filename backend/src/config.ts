import mongoose from "mongoose"

export function dbConnection(url:string){
    mongoose.connect(url)
.then(() => {
    console.log(`mongoDb connected....`);
    
})
.catch((err:any) => {
    console.log("MongoDb is not connect....",err)
})

}

