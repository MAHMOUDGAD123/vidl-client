import "./themeSwitch.css";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useLayoutEffect } from "react";
import { useStateLs } from "../../../public/hooks/useStateLs";
import FontIcon from "../decoration/FontIcon";
import DropMenu from "../popup/DropMenu";
import PopupProvider from "../popup/PopupProvider";

type ThemeCode = 1 | 2 | 3;
type Theme = "light" | "dark" | "light dark";
type ThemeInfo = { theme: Theme; icon: IconProp };
type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const codeMap = new Map<ThemeCode, ThemeInfo>([
  [1, { theme: "light", icon: faSun }],
  [2, { theme: "dark", icon: faMoon }],
  [3, { theme: "light dark", icon: faDesktop }],
]);

const ThemeSwitch = () => {
  const [appTheme, setAppTheme] = useStateLs<ThemeCode>("_vidl_theme_", 3);
  const currentThemeEle = useRef<HTMLDivElement | null>(null);
  const currentThemeIcon = useRef<IconProp>(codeMap.get(appTheme)!.icon);

  const changeThemeHandler = (e: ClickEvent, themeCode: ThemeCode) => {
    const ele = e.currentTarget as HTMLDivElement;

    if (currentThemeEle.current !== ele) {
      currentThemeEle.current!.classList.remove("active");
      currentThemeEle.current = ele;
      currentThemeIcon.current = codeMap.get(themeCode)!.icon;
      setAppTheme(themeCode);
    }
  };

  useLayoutEffect(() => {
    currentThemeEle.current =
      currentThemeEle.current ??
      document.querySelector(`.theme-opt:nth-child(${appTheme})`);

    currentThemeEle.current!.classList.add("active");
    document.documentElement.style.colorScheme = codeMap.get(appTheme)!.theme;
  }, [appTheme]);

  return (
    <PopupProvider>
      <div id="themeSwitch">
        <div className="switch popup-toggle">
          <FontIcon icon={currentThemeIcon.current} />
        </div>

        <DropMenu>
          <div
            key="light"
            className="theme-opt"
            tabIndex={0}
            onClick={(e) => changeThemeHandler(e, 1)}
          >
            <FontAwesomeIcon icon={faSun} />
            <span>light</span>
          </div>
          <div
            key="dark"
            className="theme-opt"
            tabIndex={0}
            onClick={(e) => changeThemeHandler(e, 2)}
          >
            <FontAwesomeIcon icon={faMoon} />
            <span>dark</span>
          </div>
          <div
            key="system"
            className="theme-opt"
            tabIndex={0}
            onClick={(e) => changeThemeHandler(e, 3)}
          >
            <FontAwesomeIcon icon={faDesktop} />
            <span>system</span>
          </div>
        </DropMenu>
      </div>
    </PopupProvider>
  );
};

export default ThemeSwitch;
