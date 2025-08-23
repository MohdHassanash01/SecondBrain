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

function AddLinks() {


    //   title1,
    //         title2,
    //         link,
    //         type,

        const navigate = useNavigate()
    const [type, setType] = useState("")

    const title1Ref = useRef<HTMLInputElement>(null)

     const title2Ref = useRef<HTMLInputElement>(null)

     const LinkRef = useRef<HTMLInputElement>(null)

      const [error,setError] = useState("")
      const [success, setSuccess] = useState("")

     async function handleSubmit(){


        const title1 = title1Ref.current?.value
        const title2 = title2Ref.current?.value
        const link = LinkRef.current?.value

        const data = {
            title1,
            title2,
            link,
            type
        }

        console.log(data);
        

      try {

         const token = localStorage.getItem("token");
        
         const res = await axios.post(`${API_URL}/links`,
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
      navigate("/links")
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
        onClick={() => navigate("/links")}
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
              <Label htmlFor="title">Enter Title 1 </Label>
              <Input
              onChange={() => setError("")}
              ref={title1Ref}
                id="title"
                type="text"
                placeholder="enter your title"
                name="title"
                required
                autoComplete="off"

              />
            </div>

                      <div className="grid gap-2">
              <Label htmlFor="title2">Enter Title 2 *</Label>
              <Input
              onChange={() => setError("")}
              ref={title2Ref}
                id="title2"
                type="text"
                placeholder="enter your title 2"
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
    <h1>Content Type *  </h1>

    <Select onValueChange={(value) => setType(value)}>

      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Type" />

      </SelectTrigger>

<SelectContent>
  <SelectGroup>
    <SelectLabel>Social Platforms</SelectLabel>
    <SelectItem value="others">Other</SelectItem>
    <SelectItem value="youtube">YouTube</SelectItem>
    <SelectItem value="twitter">Twitter</SelectItem>
  </SelectGroup>

  <SelectGroup>
    <SelectLabel>Tech & Learning</SelectLabel>
    <SelectItem value="ai">AI</SelectItem>
    <SelectItem value="ml">Machine Learning</SelectItem>
    <SelectItem value="coding">Coding</SelectItem>
    <SelectItem value="github">GitHub</SelectItem>
  </SelectGroup>

  <SelectGroup>
    <SelectLabel>Other Categories</SelectLabel>
    <SelectItem value="cooking">Cooking</SelectItem>
    <SelectItem value="fashion">Fashion</SelectItem>
    <SelectItem value="google">Google Link</SelectItem>
    <SelectItem value="affiliate">Amazon Affiliate</SelectItem>
  </SelectGroup>
</SelectContent>


    </Select>


 

</CardContent>



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

export default AddLinks
