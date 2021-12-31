import Ticker from "react-ticker";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "../form/Button";
export default function VideoFooter({
  channel,
  avatarSrc,
  song,
  likes,
  shares,
}) {
  const handleFollowClick = (e) => {
    console.log("follow", e);
  };
  const handleFollowKey = (e) => {
    if (e.key === "Enter") {
      console.log("follow", e);
    }
  };

  return (
    //   videoFooter
    <div className="video_footer">
      {/* videoFooter_text */}
      <div className="video_footer_text">
        <img src={avatarSrc} alt="jayy" />
        <h3 className="ml-3 pb-5">
          {channel} -
          <Button
            btnType={"button"}
            btnClass={"btn"}
            btnTitle={"Follow"}
            icon={""}
            handleClick={handleFollowClick}
            handleKey={handleFollowKey}
          />
        </h3>
      </div>
      {/* videoFooter_ticker */}
      <div className="video_footer_ticker">
        {/* videoFooter_icon */}
        <MusicNoteIcon className="music_icon" />
        <Ticker mode="smooth" className="ticker">
          {({ index }) => (
            <>
              <h1>{song}</h1>
            </>
          )}
        </Ticker>
      </div>
      {/* videoFooter_actions */}
      <div className="video_footer_actions">
        {/* {videoFooter_actionLeft} */}
        <div className="video_Footer_actionleft">
          <FavoriteIcon fontSize="large" className="icon" />
          <ModeCommentIcon fontSize="large" className="icon" />
          <SendIcon fontSize="large" className="icon" />
          <MoreHorizIcon fontSize="large" className="icon" />
        </div>
        {/* {videoFooter_actionRight} */}
        <div className="video_footer_actionright">
          {/* videoFooter_stat */}
          <div className="video_footer_stat">
            <FavoriteIcon fontSize="large" />
            <p className="text">{likes}</p>
          </div>
          {/* videoFooter_stat */}
          <div className="video_footer_stat">
            <ModeCommentIcon fontSize="large" />
            <p className="text">{shares}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
.videoFooter_text .btn {
  text-transform: inherit;
}
.ticker{
  height:fit-content;
}
*/
