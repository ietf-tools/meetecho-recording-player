import React, { useCallback } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

// styles
import "./video.scss";

function VideoComponent({
  refCallback,
  currentTime,
  handleCurrentTime,
  isPlaying,
  handlePlay,
  handlePause,
  seekTo,
}) {
  const { playerUrl } = useSelector((state) => state.sessionUI);

  const onProgress = useCallback(
    (p) => {
      handleCurrentTime(Math.trunc(p.playedSeconds));
    },
    [handleCurrentTime]
  );

  const onReady = useCallback(() => {
    seekTo(currentTime);
  }, [seekTo, currentTime]);

  if (!playerUrl) {
    return <div>No video available</div>;
  }

  return (
    <div className="video-wrapper section--wrapper">
      <div className="player-wrapper">
        <ReactPlayer
          ref={refCallback}
          url={playerUrl}
          controls
          width="100%"
          height="100%"
          pip
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={onProgress}
          onReady={onReady}
        />
      </div>
    </div>
  );
}

const Video = React.memo(VideoComponent);

Video.displayName = "Video";
export default Video;
