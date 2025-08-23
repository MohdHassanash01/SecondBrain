
import { Link } from 'react-router-dom';



function HeroSection() {

  return (
    <div className='flex flex-col items-center mt-6 lg:mt-6'>
      <h1 className='text-3xl sm:text-6xl lg:text-6xl text-center tracking-wide leading-18'>
        Never lose important content again
        <span className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text'>
          {" "}with Second Brain
        </span>
      </h1>

      <p className='mt-10 text-lg text-center text-neutral-500 max-w-4xl'>
        Save and organize your favorite YouTube videos and X (Twitter) threads in one place.
        <br />
        Build your personal knowledge library and access it anytime, anywhere.
      </p>

      <div className='flex justify-center my-10'>
        <Link to="/add-content" className='bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md'>
          Start for free
        </Link>
        <a href="" className='py-3 px-4 mx-3 rounded-md border'>How it works</a>
      </div>

  
  <div className='flex mx-10 mt-10 justify-center'>

<video 
autoPlay loop
muted
className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2    my-4"
>
  <source  src="https://res.cloudinary.com/dgiyyhb9f/video/upload/v1692791290/video2_c9vaxr.mp4
" type="video/mp4"/>
  your browser does not support the video tag
</video>
  
  <video 
autoPlay loop
muted
className="rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2    my-4"
>
  <source  src="https://res.cloudinary.com/dgiyyhb9f/video/upload/v1692791290/video1_beozcw.mp4
" type="video/mp4"/>
</video>

  </div>


    </div>
  );
}

export default HeroSection;