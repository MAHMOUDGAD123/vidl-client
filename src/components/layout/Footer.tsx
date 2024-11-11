import "./footer.css";
import { linkIcons } from "../../../public/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <p>Supported Resources</p>
      <div className="links">
        {linkIcons.map(({ name, icon }) => (
          <FontAwesomeIcon icon={icon} title={name} key={name} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
