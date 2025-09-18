// Components
import MediaControls from "./media-controls";
import MobileLayoutToggleButton from "./mobile-layout-toggle-button";
import ThemeSelector from "./theme-selector";
import VideoStreamSelector from "./video-stream-selector";
import Logo from "./logo";

// Styles
import "./footer.scss";

function Footer({
  videoDuration,
  handlePlay,
  handlePause,
  handlePlayPause,
  handleCurrentTime,
  isPlaying,
  currentTime,
  seekTo,
  showChat,
  handleToggleComponents,
  sessionData,
}) {
  return (
    <footer className="Footer section--wrapper">
      <VideoStreamSelector sessionData={sessionData} />

      <MediaControls
        videoDuration={videoDuration}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handlePlayPause={handlePlayPause}
        handleCurrentTime={handleCurrentTime}
        isPlaying={isPlaying}
        currentTime={currentTime}
        seekTo={seekTo}
      />

      <MobileLayoutToggleButton
        handleToggleComponents={handleToggleComponents}
        showChat={showChat}
      />

      <ThemeSelector />

      <Logo />
    </footer>
  );
}

export default Footer;
