

import { useEffect, useState } from "react"
import CardComponent from "../components/Card"
import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_API_URL

// Define the type for your content items
interface ContentItem {
  type: "twitter" | "youtube";
  title: string;
  link: string;
 _id: string;
 createdAt: string;
 tags:[]
}

export default function Collection() {

  const [data, setData] = useState<ContentItem[]>([])
// console.log(data)

const [loading, setLoading] = useState(false)

  async function fetData(){

    const token = localStorage.getItem("token")

    try {
      
      
    setLoading(true)
    
    const res = await axios.get(`${API_URL}/content/allData`,{
      headers:{
        token
      }
    })

    // console.log("data :",res.data.contents);
   
     const contents = res.data.contents;

       const normalized = contents.map((item:ContentItem ) => ({
      ...item,
      type: item.type.toLowerCase() as "twitter" | "youtube"
    }));

  // Sort by newest first
  const sorted = normalized.sort(
    (a: ContentItem, b: ContentItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

    setData(sorted);
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
    <div className="h-screen pt-10 ">
     

<div className="flex lg:col-span-2 xl:col-span-4 flex-wrap gap-10 justify-center  pb-20">

{loading ? (<p className="text-center text-lg font-semibold text-orange-400">Loading...</p>  ): data.length === 0 ? (
    <h1 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
      No content found, you have to create content
    </h1>
  ) :
data
  .filter(item => item.type === "youtube")
  .map((item, index) => {
    const cardProps = {
      type: item.type,
      title: item.title,
      link: item.link,
      id: item._id,
      createdAt: item.createdAt,
      tags:item.tags
    }
    return <CardComponent key={index} {...cardProps} />
  })
  
  }



{data
  .filter(item => item.type === "twitter")
  .map((item, index) => {
      const cardProps = {
      type: item.type,
      title: item.title,
      link: item.link,
      id: item._id,
      createdAt: item.createdAt,
      tags:item.tags
    }
     return <CardComponent key={index} {...cardProps} />
})}




</div>

    </div>
  )
}

