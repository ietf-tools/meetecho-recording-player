import { useTranslation } from "react-i18next";

// styles
import "./info.scss";

function Info({ data }) {
  const { t } = useTranslation();

  return (
    <section className="Info">
      <div className="panel__info">
        <h4 className="panel__info__title">{data.description}</h4>
        <p className="panel__info__date">{t("str_date", "Date")}: {data.date}</p>
      </div>
    </section>
  );
}

export default Info;
