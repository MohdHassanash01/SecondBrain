import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../components/Card";


interface ContentItem {
  type: "twitter" | "youtube";
  title: string;
  link: string;
  _id : string
  createdAt: string;
  tags: []
}


const API_URL = import.meta.env.VITE_BACKEND_API_URL



function Twitter() {

    const [data, setData] = useState<ContentItem[]>([])
    
     const [loading, setLoading] = useState(false)

console.log(data)

async function fetData() {
  const token = localStorage.getItem("token");

  try {
    setLoading(true);
    const res = await axios.get(`${API_URL}/content/type/twitter`, {
      headers: { token }
    });

    const contents = res.data.content;

    const normalized = contents.map((item: ContentItem) => ({
      ...item,
      type: item.type.toLowerCase()
    }));

    setData(normalized);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    fetData()
  },[])


  return (
      <div className="h-screen ">
  
  <div className="flex lg:col-span-2 xl:col-span-4 flex-wrap gap-10 justify-center  pb-20 mt-10">
  

  
  
  {
   loading ? (<p className="text-center text-lg font-semibold text-orange-400">Loading...</p>  ) : data.length === 0 ? (
    <h1 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
      No content found, you have to create content
    </h1>
  ) :
  data.reverse()
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
  
  
  
  
  </div>
  
      </div>
  )
}

export default Twitter
