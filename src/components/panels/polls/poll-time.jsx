import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Icons
import { BsArrowRightShort } from "react-icons/bs";

// Styles
import "./poll-time.scss";

const PollTime = ({ seekTo, handleScrollVideoIntoView, pollData }) => {
  const { t } = useTranslation();
  const sessionData = useSelector(
    (state) => state.sessionData.sessionConfiguration
  );

  const startTimeArray = [pollData.start_time];

  const handleOnClick = (time) => {
    // Transforming into Date Objects the dates provided, minus the final "Z"
    const sessionStartDate = new Date(
      sessionData.start_datetime.slice(0, -1).toString()
    );
    const pollStartDate = new Date(time.slice(0, -1).toString());

    // // Calculate the time passed between the two in Milliseconds
    // // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    const diffTime = Math.abs(pollStartDate - sessionStartDate) / 1000;
    seekTo(diffTime);
  };

  return (
    <>
      {startTimeArray.map((pollTime, index) => {
        return (
          <div
            className="poll__time"
            key={index}
            onClick={handleScrollVideoIntoView}
          >
            <button
              className="poll__time__btn"
              onClick={() => handleOnClick(pollTime)}
            >
              <BsArrowRightShort />
              <div className="poll__time__tooltip tooltip">
                {t("str_pollStartTime", "Go to Poll Start Time")}
              </div>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default PollTime;
