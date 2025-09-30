import { useRef, useEffect } from "react";
import parse, { domToReact, attributesToProps } from "html-react-parser";

// styles
import "./chat-message.scss";

import he from "he";

// Outside scope Functions
const replace = ({ attribs = {}, type, name, children }) => {
  // Check if the element is a link with href starting with '#narrow'
  if (attribs.href?.slice(0, 7) === "#narrow") {
    // If so, return a span containing the link's children
    return <span>{domToReact(children, { replace })}</span>;
  }

  // Check if the element is a 'spoiler-block' with exactly two children
  if (attribs.class === "spoiler-block" && children?.length === 2) {
    console.log("spoiler message");
  }

  // Check if the element is an anchor tag
  if (type === "tag" && name === "a") {
    // Convert attributes to props for the anchor element
    const props = attributesToProps(attribs);
    // Set target to '_blank' to open the link in a new tab
    props.target = "_blank";
    // Return the anchor element with the updated props
    return <a {...props}>{domToReact(children, { replace })}</a>;
  }

  // Check if the element is a span with a class that starts with "emoji"
  if (
    type === "tag" &&
    name === "span" &&
    attribs.class &&
    attribs.class.startsWith("emoji")
  ) {

    // Extract the Unicode part from the class, but stop at the first hyphen
    let unicode = attribs.class
      .split(" ")
      .find((cls) => cls.startsWith("emoji-"))
      .replace(/emoji-((?:\w+-?)+)/, '$1')
      .split("-")
      .map(code => `&#x${code.toUpperCase()};`).join('');

    // // we should crop the flags only?
    // if (!unicode.startsWith("1f1e7")) {
    //   unicode = unicode.split('-')[0]; // Only keep the first part before the hyphen
    // }
    
    // Return the Emoji component of the emoji-picker-react library with the extracted Unicode
    // return <Emoji unified={unicode} size={16} emojiStyle={EmojiStyle.GOOGLE} />;
    const emojiUnicode = he.decode(unicode); // Decodifica in 🇦🇺

    return <div className="m-emoji">{emojiUnicode}</div>;
  }
};

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
              {parse(chatMessage.text, { replace })}
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
