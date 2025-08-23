import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"

interface ContentItem {
    email: string,
    content_Length: number,
    youtube_Length: number,
    twitter_Length: number
    link_Length: number
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL


function Profile() {

const navigate = useNavigate()
      const [data, setData] = useState<ContentItem | null>(null)


async function fetData() {
  const token = localStorage.getItem("token");

  try {

    const res = await axios.get(`${API_URL}/profile`, {
      headers: { token }
    });


// console.log(res.data.ProfileContent);

setData(res.data.ProfileContent)
  
  } catch (error) {
    console.error("Error fetching data:", error);
  } 
}


  useEffect(() => {
    fetData()
  },[])


console.log("data : ",data);

  return (
      <div className="flex justify-center  min-h-screen mt-20">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl h-fit">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback>Image</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl"></CardTitle>
          <p className="text-lg text-gray-500 hover:text-gray-400">{data?.email}</p>
        </CardHeader>

        <CardContent>
         
  {data && (
    <div className="grid grid-cols-2 gap-4 place-items-center">

      <div
      onClick={() => {
        navigate("/collection")
      }}
      className="bg-[rgb(47,46,46)] px-3 py-1 rounded-sm hover:bg-amber-600">Content Count : {data.content_Length}</div>

      <div
      onClick={() => {
        navigate("/youtube")
      }}
      className="bg-[rgb(47,46,46)] px-3 py-1 rounded-sm hover:bg-amber-600">YouTube Videos : {data.youtube_Length}</div>

      <div
      onClick={() => {
        navigate("/twitter")
      }}
      className="bg-[rgb(47,46,46)] px-3 py-1 rounded-sm hover:bg-amber-600">Twitter Tweets : {data.twitter_Length}</div>

      <div 
      onClick={() => {
        navigate("/links")
      }}
      className="bg-[rgb(47,46,46)] px-3 py-1 rounded-sm hover:bg-amber-600">Total Links  : {data.link_Length}</div>
    </div>
  )}

        </CardContent>

        <CardFooter className="flex justify-end">
          <Button 
            onClick={() => {
        navigate("/")
      }}
          >View Content</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile
