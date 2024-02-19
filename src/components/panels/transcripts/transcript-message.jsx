import { useSelector } from "react-redux";
import { BsArrowRightShort } from "react-icons/bs";
import { useTranslation } from "react-i18next";

// styles
import "./transcript-message.scss";

// Helpers
import { HHMMSSTimeFormatToMS } from "~/helpers/time-formatters-helpers";

function TranscriptMessage({ seekTo, handleScrollVideoIntoView }) {
  const { t } = useTranslation();
  const transcriptData = useSelector(
    (state) => state.transcriptData.transcripts
  );

  const handleOnClick = (time) => {
    seekTo(HHMMSSTimeFormatToMS(time));
  };

  return (
    <>
      {transcriptData?.map((transcript, index) => {
        return (
          <div className="transcript" key={index}>
            <div className="transcript__header">
              <h5 className="transcript__index">
                {transcript.startTime} -{" "}
                {transcriptData[index + 1]?.startTime || "END"}
              </h5>
              <div
                className="transcript__time"
                onClick={handleScrollVideoIntoView}
              >
                <button
                  className="transcript__btn"
                  onClick={() => handleOnClick(transcript.startTime)}
                >
                  {/* Go To {transcript.startTime} */}
                  <BsArrowRightShort />
                  <div className="transcript__tooltip tooltip">
                    {`${t("str_goTo", "Go to")} ${transcript.startTime}`}
                  </div>
                </button>
              </div>
            </div>

            <div className="transcript__text">
              <p>{transcript.text}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TranscriptMessage;
