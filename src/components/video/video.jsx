import React, { useCallback } from "react";
import ReactPlayer from "react-player";

// styles
import "./video.scss";

function VideoComponent({
  data,
  videoStartTimeFromQuery = "0s",
  refCallback,
  currentTime,
  handleCurrentTime,
  isPlaying,
  handlePlay,
  handlePause,
  seekTo,
}) {
  const { type, src, start = 0 } = data.videos[0];

  // build the URL (or embed config) depending on type
  let playerUrl;
  switch (type) {
    case 1:
      // static file, e.g., videos/myfile.mp4
      playerUrl = `${src}`;
      break;

    case 2:
      // YouTube
      playerUrl = `https://www.youtube.com/watch?v=${src}&t=${videoStartTimeFromQuery || `${start}s`}`;
      break;

    case 3:
      // Cloudflare Stream HLS manifest (ReactPlayer can play HLS out of the box)
      // src is the Cloudflare Stream ID, e.g. "6b9e68b07dfee8cc2d116e4c51d6a957"

      playerUrl = `https://videodelivery.net/${src}/manifest/video.m3u8`;
      break;

    default:
      throw new Error(`Unknown video type: ${type}`);
  }

  const onProgress = useCallback(
    (p) => {
      handleCurrentTime(Math.trunc(p.playedSeconds));
    },
    [handleCurrentTime]
  );

  const onReady = useCallback(() => {
    if (isPlaying) seekTo(currentTime);
  }, [isPlaying, seekTo, currentTime]);

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

const Video = React.memo(
  VideoComponent,
  (prev, next) => prev.isPlaying === next.isPlaying
);

Video.displayName = "Video";
export default Video;
