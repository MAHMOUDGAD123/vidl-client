import "./videoDownloads.css";
import type { ytdl } from "../../../../../public/types/youtube-types";
import Downloads from "./Downloads";
import { useContext, useEffect } from "react";
import { getQuality } from "../../../../routes/youtube/utils/helpers";
import {
  defaultChoice,
  UserChoiceContext,
} from "../../../../routes/youtube/utils/contexts";

interface VideoDownloadsProps {
  videoFormats: ytdl.videoFormat[];
  audioFormats: ytdl.videoFormat[];
}

const VideoDownloads = ({
  videoFormats,
  audioFormats,
}: VideoDownloadsProps) => {
  const { userChoice, setUserChoice } = useContext(UserChoiceContext)!; // userChoice in the localStorage

  useEffect(() => {
    // smart found user choice
    let found = -1;
    const lastChoice = userChoice.choice;

    if (userChoice.isVideo) {
      found = videoFormats.findIndex(
        (format) => getQuality(format.qualityLabel) === lastChoice
      );
    } else {
      found = audioFormats.findIndex(
        (format) => format.audioBitrate === lastChoice
      );
    }
    // format not found
    if (found === -1) {
      setUserChoice(defaultChoice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoFormats, audioFormats]);

  return (
    <div className="video-downloads">
      <Downloads key={"video-list"} formats={videoFormats} label="Video mp4" />
      <Downloads key={"audio-list"} formats={audioFormats} label="Sound mp3" />
    </div>
  );
};

export default VideoDownloads;
