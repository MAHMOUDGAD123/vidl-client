import axios, { AxiosError } from "axios";
import { download } from "../../../../public/utils/tools";
import type { yt } from "../../../../public/types/youtube-types";
import { startProgressInterval, stopProgressInterval } from "./helpers";
import type {
  ListDownloadFilesProgress,
  ListLogScreenItemState,
  UserChoice,
} from "./contexts";

const openYoutubeDownloadSession = async (
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>
): Promise<{ success: boolean; sessionID?: string }> => {
  const apiUrl = import.meta.env.DEV
    ? "http://localhost:3000/api/ods"
    : "https://vidl-api.vercel.app/api/ods";

  let sessionID = "";

  try {
    const response = await axios.get<yt.Progress.OpenDownloadSessionResponse>(
      apiUrl,
      {
        withCredentials: true,
        responseType: "json",
      }
    );

    if (response.status !== 200) {
      throw new AxiosError("faild to open a download session 🟥");
    }

    sessionID = response.data.sessionID;
    const { progressInfo } = response.data;

    progressDispatch(progressInfo);
  } catch (err) {
    progressDispatch({
      state: "error",
      msg: (err as AxiosError).message,
    });

    return { success: false };
  }
  return { success: true, sessionID };
};

const youtubeVideoDownloader = async (
  videoUrl: string,
  videoTitle: string,
  UserChoice: UserChoice,
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>
): Promise<boolean> => {
  return new Promise((resolve) => {
    // open download session first
    openYoutubeDownloadSession(progressDispatch)
      .then((sessionState) => {
        if (!sessionState.success) {
          if (import.meta.env.DEV) {
            console.log("failed to open session 🟥");
          }
          resolve(false);
        } else {
          if (import.meta.env.DEV) {
            console.log("session opened 🟩");
          }
          // only start if session is opened
          const { isVideo, choice } = UserChoice;
          const sessionID = sessionState.sessionID!;

          let apiUrl;

          if (import.meta.env.DEV) {
            apiUrl = isVideo
              ? "http://localhost:3000/api/youtube/video-download"
              : "http://localhost:3000/api/youtube/audio-download";
          } else {
            apiUrl = isVideo
              ? "https://vidl-api.vercel.app/api/youtube/video-download"
              : "https://vidl-api.vercel.app/api/youtube/audio-download";
          }

          const requestData: yt.Progress.DownloadFileRequest = {
            searchUrl: videoUrl,
            quality: choice,
            sessionID,
          };

          const intervalId = startProgressInterval(progressDispatch, sessionID); // watch the server progress

          axios
            .post(apiUrl, requestData, {
              withCredentials: true,
              responseType: "blob",
            })
            .then((response) => {
              if (response.status !== 200) {
                resolve(false);
                return;
              }

              const fileName = `${videoTitle}.${isVideo ? "mp4" : "mp3"}`;

              download(response.data, fileName);
              stopProgressInterval(progressDispatch, intervalId);
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export const youtubeVideoDownloadHandler = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  downloadData: unknown,
  userChoice: UserChoice,
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>
) => {
  const btn = event.currentTarget;
  btn.disabled = true; // disable btn

  const {
    videoDetails: { video_url, title },
  } = downloadData as yt.Download.VideoDownloadRequestInfo;

  const done = await youtubeVideoDownloader(
    video_url,
    title,
    userChoice,
    progressDispatch
  );

  if (import.meta.env.DEV) {
    if (done) {
      console.log("file downloaded successfully 🟩");
    } else {
      console.log("download failed 🟥");
    }
  }

  // back to idle state & enable the button (after 5 sec)
  setTimeout(() => {
    progressDispatch({
      state: "idle",
      msg: "click the button to download",
    });

    btn.disabled = false; // enable btn
  }, 5000);
};

export const youtubeListDownloadHandler = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  downloadData: unknown,
  userChoice: UserChoice,
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>,
  callable: unknown
) => {
  const btn = event.currentTarget;
  btn.disabled = true; // disable btn

  const {
    listInfo: { videos },
    indicesList,
  } = downloadData as yt.Download.ListDownloadRequestInfo;

  const updateListDownloadFilesProgress = callable as React.Dispatch<
    React.SetStateAction<ListDownloadFilesProgress>
  >;

  if (indicesList.size === 0) {
    progressDispatch({
      state: "error",
      msg: "empty list",
    });
  } else {
    if (import.meta.env.DEV) {
      console.log("Start Downloading...🔃");
    }

    // initialize all & put all items in the (none) state & show components
    updateListDownloadFilesProgress((current) => ({
      ...current,
      downloaded: 0,
      show: true,
      listlogScreenState: [...indicesList].map((videoIndex) => {
        return { videoIndex, state: "none" };
      }),
    }));

    const updateProgressState = (
      currentState: ListDownloadFilesProgress,
      currentIndex: number,
      state: ListLogScreenItemState,
      downloaded?: number
    ) => {
      return {
        show: currentState.show,
        downloaded: downloaded ?? currentState.downloaded,
        listlogScreenState: currentState.listlogScreenState.map((itemData) => {
          return currentIndex === itemData.videoIndex
            ? { videoIndex: itemData.videoIndex, state: state }
            : itemData;
        }),
      };
    };

    // download videos one by one
    for (const currentVideoIndex of indicesList) {
      // put the current video in the (loading) state
      updateListDownloadFilesProgress((current) =>
        updateProgressState(current, currentVideoIndex, "loading")
      );

      const { url, title } = videos[currentVideoIndex];

      // download the video
      const done = await youtubeVideoDownloader(
        url,
        title!,
        userChoice,
        progressDispatch
      );

      if (done) {
        // put the video in the (done) state
        updateListDownloadFilesProgress((current) =>
          updateProgressState(
            current,
            currentVideoIndex,
            "done",
            current.downloaded + 1
          )
        );
      } else {
        // put the video in the (failed) state
        updateListDownloadFilesProgress((current) =>
          updateProgressState(current, currentVideoIndex, "failed")
        );
      }
    }
  }

  // back to idle state & enable the button (after 5 sec)
  setTimeout(() => {
    progressDispatch({
      state: "idle",
      msg: "click the button to download",
    });

    btn.disabled = false; // enable btn
  }, 5000);
};
