// styles
import "./logo.scss";

// Icons
import iconLogo from "~/assets/images/icon--logo.png";

function Logo() {
  return (
    <>
      <a
        className="footer-logo"
        href="https://www.meetecho.com/en/"
        target="_blank"
        rel="noreferrer"
      >
        <img className="footer-logo--img" src={iconLogo} alt="Meetecho Logo" />
      </a>
    </>
  );
}

export default Logo;
