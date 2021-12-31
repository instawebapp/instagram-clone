import VideoCard from "../components/reels/VideoCard";
const Reels = () => {
  return (
    // app_video container
    <div className="app_video_container">
      {/* Video */}
      <VideoCard
        channel="cleverqazi"
        avatarSrc="/images/avatars/jay.jpg"
        song="test song"
        url="/images/video3.mp4"
        likes={950}
        shares={30}
      />
      <VideoCard
        channel="cleverqazi"
        avatarSrc="/images/avatars/jay.jpg"
        song="test song"
        url="/images/video3.mp4"
        likes={950}
        shares={30}
      />
      {/* Video */}
      {/* <VideoCard /> */}
      {/* Video */}
      {/* Video */}
    </div>
  );
};

export default Reels;

/* 
.app_video::-webkit-scrollbar{
  display:none;
}
.app_video{
  scrollbar-width:none;
  ms-overflow-style:none;
    scroll-snap-type:y mandayory
}
*/
