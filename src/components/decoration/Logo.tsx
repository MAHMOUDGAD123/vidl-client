import { Link } from "react-router-dom";
import FontIcon from "./FontIcon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./logo.css";

const Logo = () => {
  return (
    <Link to="/" id="logo">
      <div className="logo-icon">
        <FontIcon icon={faPlay} />
      </div>
      <span>IDL</span>
    </Link>
  );
};

export default Logo;
