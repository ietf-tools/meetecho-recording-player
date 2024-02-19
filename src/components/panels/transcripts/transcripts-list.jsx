import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TranscriptMessage from "./transcript-message";

// styles
import "./transcripts-list.scss";

const Transcripts = ({ seekTo, currentTime, handleScrollVideoIntoView }) => {
  const { t } = useTranslation();
  const isTranscriptLoading = useSelector(
    (state) => state.transcriptData.isTranscriptLoading
  );
  const isTranscriptError = useSelector(
    (state) => state.transcriptData.isTranscriptError
  );

  return (
    <section className="Transcripts">
      {isTranscriptError && (
        <div className="panel-error">
          <h2>{t("str_transcriptsUnavailable", "Transcripts not available")}</h2>
        </div>
      )}

      {isTranscriptLoading && (
        <div className="panel-loading">
          <h2>{t("str_loading", "Loading")}...</h2>
        </div>
      )}

      <TranscriptMessage
        seekTo={seekTo}
        currentTime={currentTime}
        handleScrollVideoIntoView={handleScrollVideoIntoView}
      />
    </section>
  );
};

export default Transcripts;
