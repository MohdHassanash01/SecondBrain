import video1 from '../assets/video1.mp4';

export default function LazyVideo1() {
  return (
    <video 
      autoPlay 
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      preload="none"
    >
      <source src={video1} type="video/mp4"/>
    </video>
  );
}