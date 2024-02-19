import { calculatePercentage } from "~/helpers/math-operations";
import { useTranslation } from "react-i18next";

// Styles
import "./poll-results.scss";

const PollResults = ({ pollResults }) => {
  const { t } = useTranslation();
  const arrayResults = Object.values(pollResults);

  const count = arrayResults.map((single, i) => {
    return i, single.count;
  });

  const max = Math.max(...count);
  const indexesOfTopPolls = [];
  for (const [index, element] of count.entries()) {
    if (element === max) {
      indexesOfTopPolls.push(index);
    }
  }

  // Calculate Total Counts
  let total = 0;

  for (const arrayResult of arrayResults) {
    total += arrayResult.count;
  }

  // Mapping Value to Text String
  const MAPPED_RESULT_VALUES = {
    raise: t("str_raise", "Raised Hands"),
    do_not_raise: t("str_doNotRaise", "Not Raised Hands"),
    yes: t("str_yes", "Yes"),
    no: t("str_no", "No"),
    no_opinion: t("str_noOpinion", "No Opinion"),
  };

  return (
    <div className="poll-results-list">
      {Object.entries(pollResults).map(([key, result]) => {
        const percentage = calculatePercentage(result.count, total);

        // This is printed if no matches is found within the result.value MAP
        const formattedResultText = result.text.replace(/_/g, " ");

        return (
          <div
            key={key}
            className={`poll-results ${
              indexesOfTopPolls.includes(Number.parseInt(key - 1))
                ? "poll-results--top"
                : ""
            }`}
          >
            <div className="poll-results__data">
              <div className="poll-results__vote">
                {MAPPED_RESULT_VALUES[result.value] !== undefined ? MAPPED_RESULT_VALUES[result.value] : formattedResultText}
              </div>
              <p className="poll-results__percentage">{percentage}%</p>
              <p className="poll-results__count">
                {result.count}
              </p>
            </div>
            <div
              className="poll-results__bar"
              data-percentage={percentage}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
export default PollResults;
