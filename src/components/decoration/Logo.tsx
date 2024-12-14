import "./logo.css";
import { Link } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logo = () => {
  const isSafari =
    navigator.userAgent &&
    /apple/i.test(navigator.userAgent) &&
    !navigator.userAgent.includes("Chrome") &&
    !navigator.userAgent.includes("CriOS") && // chrome on ios
    !navigator.userAgent.includes("FxiOS"); // firefox on ios

  return (
    <>
      {isSafari ? (
        <Link to="/" className="logo-safari">
          <span>VIDL</span>
        </Link>
      ) : (
        <Link to="/" className="logo">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <span>IDL</span>
        </Link>
      )}
    </>
  );
};

export default Logo;
