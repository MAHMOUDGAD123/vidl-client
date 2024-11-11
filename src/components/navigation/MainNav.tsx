import "./mainNav.css";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/youtube" children={"Youtube"} />
      <NavLink to="/facebook" children={"Facebook"} />
      <NavLink to="/x" children={"X"} />
      <NavLink to="/instagram" children={"Instagram"} />
      <NavLink to="/tiktok" children={"Tiktok"} />
      <span id="navIndicator"></span>
    </nav>
  );
};

export default MainNav;
