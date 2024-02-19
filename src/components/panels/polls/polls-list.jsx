import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Poll from "./poll";

// Import CSS styles
import "./polls-list.scss";

const Polls = ({ seekTo, currentTime, handleScrollVideoIntoView }) => {
  const { t } = useTranslation();
  const isPollsLoading = useSelector((state) => state.pollsData.isPollsLoading);
  const isPollsError = useSelector((state) => state.pollsData.isPollsError);

  return (
    <section className="Polls">
      {isPollsError && (
        <div className="panel-error">
          <h2>{t("str_pollsUnavailable", "Polls not available")}</h2>
        </div>
      )}

      {isPollsLoading && (
        <div className="panel-loading">
          <h2>{t("str_loading", "Loading")}...</h2>
        </div>
      )}

      <Poll
        seekTo={seekTo}
        currentTime={currentTime}
        handleScrollVideoIntoView={handleScrollVideoIntoView}
      />
    </section>
  );
};

export default Polls;
