
import { useRef, useState } from "react"
import { Card, CardContent} from "../components/ui/card"

import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_BACKEND_API_URL

function AddContent() {

    const navigate = useNavigate()
    const [type, setType] = useState("")

    const titleRef = useRef<HTMLInputElement>(null)

     const LinkRef = useRef<HTMLInputElement>(null)

      const TagsRef = useRef<HTMLInputElement>(null)

      const [error,setError] = useState("")
      const [success, setSuccess] = useState("")

     async function handleSubmit(){

      // console.log(type);
      
        if (type !== "youtube" && type !== "twitter") {
            setError("content type must required")
            return
        }

        const title = titleRef.current?.value
        const link = LinkRef.current?.value
        const tags = TagsRef.current?.value

        const data = {
            title,
            link,
            tags,
            type
        }

        console.log(data);
        

      try {

         const token = localStorage.getItem("token");
        
         const res = await axios.post(`${API_URL}/content`,
            data,
            {
                headers:{
                    token
                }
            }
         )

         console.log(res);
         setSuccess(res.data.message)
          toast.success(res.data.message)

       if(res.statusText == "OK"){
       if (res.data.content,type === "youtube") {
        navigate("/youtube")
       }else{
        navigate("/twitter")
       }
       }

      } catch (error) {
             if (axios.isAxiosError(error)) {

    console.log(error.response?.data);
    

        setError( error.response?.data.error );
      }
      }
       


      }

  return (
    <div className="flex justify-center ">
       <Card className="w-full max-w-lg mt-20 p-10 relative mb-30">

        <span
        onClick={() => navigate("/")}
        className="absolute top-2 right-3 border-1 border-transparent  rounded-full p-1 hover:border-[rgb(63,62,62)] cursor-pointer">
            <X />
        </span>

  {error && (
          <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

          {success && (
          <div className="mb-2 p-2 bg-green-100 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

          <div className="flex flex-col gap-8">
            <div className="grid gap-2">
              <Label htmlFor="title">Enter Title :</Label>
              <Input
              onChange={() => setError("")}
              ref={titleRef}
                id="title"
                type="text"
                placeholder="enter your title"
                name="title"
                required
                autoComplete="off"

              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="link">Enter Link</Label>
              
              </div>
              <Input 
               onChange={() => setError("")}
              ref={LinkRef}
             autoComplete="off"
              name="link"
              id="link" type="text" 
              placeholder="enter your link" required />
            </div>

            

<CardContent  className="flex gap-2 justify-center items-center ">
    <h1>Content Type :  </h1>

    <Select onValueChange={(value) => setType(value)}>

      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Type" />

      </SelectTrigger>

      <SelectContent>

        <SelectGroup>
          <SelectLabel>Types</SelectLabel>

          <SelectItem value="youtube">Youtube</SelectItem>

          <SelectItem value="twitter">Twitter</SelectItem>
      
        </SelectGroup>
      </SelectContent>
    </Select>


 

</CardContent>

       <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="link">Enter Tags *</Label>
              
              </div>
              <Input 
               onChange={() => setError("")}
              ref={TagsRef}
             autoComplete="off"
              name="link"
              id="link" type="text" 
              placeholder="enter your Tags" required />
            </div>

          </div>

             <button
             onClick={handleSubmit}
             className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:text-white py-1 hover:bg-amber-600 rounded-md cursor-pointer">
        Submit
        </button>

 </Card>
    </div>
  )
}

export default AddContent
