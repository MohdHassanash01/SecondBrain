import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Link2Icon } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_API_URL


function Settings() {

    const [shareLink, setShareLink] = useState<string | null>(null);

    const [data, setdata] = useState("private")

    console.log(data);

    async function handleShare(){

        const token = localStorage.getItem("token")

        const res = await axios.post(`${API_URL}/brain/share`,{
            share:true
        },{
            headers:{
                token
            }
        })

        console.log(res.data);
        // toast.success(res.data.message)
        setShareLink(res.data.link)
    }

      async function handlePrivate(){

        const token = localStorage.getItem("token")

        const res = await axios.post(`${API_URL}/brain/share`,{
            share:false
        },{
            headers:{
                token
            }
        })

      console.log(res);
      
    } 
    

  useEffect(() => {
     if (data === "public") {
      handleShare();
    }else{
      if (data === "private") {
        handlePrivate()
         setShareLink(null)
      }
       
    }
  },[data])


    function handleCopy(){
     navigator.clipboard.writeText(shareLink as string)
    .then(() => {
      toast.success("Link copied to clipboard")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
  }

    
  return (
    <div className="w-full h-screen flex flex-col items-center ">

        <Card className="p-10 flex justify-center items-center max-w-lg mt-20">

 <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent ">if you want to share your brain </h1>

      <div className="flex gap-5">

<div className="flex gap-1">
    <input 
    onChange={(e) => setdata(e.target.value)}
     type="radio"
      name="type"
       id="private"
       value={"private"}
       checked={data == "private"} />
<label htmlFor="private">Private</label>
</div>

<div className="flex gap-1">
    <input 
    onChange={(e) => setdata(e.target.value)}
    type="radio" 
    name="type" 
    id="public"
    value={"public"}
    checked={data === "public"} />
<label htmlFor="public">Public</label>
</div>

      </div>


        </Card>

        {shareLink && (
    <Card className="w-full max-w-2xl  h-fit mt-10">

  <CardHeader>

<CardTitle className="flex items-center gap-4">

  <Link2Icon className="hover:text-amber-500   "/>
  Shareable Link....
  </CardTitle>   


  </CardHeader>

  <CardContent>
   
<div className="flex">
  <input type="text" 
  value={shareLink} 
  readOnly
  className="flex-1 px-2 py-2 border-2 rounded-tl-md rounded-bl-md border-amber-500 focus:border-amber-700"/>

  <button
  onClick={handleCopy}
  className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3  text-md text-white cursor-pointer rounded-tr-md rounded-br-md font-semibold">Copy</button>
</div>

  </CardContent>

    <CardFooter >
   <div className="flex justify-between w-full">
     <span className="text-[rgb(97,97,97)]">
      {/* {type} */}
    </span>

    <span className="text-amber-500 text-sm">
      {/* {formattedDate} */}
    </span>
   </div>
  </CardFooter>

 </Card>
)}
      
     
    </div>
  )
}

export default Settings
