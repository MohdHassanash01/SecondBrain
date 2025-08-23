import React, { useState, useEffect, useMemo, createContext } from "react";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  logout: () => void;
  login: (token: string) => void;
}

const LoginContent = createContext<LoginContextType | null>(null);

export function UseLogin() {
  const ctx = React.useContext(LoginContent);
  if (!ctx) throw new Error("useLogin must be used within LoginProvider");
  return ctx;
}

export default function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // initialize from localStorage once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn]
  );

  return <LoginContent.Provider value={value}>{children}
  </LoginContent.Provider>;
}
