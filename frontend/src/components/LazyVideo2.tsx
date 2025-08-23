import video2 from '../assets/video2.mp4';

export default function LazyVideo2() {
  return (
    <video 
      autoPlay 
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      preload="none"
    >
      <source src={video2} type="video/mp4"/>
    </video>
  );
}