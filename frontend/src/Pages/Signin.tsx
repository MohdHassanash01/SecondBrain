


import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

interface SignInResponse {
  token: string;
  message: string;
}

function Signin() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post<SignInResponse>(`${API_URL}/signin`, {
        email,
        password,
      });

      const token = res.data.token;
      toast.success(res.data.message);
      
      if (token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred during sign in");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center absolute">
      <Link
        to={"/"}
        className="fixed top-10 left-10 text-white px-3 py-1 border-1 border-gray-800 rounded-lg hover:bg-slate-800 flex gap-2 items-center"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <Card className="dark w-full max-w-sm relative">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="link">
              <Link to={"/signup"}>Sign up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:underline"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    ref={passwordRef}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            disabled={isLoading}
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;