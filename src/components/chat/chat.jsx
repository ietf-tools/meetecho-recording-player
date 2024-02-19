import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// styles
import "./chat.scss";

// components
import ChatMessagesList from "./chat-messages/chat-messages-list";

const Chat = ({ data = {}, currentTime, showChat }) => {
  const myRef = useRef(null);
  const { t } = useTranslation();
  const [isScrolled, setScrolled] = useState(true);

  const handleScroll = () => {
    if (myRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = myRef.current;
      setScrolled(scrollTop + clientHeight > scrollHeight - 10);
    }
  };

  return (
    <section
      className={
        showChat
          ? "Chat section--wrapper d-unset"
          : "Chat section--wrapper d-none"
      }
      ref={myRef}
      onScroll={handleScroll}
    >
      <div>
        <h1 className="section--title">{t("str_chat", "Chat")}</h1>
        <ChatMessagesList
          isScrolled={isScrolled}
          chatMessages={data.messages?.filter(
            (chatMessage) => chatMessage.dtime / 1000 <= currentTime
          )}
        />
      </div>
    </section>
  );
};

export default Chat;
