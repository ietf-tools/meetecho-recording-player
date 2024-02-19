import { useTranslation } from "react-i18next";

// styles
import "./mobile-layout-toggle-button.scss";

// Icons
import iconChat from "~/assets/images/icon--chat.svg";
import iconPanels from "~/assets/images/icon--panels.svg";

function MobileLayoutToggleButton({ handleToggleComponents, showChat }) {
  const { t } = useTranslation();

  return (
    <div className="panel-chat-toggle">
      <img
        onClick={handleToggleComponents}
        src={showChat ? iconPanels : iconChat}
        alt={t("str_panelChatToggleIcon", "panel/chat toggle icon")}
      />
      <div className="panel-chat-toggle__tooltip tooltip">
        {showChat ? t("str_showPanels", "Show Panels") : t("str_showChat", "Show Chat")}
      </div>
    </div>
  );
}

export default MobileLayoutToggleButton;
