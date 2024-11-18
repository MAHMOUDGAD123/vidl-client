import "./listLogScreenItem.css";
import { ListLogScreenItemState } from "@_routes/youtube/utils/contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

interface ListLogScreenItemProps {
  state: ListLogScreenItemState;
  title: string;
}

const ListLogScreenItem = ({ state, title }: ListLogScreenItemProps) => {
  const itemEle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll the item into view if it's in the (loading) state
    if (state === "loading") {
      itemEle.current!.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  return (
    <div
      ref={itemEle}
      className={`list-log-screen-item ${state ?? "none"}`}
      title={`${title} (${state})`}
    >
      <span className="title">{title}</span>

      {(() => {
        switch (state) {
          case "loading":
            return <FontAwesomeIcon icon={faSpinner} />;
          case "done":
            return <FontAwesomeIcon icon={faCheck} />;
          case "failed":
            return <FontAwesomeIcon icon={faXmark} />;
          case "none":
          default:
            return <FontAwesomeIcon icon={faMinus} />;
        }
      })()}
    </div>
  );
};

export default ListLogScreenItem;
