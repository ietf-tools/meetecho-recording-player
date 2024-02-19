import { useRef, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";

// styles
import "./chat-message.scss";

// Parse Elements with link
function parseWithLinks(text) {
  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === "a" && attribs.href) {
        return (
          <a href={attribs.href} target="_blank" rel="noreferrer">
            {domToReact(children)}
          </a>
        );
      }
    },
  };

  return parse(text, options);
}

function ChatMessage({ chatMessages, isScrolled }) {
  const myRef = useRef(null);

  useEffect(() => {
    if (isScrolled) {
      myRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });

  return (
    <>
      {chatMessages.map((chatMessage, index) => (
        <div className="chat-message" key={index} ref={myRef}>
          <div className="chat-message__header">
            <h4 className="chat-message__author">{chatMessage.author}</h4>
            <p className="chat-message__time">
              {new Date(chatMessage.dtime).toISOString().slice(11, 19)}
            </p>
          </div>
          <div className="chat-message__text">
            <div className="chat-message__text__inner">
              {parseWithLinks(chatMessage.text)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatMessage;

// Time Conversion Function:
// https://stackoverflow.com/questions/29816872/how-can-i-convert-milliseconds-to-hhmmss-format-using-javascript

// Rendering RAW HTML with JSX
// https://stackoverflow.com/questions/27934238/rendering-raw-html-with-reactjs
// https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
