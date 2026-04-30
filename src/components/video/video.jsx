import React, { useCallback, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

import { parseVideoTimeToSeconds } from "~/helpers/time-formatters-helpers";

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
  // 1. Pull videoStartTimeFromQuery from your Redux state
  const { playerUrl, videoStartTimeFromQuery } = useSelector(
    (state) => state.sessionUI,
  );

  // 2. Add a ref to ensure we only jump to the shared time ONCE on the very first load
  const hasSeekedOnLoad = useRef(false);
  const hasAppliedSharedTime = useRef(false);

  useEffect(() => {
    hasSeekedOnLoad.current = false;
  }, [playerUrl]);

  const onProgress = useCallback(
    (p) => {
      handleCurrentTime(Math.trunc(p.playedSeconds));
    },
    [handleCurrentTime],
  );

  const onReady = useCallback(() => {
    const sharedTimeInSeconds = parseVideoTimeToSeconds(videoStartTimeFromQuery);

    // 3. If there is a shared time in Redux and we haven't seeked yet, jump to it
    if (
      !hasSeekedOnLoad.current &&
      !hasAppliedSharedTime.current &&
      Number.isFinite(sharedTimeInSeconds)
    ) {
      seekTo(sharedTimeInSeconds);
      hasSeekedOnLoad.current = true;
      hasAppliedSharedTime.current = true;
    }
    // 4. Otherwise, fallback to the default behavior
    else if (!hasSeekedOnLoad.current) {
      seekTo(currentTime);
      hasSeekedOnLoad.current = true;
    }
  }, [seekTo, currentTime, videoStartTimeFromQuery]);

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
