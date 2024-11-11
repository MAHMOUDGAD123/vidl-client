import "./header.css";
import Logo from "../decoration/Logo";
import MainNav from "../navigation/MainNav";
import MiniNavMenu from "../navigation/MiniNavMenu";
import ThemeSwitch from "../theme/ThemeSwitch";

const Header = () => {
  return (
    <header>
      <Logo />
      <MainNav />
      <ThemeSwitch />
      <MiniNavMenu />
    </header>
  );
};

export default Header;
