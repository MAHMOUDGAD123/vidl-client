import "./downloadControls.css";
import { useReducer } from "react";
import DownloadBtn from "./DownloadBtn";
import ProgressScreen from "./ProgressScreen";
import { $progressMax } from "@_utils/constants";
import type { yt } from "@_types/youtube-types";
import type { ProviderType } from "@_types/globals";

const progressInitialState: yt.Progress.ProgressState = {
  $progress: 0,
  btnStyleClass: "idle",
  msg: "click the button to download",
};

const reducer = (
  state: yt.Progress.ProgressState, // not used
  action: yt.Progress.ProgressStateAction
): yt.Progress.ProgressState => {
  const currentBtnState = state.btnStyleClass;
  const actionState = action.state;

  /*
   * to deal with:
   * [1]_delays_
   * [2]_client bad internet connection_
   */
  if (
    actionState !== "done" &&
    actionState !== "idle" &&
    actionState === "error" &&
    (currentBtnState === "done" || currentBtnState === "error")
  ) {
    return state;
  }

  switch (actionState) {
    case "error":
    case "done":
    case "fetch": {
      return {
        $progress: 0,
        msg: action.msg ?? "",
        btnStyleClass: actionState,
      };
    }

    case "progress": {
      return {
        $progress: $progressMax - (action.progress! * $progressMax) / 100,
        msg: action.msg!,
        btnStyleClass: "progress",
      };
    }

    case "idle": {
      return progressInitialState;
    }

    default: {
      throw new Error(`Unknown action state ❓-> (${action.state})`);
    }
  }
};

interface DownloadControlsProps {
  downloadRequestInfo: unknown;
  provider: ProviderType;
}

const DownloadControls = ({
  downloadRequestInfo,
  provider,
}: DownloadControlsProps) => {
  const [progressState, progressDispatch] = useReducer(
    reducer,
    progressInitialState
  );

  return (
    <div className="download-controls">
      <ProgressScreen progressMsg={progressState.msg} />

      <DownloadBtn
        btnStyleClass={progressState.btnStyleClass}
        $progress={progressState.$progress}
        downloadRequestInfo={downloadRequestInfo}
        provider={provider}
        progressDispatch={progressDispatch}
      />
    </div>
  );
};

export default DownloadControls;
