import { Share2, Trash2, Twitter, Youtube } from "lucide-react"
import { toast } from 'react-toastify';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface Tag {
  title: string;
}

interface CardProps {
id: string
title: string,
link: string,
type:"twitter" | "youtube",
createdAt:string,
tags : Tag[]
}


export default function CardComponent({title, link, type, id, createdAt, tags}:CardProps) {

  const navigate = useNavigate()
  

const getYoutubeEmbedUrl = (url: string): string => {
  const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

const youtubeLink = getYoutubeEmbedUrl(link);

const twitterLink = link.replace("x.com", "twitter.com");


useEffect(() => {
  if (type === "twitter") {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }
}, [type]);


async function deleteData(){

  const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:3000/api/v1/content/${id}`,{
      headers:{
        token
      }
    })

    console.log(res);
    
    console.log(res.data.message);
   toast.success(res.data.message)
    if (res.data.success ) {

      if (res.data.content.type == "twitter") {
        navigate("/twitter")
      }else{
        navigate("/youtube")

      }
      
    }


    
}

  const formattedDate = new Date(createdAt).toLocaleString(); 

  return (
 <Card className="w-full max-w-lg h-fit">

  <CardHeader>
    <CardTitle className="flex items-center gap-10">
      
      {type === "twitter" && <div className="flex justify-center items-center gap-6">
        <Twitter className="hover:text-blue-500 cursor-pointer"/>
<h1>Twitter Tweet</h1> 
        </div>}


            {type === "youtube" && <div className="flex justify-center items-center gap-6">
        <Youtube className="hover:text-red-500"/>
<h1 className="text-lg">Youtube Video</h1> 
        </div>}
      
    
    </CardTitle>

    <CardDescription className="text-md mt-3 hover:text-amber-500">{title}</CardDescription>

    <CardAction className="flex gap-4 items-start ">
     
     
      <span className="p-2 border-2 border-transparent hover:border-[rgb(47,46,46)]  rounded-full cursor-pointer group"> 
     <a href={link} target="_blank" >
  <Share2 className="group-hover:text-amber-500"/> 
      </a> </span>  

      <span 
      onClick={deleteData}
      className="p-2 border-2 border-transparent hover:border-[rgb(47,46,46)]  rounded-full cursor-pointer group">  <Trash2  className="group-hover:text-amber-500"/> </span>
     

      </CardAction>


  </CardHeader>

  <CardContent>
   <div className="rounded-lg overflow-hidden">

 { type === "youtube" && youtubeLink &&  <iframe className="rounded-lg" width="450" height="315" src={youtubeLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

{ type === "twitter" && 

<div >
<blockquote className="twitter-tweet rounded-lg border-2 overflow-hidden">

  {/* example */}
  {/* <a href="https://twitter.com/username/status/807811447862468608"></a> */}

   <a href={twitterLink}></a>
</blockquote>
</div>


}

   </div>
  </CardContent>

    <CardFooter>
    
      <div className="flex justify-between w-full items-center">

     <span className="text-[rgb(97,97,97)] hover:text-[rgb(150,146,146)] ">
      {tags.length > 0 && tags.map((item) => <h1 className="bg-[rgb(39,38,38)] px-3 py-1 rounded-md" key={item.title}>{item.title}</h1>)}
    </span>

    <span className="text-amber-600 text-sm hover:text-amber-500">
      {formattedDate}
    </span>
   </div>

  </CardFooter>

 </Card>
  )
}


