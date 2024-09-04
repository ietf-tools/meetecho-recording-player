import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PollResults from "./poll-results";
import PollTime from "./poll-time";

// Styles
import "./poll.scss";

const Poll = ({ seekTo, handleScrollVideoIntoView }) => {
  const pollsData = useSelector((state) => state.pollsData.polls);
  const { t } = useTranslation();

  return (
    <>
      {pollsData?.map((poll, index) => {
        return (
          <div className="poll" key={index}>
            <div className="poll-wrapper">
              <div className="poll__header">
                <h5 className="poll__title">
                  {/* {`Question ${index + 1}: `} */}
                  <span className="poll--question">{poll.text}</span>
                </h5>

                <PollTime
                  pollData={poll}
                  seekTo={seekTo}
                  handleScrollVideoIntoView={handleScrollVideoIntoView}
                />
              </div>

              <div className="poll__subtitle">
                <h6 className="poll__totals">{t("str_totalParticipants", "Total Participants")}: {poll.totals}</h6>
              </div>

              <div className="poll__separator"></div>

              <PollResults pollResults={poll.results} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Poll;
