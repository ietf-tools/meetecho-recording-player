import React from "react";
import ReactPlayer from "react-player";

// styles
import "./video.scss";

class Video extends React.Component {
  returnCurrentTimeFromVideo = (data) => {
    const newTime = Math.trunc(data.playedSeconds);
    this.props.handleCurrentTime(Number.parseInt(newTime));
  };

  // Lifecycle method
  shouldComponentUpdate(nextProps) {
    return this.props.isPlaying !== nextProps.isPlaying; //this.props.condition !== nextProps.condition;
  }

  render = () => {
    return (
      <div className="video-wrapper section--wrapper">
        <div className="player-wrapper">
          <ReactPlayer
            ref={this.props.refCallback}
            controls={true}
            url={`https://www.youtube.com/watch?v=${
              this.props.data.videos[0].src +
                "&t=" +
                this.props.videoStartTimeFromQuery || "0s"
            }`}
            width={"100%"}
            height={"100%"}
            pip={true}
            onProgress={this.returnCurrentTimeFromVideo}
            onPlay={this.props.handlePlay}
            onPause={this.props.handlePause}
            playing={this.props.isPlaying}
            onReady={() => {
              if (this.props.isPlaying) {
                this.props.seekTo(this.props.currentTime);
              }
            }}
          />
        </div>
      </div>
    );
  };
}

export default Video;