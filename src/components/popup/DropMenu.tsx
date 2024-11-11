import "./dropMenu.css";
import { ReactNode } from "react";

interface DropMenuProps {
  children: ReactNode | ReactNode[];
}

const DropMenu = ({ children }: DropMenuProps) => {
  return <div className="drop-menu popup">{children}</div>;
};

export default DropMenu;
