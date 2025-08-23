
import { Share2, Twitter, Youtube } from "lucide-react"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect } from "react";

interface Tag {
  title: string;
}

interface CardProps {

title: string,
link: string,
type:"twitter" | "youtube",
createdAt:string,
tags : Tag[]
}

function ShareCardComponent({title, link, type,tags, createdAt}:CardProps) {

    const getYoutubeEmbedUrl = (url: string): string => {
  const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};

const youtubeLink = getYoutubeEmbedUrl(link);


useEffect(() => {
  if (type === "twitter") {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }
}, [type]);

  const formattedDate = new Date(createdAt).toLocaleString(); 

  return (
     <Card className="w-full max-w-lg h-fit">

  <CardHeader>
    <CardTitle className="flex items-center gap-10">
      
      {type === "twitter" && <div className="flex justify-center items-center gap-6">
        <Twitter/>
<h1>Twitter Tweets</h1> 
        </div>}


            {type === "youtube" && <div className="flex justify-center items-center gap-6">
        <Youtube/>
<h1 className="text-lg">Youtube Video</h1> 
        </div>}
      
    
    </CardTitle>

    <CardDescription className="text-md mt-3">{title}</CardDescription>

    <CardAction className="flex gap-4 items-start ">
     
     
      <span className="p-2 border-2 border-transparent hover:border-amber-600  rounded-full cursor-pointer group"> 
     <a href={link} target="_blank">
  <Share2 className="group-hover:text-amber-600"/> 
      </a> </span>  

     

      </CardAction>


  </CardHeader>

  <CardContent>
   <div className="rounded-lg overflow-hidden">

 { type === "youtube" && youtubeLink &&  <iframe className="rounded-lg" width="450" height="315" src={youtubeLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

{ type === "twitter" && 

<div >
<blockquote className="twitter-tweet rounded-lg border-2 overflow-hidden">


   <a href={link.replace("x.com","twitter.com")}></a>
</blockquote>
</div>


}

   </div>
  </CardContent>

    <CardFooter>
          <div className="flex justify-between w-full items-center">

     <span >
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

export default ShareCardComponent
