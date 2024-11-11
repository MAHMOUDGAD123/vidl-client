import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./fontIcon.css";

interface SocialIconProps {
  icon: IconProp;
  title?: string | undefined;
  titlePosition?: "top" | "bottom" | "left" | "right";
}

const FontIcon = ({ icon, title, titlePosition }: SocialIconProps) => {
  return (
    <div className="font-icon">
      <FontAwesomeIcon icon={icon} />
      {title && <span className={`title ${titlePosition}`}>{title}</span>}
    </div>
  );
};

export default FontIcon;
