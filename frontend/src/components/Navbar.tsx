import { Link, useNavigate } from "react-router-dom";
import { UseLogin } from "../Context/LoginContext";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/Button";

export default function Navbar() {
    const navigate = useNavigate();

      const { isLoggedIn, logout } = UseLogin();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-neutral-600  backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="  flex items-center justify-between md:justify-end h-15  mx-5">

  <Link to="/" className="flex md:hidden">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 bg-clip-text text-transparent ">Second𝓑rain</h3>
    </Link>


<div className="space-x-3 flex-shrink-0 ">

      <ModeToggle />

        <Button 
        onClick={() => navigate("/add-content")}
        className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Add content
        </Button>


 {  isLoggedIn ? <Button
        onClick={() => {
        logout()
        navigate("/")
      }}
        className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Logout
        </Button> :     <Button
        onClick={() => navigate("/signin")}
        className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 px-3 rounded-md text-md text-white cursor-pointer">
          Sign In
        </Button>}

</div>
  
      </div>
    </div>
  );
}