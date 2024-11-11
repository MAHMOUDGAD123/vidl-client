import "./miniNavMenu.css";
import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { linkIcons } from "../../../public/utils/constants";
import DropMenu from "../popup/DropMenu";
import FontIcon from "../decoration/FontIcon";
import PopupProvider from "../popup/PopupProvider";

const MiniNavMenu = () => {
  const [showPopupMenu, setShowPopupMenu] = useState(false);

  return (
    <PopupProvider>
      <div className="mini-nav-menu">
        <div
          tabIndex={0}
          className="mini-nav-bars popup-toggle"
          onClick={(e) => {
            setShowPopupMenu(
              !e.currentTarget.nextElementSibling!.matches(".show-up")
            );
          }}
          onBlur={() => {
            setShowPopupMenu(false);
          }}
        >
          <FontIcon icon={showPopupMenu ? faBarsStaggered : faBars} />
        </div>

        <DropMenu>
          {linkIcons.map(({ name, icon }) => {
            return (
              <NavLink
                key={name}
                to={`/${name}`}
                children={
                  <FontIcon icon={icon} title={name} titlePosition="left" />
                }
              />
            );
          })}
        </DropMenu>
      </div>
    </PopupProvider>
  );
};

export default MiniNavMenu;
