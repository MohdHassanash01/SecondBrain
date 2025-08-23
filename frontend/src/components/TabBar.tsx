import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Group, Home, Link2, LogOut, MoreVertical, Settings, Twitter, User, Youtube } from "lucide-react";
import { UseLogin } from "../Context/LoginContext";
import { Button } from "./ui/button";

export default function TabBar() {

  const navigate = useNavigate()
        const {  logout } = UseLogin();

      const [currentTab, setCurrentTab] = useState("Home")

    const tabs = [
    { name: "Home",
        Icon:Home,
      url:"/",
       onClick: () => setCurrentTab("Home") },

         { name: "Collection",
        Icon:Group,
      url:"/collection",
       onClick: () => setCurrentTab("Collection") },

         { name: "Youtube",
        Icon:Youtube,
      url:"/youtube",
       onClick: () => setCurrentTab("Youtube") },

    { name: "Twitter",
        Icon:Twitter,
      url:"/twitter",
       onClick: () => setCurrentTab("Twitter") },

    { name: "Link",
        Icon:Link2,
      url:"/links", onClick: () => setCurrentTab("Link") },
  ];


  return (
   <div className="flex w-full items-center justify-between md:hidden h-16 border-t-2  fixed bottom-0 px-5 bg-sidebar">

   {tabs.map((tab) => (
           <Link key={tab.name} to={`${tab.url}`}>
                 <Button
                  key={tab.name}
                  onClick={tab.onClick}
                  className={`text-mg text-white hover:bg-black/30
                     ${
                    currentTab === tab.name ? "bg-black/30 border-2" : "bg-transparent"
                  }`}
                  
                >
               <span className="flex gap-2 "> {<tab.Icon />}  {tab.name}</span>
                </Button>
           </Link>
              ))}
  
  <DropdownMenu >
  <DropdownMenuTrigger className="rounded-full hover:border-1 p-1 bg-transparent text-white hover:bg-black/30 border-1 border-transparent">
<MoreVertical/>
  </DropdownMenuTrigger>

  <DropdownMenuContent sideOffset={10}>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem 
    onClick={() => {
      navigate("/profile")
    }}>
        <User className="h-[1.2rem] w-[1.2rem] mr-2"/>
        Profile
    </DropdownMenuItem>

    <DropdownMenuItem 
    onClick={() => {
      navigate("/settings")
    }}>
        <Settings className="h-[1.2rem] w-[1.2rem] mr-2"/>
        Settings
    </DropdownMenuItem>

    <DropdownMenuItem
     onClick={() => {
      logout()
     navigate("/")
    }}
    variant="destructive">
        <LogOut   className="h-[1.2rem] w-[1.2rem] mr-2"/> Logout
    </DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>



</div>
  )
}

