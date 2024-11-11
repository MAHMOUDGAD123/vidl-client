import "./downloadOption.css";
import "./moreDetails.css";
import { useContext, useEffect, useRef, useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ytdl } from "../../../../../public/types/youtube-types";
import { getQuality } from "../../../../routes/youtube/utils/helpers";
import MoreDetailsVideo from "./MoreDetailsVideo";
import MoreDetailsAudio from "./MoreDetailsAudio";
import { UserChoiceContext } from "../../../../routes/youtube/utils/contexts";

interface FormatOptionProps {
  format: ytdl.videoFormat;
}

const DownloadOption = ({ format }: FormatOptionProps) => {
  const optionEle = useRef<HTMLInputElement>(null);

  const [showDetails, setShowDetails] = useState(false);
  const { userChoice, setUserChoice } = useContext(UserChoiceContext)!;

  const videoQuality = getQuality(format?.qualityLabel); // videoQuality | NaN

  useEffect(() => {
    const choice = userChoice.choice;

    // check the option if matches
    if (videoQuality === choice || format.audioBitrate === choice) {
      optionEle.current!.checked = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChoice]);

  return (
    <div
      className="download-option"
      onClick={(e) => {
        /*
         * run only if the clicked element is:
         * [1] the option element itself
         * [2] the (.quality) element
         */
        if (
          e.target === e.currentTarget ||
          (e.target as HTMLElement).matches(".quality")
        ) {
          optionEle.current!.click();
        }
      }}
    >
      <span
        className="info-icon"
        onClick={() => {
          setShowDetails(true);
        }}
      >
        {format.hasVideo ? (
          <i className="fi fi-br-play-alt"></i>
        ) : (
          <i className="fi fi-sr-music-alt"></i>
        )}
      </span>

      <span className="quality">
        {format.hasVideo ? videoQuality + "p" : format.audioBitrate + "K"}
      </span>

      <div className="radiobox">
        <input
          ref={optionEle}
          type="radio"
          name="format"
          onChange={() => {
            setUserChoice({
              isVideo: format.hasVideo,
              choice: format.hasVideo ? videoQuality : format.audioBitrate!,
            });
          }}
        />
        <FontAwesomeIcon icon={faCircleCheck} className="check" />
      </div>

      {showDetails &&
        (format.hasVideo ? (
          <MoreDetailsVideo format={format} onClickAction={setShowDetails} />
        ) : (
          <MoreDetailsAudio format={format} onClickAction={setShowDetails} />
        ))}
    </div>
  );
};

export default DownloadOption;
