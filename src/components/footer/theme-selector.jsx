import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "~/redux/features/session-ui-slice";
import { useTranslation } from "react-i18next";

// styles
import "./toggle-selector.scss";

// Icons
import iconModeDark from "~/assets/images/icon--mode-dark.svg";
import iconModeLight from "~/assets/images/icon--mode-light.svg";

export default function ThemeSelector() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isDarkThemeEnabled = useSelector(
    (state) => state.sessionUI.isDarkThemeEnabled
  );

  return (
    <div className="toggle-selector">
      <div className="mode-toggle">
        <img
          onClick={() => dispatch(toggleTheme())}
          src={isDarkThemeEnabled ? iconModeLight : iconModeDark}
          style={{
            filter: isDarkThemeEnabled ? "invert(100%)" : "invert(20%)",
          }}
          alt={t("str_themeIcon", "dark/light toggle icon")}
        />
        <div className="mode-toggle__tooltip tooltip">
          {isDarkThemeEnabled ? t("str_lightTheme", "Light Theme") : t("str_darkTheme", "Dark Theme")}
        </div>
      </div>
    </div>
  );
}
