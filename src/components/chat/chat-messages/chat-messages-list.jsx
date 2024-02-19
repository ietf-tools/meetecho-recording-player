// components
import ChatMessage from "./chat-message";

const ChatMessagesList = ({ chatMessages, isScrolled }) => {
  return (
    <div className="chat-messages">
      <ChatMessage chatMessages={chatMessages} isScrolled={isScrolled} />
    </div>
  );
};

export default ChatMessagesList;

// Scroll a React Component into View
// https://robinvdvleuten.nl/blog/scroll-a-react-component-into-view/
