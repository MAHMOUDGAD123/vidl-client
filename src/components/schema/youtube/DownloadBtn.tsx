import "./downloadBtn.css";
import { useContext } from "react";
import type { yt } from "../../../../public/types/youtube-types";
import type { ProviderType } from "../../../../public/types/globals";
import {
  ProgressDownloadedFilesContext,
  UserChoice,
  UserChoiceContext,
} from "../../../routes/youtube/utils/contexts";
// handlers
import {
  youtubeListDownloadHandler,
  youtubeVideoDownloadHandler,
} from "../../../routes/youtube/utils/handlers";

type ProviderHandlerFunction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  downloadData: unknown,
  userChoice: UserChoice,
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>,
  callable?: unknown // a callable function
) => void;

// used to map the handler with it's provider
const handlersMap = new Map<ProviderType, ProviderHandlerFunction>([
  ["youtube-video", youtubeVideoDownloadHandler],
  ["youtube-list", youtubeListDownloadHandler],
]);

interface DownloadBtnProps {
  btnStyleClass: string;
  $progress: number;
  downloadRequestInfo: unknown;
  provider: ProviderType;
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>;
}

const DownloadBtn = ({
  btnStyleClass,
  $progress,
  downloadRequestInfo,
  provider,
  progressDispatch,
}: DownloadBtnProps) => {
  // 🤮💩
  // used to map the callable function with it's provider
  const callableFunctionMap = new Map<ProviderType, unknown>([
    [
      "youtube-list",
      useContext(ProgressDownloadedFilesContext)
        ?.updateListDownloadFilesProgress,
    ],
  ]);

  const { userChoice } = useContext(UserChoiceContext)!;

  return (
    <button
      className={"download-btn" + (btnStyleClass ? " " + btnStyleClass : "")}
      onClick={(e) => {
        handlersMap.get(provider)!(
          e,
          downloadRequestInfo,
          userChoice,
          progressDispatch,
          callableFunctionMap.get(provider)
        );
      }}
    >
      <svg id="arrow" width="14px" height="20px" viewBox="17 14 14 20">
        <path d="M24,15 L24,32"></path>
        <polyline points="30 27 24 33 18 27"></polyline>
      </svg>
      <svg id="check" width="21px" height="15px" viewBox="13 17 21 15">
        <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
      </svg>
      <svg
        id="border"
        width="48px"
        height="48px"
        viewBox="0 0 48 48"
        strokeDashoffset={$progress} // progress
      >
        <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
      </svg>
      <svg id="xcheck" viewBox="0 0 52 52">
        <path d="M16 16 36 36 M36 16 16 36" />
      </svg>
    </button>
  );
};

export default DownloadBtn;
