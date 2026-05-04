import { useState } from "react";
import { useTranslation } from "react-i18next";

// styles
import "./media-controls.scss";

// SVG Icons
import iconPlay from "~/assets/images/icon--play.svg";
import iconPause from "~/assets/images/icon--pause.svg";

// React Icons
import { TbShare3 } from "react-icons/tb";

// Helpers
import { msToHHMMSSTimeFormat } from "~/helpers/time-formatters-helpers";

// Creating the Component
const MediaControls = ({
  videoDuration,
  isPlaying,
  currentTime = 0,
  handlePlayPause,
  handleShare = () => {},
  seekTo,
}) => {
  const { t } = useTranslation();

  // Transform the currentTime to the input range Value. It has to be between 0 and 0.999999
  const currentTimeValue = videoDuration
    ? (currentTime / videoDuration) * 1000
    : 0;

  // Video progress bar Time
  const [lastSeekValue, setLastSeekValue] = useState();
  const [onMouseHoverFormattedTime, setOnMouseHoverFormattedTime] = useState();

  // const videoDurationFormattedTime = msToHHMMSSTimeFormat(videoDuration);
  const currentTimeFormatted = msToHHMMSSTimeFormat(currentTime * 1000);

  // Event Handlers
  const handleOnClick = () => {
    const newTime = Math.trunc(lastSeekValue * (videoDuration / 1000));
    seekTo(newTime);
  };

  const handleOnMouseMove = (e) => {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Get the mouse horizontal position + the offset and the element full width
    const mousePositionX = e.clientX - rect.left + 1;
    const elementWidth = rect.width;

    // Calculate the percentage of the mouse hover horizontal position relative to the element width
    const mousePositionToPercentage = (mousePositionX * 100) / elementWidth;
    setLastSeekValue(mousePositionToPercentage / 100);

    // Calculate the position in MS of the mouse hover relative to video Duration
    const positionToMs = Math.trunc(
      mousePositionToPercentage * (videoDuration / 100),
    );
    const msToParsedTime = msToHHMMSSTimeFormat(positionToMs);

    setOnMouseHoverFormattedTime(msToParsedTime);
  };

  // Component Rendering
  return (
    <div className="media-controls">
      <div className="controls-wrapper">
        <div className="controls">
          <div className="play-pause-btn">
            <img
              onClick={handlePlayPause}
              src={isPlaying ? iconPause : iconPlay}
              alt="play/pause button icon"
            />
          </div>

          <div className="progress-bar__wrapper">
            <div
              className="progress-bar__overlay"
              onClick={handleOnClick}
              onMouseMove={handleOnMouseMove}
            ></div>
            <input
              name="progress-bar"
              className="progress-bar"
              type="range"
              min={0}
              // eslint-disable-next-line unicorn/numeric-separators-style
              max={0.999999}
              value={currentTimeValue}
              step="any"
              readOnly={true}
            />
            <div className="progress-bar__time">
              {currentTimeFormatted} {/* / {videoDurationFormattedTime} */}
            </div>
            <div className="progress-bar__tooltip tooltip">
              {onMouseHoverFormattedTime || "00:00:00"}
            </div>
          </div>

          <button
            className="share-btn"
            onClick={handleShare}
            type="button"
            aria-label={t("str_shareVideo", "share this, at the current time")}
            title={t("str_shareVideo", "share this, at the current time")}
          >
            <TbShare3 />

            <div className="share-btn__tooltip tooltip">
              {t("str_shareVideo", "share this, at the current time")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaControls;
