import { useRef, useState } from "react";
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";
export default function VideoCard({
  channel,
  avatarSrc,
  song,
  url,
  likes,
  shares,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    console.log(isVideoPlaying);
    if (isVideoPlaying) {
      //stop video
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      //play video
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // videoCard
  return (
    <div className="video_card">
      {/* video_player */}
      <VideoHeader />
      <video
        className="video"
        src={url}
        alt="Ig reel video"
        loop={true}
        ref={videoRef}
        onClick={onVideoPress}
      />
      <VideoFooter
        channel={channel}
        avatarSrc={avatarSrc}
        song={song}
        likes={likes}
        shares={shares}
      />
    </div>
  );
}

/* 
.videoCard{
    scroll-snap-align:start;
}
*/
