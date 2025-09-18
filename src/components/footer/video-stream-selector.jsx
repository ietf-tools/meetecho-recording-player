import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVideoType } from "~/redux/features/session-ui-slice";

// icons
import iconYoutube from "~/assets/images/icon--youtube.svg";
import iconCloudflare from "~/assets/images/icon--cloudflare.svg";

// styles
import "./video-stream-selector.scss";

export default function VideoStreamSelector({ sessionData }) {
  const dispatch = useDispatch();

  const selectedType = useSelector(
    (state) => state.sessionUI.selectedVideoType
  );

  const availableVideos = sessionData.videos || [];
  const availableTypes = availableVideos.map((v) => v.type);

  // hide component if only one type available
  if (availableTypes.length <= 1) return;

  // set default to the first video type
  useEffect(() => {
    if (!selectedType && availableVideos.length > 0) {
      dispatch(setVideoType(availableVideos[0]));
    }
  }, [availableVideos, selectedType, dispatch]);

  const handleSelect = (video) => {
    dispatch(setVideoType(video));
  };

  const iconMap = {
    2: { src: iconYoutube, label: "YouTube" },
    3: { src: iconCloudflare, label: "Cloudflare" },
  };

  return (
    <div className="video-stream-selector">
      {availableVideos.map((video) => {
        const { src, label } = iconMap[video.type] || {};
        if (!src) return;

        return (
          <div
            key={video.type}
            className="video-stream-selector__radio"
          >
            <label
              className={`video-stream-selector__label video-stream-selector__label--${label.toLowerCase()}`}
            >
              <input
                type="radio"
                name="videoType"
                checked={selectedType === video.type}
                onChange={() => handleSelect(video)}
              />
              <img
                src={src}
                alt={label}
                className="video-stream-selector__icon"
              />
              <div className="video-stream-selector__tooltip tooltip">
                {label}
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}
