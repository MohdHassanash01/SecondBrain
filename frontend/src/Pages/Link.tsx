import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

import { Link2Icon, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface ContentItem {
  
  title1: string;
  title2: string;
  link: string;
  _id : string;
  type: string
   createdAt: string;
  
}


const API_URL = import.meta.env.VITE_BACKEND_API_URL



export default function Links() {

const [loading, setLoading] = useState(false)

const [data, setData] = useState<ContentItem[]>([])
    
console.log(data)

  async function fetData(){

  try {
    
      setLoading(true)
    const token = localStorage.getItem("token")

    const res = await axios.get(`${API_URL}/links/all`,{
      headers:{
        token
      }
    })

    // console.log("data :",res.data.Link);
    setData(res.data.Link ? res.data.Link: [])
    setLoading(false)

  } catch (error) {
      console.error("Error fetching data:", error);
  }finally {
    setLoading(false);
  }


  }

  useEffect(() => {
    fetData()
  },[])


  return (
    <div className="w-full h-screen p-5">

<div className="flex justify-end">
    <Link to="/add-link" className="flex ">
    <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-800 bg-clip-text text-transparent border-1 px-2 py-1 rounded-lg hover:border-orange-400">Add Links</h3>
    </Link>
</div>

<div className=" flex flex-col items-center mt-5 gap-8 pb-30">

{loading ? (
  <p className="text-center text-lg font-semibold text-orange-400">Loading...</p>
): data.length === 0 ? (
  <p className="mx-auto text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent ">No links available.</p>
): data.reverse().map((item) => {

  const cardProps = {
        title1: item.title1,
        title2: item.title2,
        type: item.type,
        link: item.link,
        id: item._id,
        createdAt: item.createdAt
      }

      return <LinkCardComponent key={item._id} {...cardProps}/>
}) }


</div>
      
    </div>
  )
}



interface CardProps {
id: string,
title1: string,
title2: string,
link: string,
type: string,
createdAt:string
}


function LinkCardComponent({title1, title2, link, type, id, createdAt}:CardProps){

  const navigate = useNavigate()

  function handleCopy(){
     navigator.clipboard.writeText(link)
    .then(() => {
      toast.success("Link copied to clipboard")
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
  }

  async function handleDelete(){
      const token = localStorage.getItem("token")
    const res = await axios.delete(`${API_URL}/links/${id}`,{
      headers:{
        token
      }
    })

    // console.log(res);
    
    console.log(res.data.message);
   toast.success(res.data.message)
    if (res.data.success ) {
     navigate("/links")
      
  }}


  const formattedDate = new Date(createdAt).toLocaleString(); 


  return    <Card className="w-full max-w-3xl  h-fit">

  <CardHeader>

<CardTitle className="flex items-center gap-4">

  <Link2Icon className="hover:text-amber-500   "/>
  {title1}
  </CardTitle>   

{title2 && <CardDescription className="text-md mt-3 p-2 rounded-md bg-[rgb(47,46,46)]">`    {title2} `</CardDescription> }
    


    <CardAction className="flex gap-4 items-start ">

      <span 
      onClick={handleDelete}
      className="p-2 border-2 border-transparent hover:border-[rgb(47,46,46)]  rounded-full cursor-pointer group">  
      <Trash2 
      
      className="group-hover:text-amber-500"/> </span>
     

      </CardAction>


  </CardHeader>

  <CardContent>
   
<div className="flex">
  <input 
  type="text" 
  value={link}
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
      {type}
    </span>

    <span className="text-amber-500 text-sm">
      {formattedDate}
    </span>
   </div>
  </CardFooter>

 </Card>
}