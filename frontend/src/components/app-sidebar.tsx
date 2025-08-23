import { ChevronUp, Home,  Settings, User2,Youtube , Twitter,Link2,Group } from "lucide-react"

import {Link, useNavigate} from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"
import { UseLogin } from "../Context/LoginContext"




export function AppSidebar() {

  const navigate = useNavigate()
   const { isLoggedIn, logout } = UseLogin();
   
        const [currentTab, setCurrentTab] = useState("Home")

        // Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
   onclick:() => setCurrentTab("Home")
  },
   {
    title: "Collection",
    url: "/collection",
    icon: Group ,
   onclick:() => setCurrentTab("Collection")

  },
  {
    title: "Youtube",
    url: "/youtube",
    icon: Youtube,
   onclick:() => setCurrentTab("Youtube")

  },

    {
    title: "Twitter",
    url: "/twitter",
    icon: Twitter,
   onclick:() => setCurrentTab("Youtube")

  },

  {
    title: "Link",
    url: "/links",
    icon: Link2,
   onclick:() => setCurrentTab("Link")

  },
 
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
   onclick:() => setCurrentTab("Settings")

  },
]
 
  return (
    <Sidebar className="overflow-hidden">
    <SidebarHeader className="py-3.5">
    <SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton asChild>

  <Link to="/">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 bg-clip-text text-transparent ">Second𝓑rain</h3>
    </Link>

    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
      </SidebarHeader>


<SidebarSeparator className="border-b-1  border-neutral-600 " />

      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}  >
                  <SidebarMenuButton className={`my-2 text-md ${currentTab === item.title ? "bg:black/30" : "bg-transparent"}`} asChild>
                    <Link to={item.url} className="flex items-center gap-2 py-2 px-3 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>


       <SidebarFooter>
<SidebarMenu>
  <SidebarMenuItem>

<DropdownMenu>
  <DropdownMenuTrigger asChild>

    <SidebarMenuButton>
      <User2/> Profile <ChevronUp className="ml-auto"/>
    </SidebarMenuButton>

  </DropdownMenuTrigger>

<DropdownMenuContent align="end">
  <DropdownMenuItem 
   onClick={() => navigate("/profile")}>
    Account
  </DropdownMenuItem>

  <DropdownMenuItem 
  onClick={() => navigate("/settings")}>
    Sitting
  </DropdownMenuItem>


    <DropdownMenuItem 
     onClick={() => {
        logout()
        navigate("/")
      }}
    >
    Sign out
  </DropdownMenuItem>

</DropdownMenuContent>

</DropdownMenu>

  </SidebarMenuItem>
</SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}