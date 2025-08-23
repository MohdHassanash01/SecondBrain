import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ShareCardComponent from "../components/ShareCardComponent";

// Interfaces for TypeScript
interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  createdAt: string,
  tags: []
}

interface ShareData {
  username: string;
  content: SharedContent[];
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL


export default function SharePage() {
  const { shareLink } = useParams();
  const [data, setData] = useState<ShareData | null>(null);

  useEffect(() => {
    async function fetchShareData() {
      if (!shareLink) return;

      try {
        const res = await axios.get(`${API_URL}/brain/share/${shareLink}`);

        setData(res.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchShareData();
  }, [shareLink]);

  if (!data) return <div className="text-center mt-10 text-lg">Loading shared content...</div>;

  console.log(data);
  

  return (
    <div className="w-full h-screen py-5">
      <h1 className="text-md font-semibold mb-6 bg-[rgb(29,28,28)] w-fit px-3 py-1 rounded-md ml-auto group">Shared by : <span className="group-hover:text-amber-600"> {data.username}</span></h1>

      <div className="flex lg:col-span-2 xl:col-span-4 flex-wrap gap-10 justify-center  pb-20">
      
      {data.content
        .map((item, index) => {
          const cardProps = {
            type: item.type,
            title: item.title,
            link: item.link,
            id: item._id,
            createdAt: item.createdAt,
            tags:item.tags
          }
          return <ShareCardComponent key={index} {...cardProps} />
        })}

      </div>
    </div>
  );
}


