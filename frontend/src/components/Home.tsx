import { Features } from "../Pages/Features";
import { Footer } from "../Pages/Footer";
import HeroSection from "../Pages/HeroSection";
import Price from "../Pages/Price";
import Testimonials from "../Pages/Testimonials";
import WorkFlow from "../Pages/WorkFlow";

export default function Home(){
  return (
    <>

  <div className='max-w-7xl mx-auto pt-20 px-6'>
        <HeroSection/>
        <Features/>
        <WorkFlow/>
        <Price/>
        <Testimonials/>
        <Footer/>
</div>

   
    </>
  )
}
