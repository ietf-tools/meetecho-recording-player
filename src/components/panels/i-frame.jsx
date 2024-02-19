// styles
import "./i-frame.scss";

function IFrame({ link }) {
  return (
    <div className="panel__iframe__wrapper">
      <iframe className="panel__iframe" src={link} title={link}></iframe>
    </div>
  );
}

export default IFrame;
