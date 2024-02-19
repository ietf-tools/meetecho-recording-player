import { useSelector } from "react-redux";

import PollResults from "./poll-results";
import PollTime from "./poll-time";

// Styles
import "./poll.scss";

const Poll = ({ seekTo, handleScrollVideoIntoView }) => {
  const pollsData = useSelector((state) => state.pollsData.polls);

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

              <PollResults pollResults={poll.results} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Poll;
