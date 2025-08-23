import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter,  Outlet, Route, Routes } from "react-router-dom"


import { ThemeProvider } from "./components/theme-provider"


import Youtube from "./Pages/Youtube"

import Profile from "./Pages/Profile"

import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

import Links from "./Pages/Link";
import TabBar from "./components/TabBar";
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"

import LoginProvider from "./Context/LoginContext"
import AddContent from "./Pages/AddContent"
import Collections from "./Pages/Collections"
import Twitter from "./Pages/Twitter"
import AddLinks from './Pages/AddLinks';
import Settings from './Pages/Settings';
import SharePage from './Pages/SharePage';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProtectedRoute from './lib/ProtectedRoute';



function App() {


  return (
    <>
    <BrowserRouter> 
    <Routes>

<Route  path="/signin" element={<Signin/>}/>
<Route  path="/signup" element={<Signup/>}/>


<Route path="/" element={<Layout/>}>


<Route path="/" element={<Home/>}/>


<Route path="/youtube" element={<ProtectedRoute>
  <Youtube/>
  </ProtectedRoute>}/>
  
<Route path="/collection" element={<ProtectedRoute>
  <Collections/>
  </ProtectedRoute>}/>
  
<Route path="/twitter" element={
  <ProtectedRoute>
    <Twitter/>
  </ProtectedRoute>
  }/>

<Route path="/profile" element={
  <ProtectedRoute>
    <Profile/>
  </ProtectedRoute>
  }/>

<Route path="/links" element={
  <ProtectedRoute>
    <Links/>
  </ProtectedRoute>
  }/>

<Route path="/settings" element={
  <ProtectedRoute>
  <Settings/>
  </ProtectedRoute>
}/>

<Route path="/add-content" element={
  <ProtectedRoute>
    <AddContent/>
    </ProtectedRoute>
} />

<Route path="/add-link" element={
  <ProtectedRoute>
     <AddLinks/>
  </ProtectedRoute>
 } />

 <Route path="/share/:shareLink" element={
  <ProtectedRoute>
    <SharePage />
  </ProtectedRoute>
  } />



</Route>
</Routes>

     <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

</BrowserRouter>


      
    </>
  )
}

export default App




 function Layout(){


  return (
    <>
<LoginProvider>
<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >

 <SidebarProvider
 >
      <AppSidebar />
      <main className="w-full">
         <Navbar/>
        <div className="px-4">
          {<Outlet/>}
        </div>

<TabBar/>

      </main>
    </SidebarProvider>

</ThemeProvider>
   
</LoginProvider>
</>
)
}













