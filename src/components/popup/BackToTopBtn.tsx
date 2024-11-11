import "./backToTopBtn.css";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import FontIcon from "../decoration/FontIcon";
import { forwardRef } from "react";

interface BackToTopBtnProps {
  targetEle: React.RefObject<HTMLDivElement | Window>;
  id?: string;
}

const BackToTopBtn = (
  { targetEle, id }: BackToTopBtnProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className="back-to-top-btn"
      id={id}
      onClick={() => {
        targetEle.current!.scrollTo({ behavior: "smooth", top: 0 });
      }}
    >
      <FontIcon icon={faCircleChevronUp} />
    </div>
  );
};

export default forwardRef(BackToTopBtn);
