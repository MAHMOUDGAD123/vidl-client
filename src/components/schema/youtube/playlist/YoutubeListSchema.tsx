import "./youtubeListSchema.css";
import { useCallback, useState } from "react";
import type { yt } from "@_types/youtube-types";
import YoutubeListInfo from "./YoutubeListInfo";
import DownloadControls from "../DownloadControls";
import YoutubeUserChoiceContext from "../YoutubeUserChoiceContext";
import ListDownloads from "./ListDownloads";
import PlaylistProgress from "./PlaylistProgress";
import ListProgressLogScreen from "./ListProgressLogScreen";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListDownloadRequestInfoContext,
  ListDownloadFilesProgress,
  ProgressDownloadedFilesContext,
} from "@_routes/youtube/utils/contexts";

interface YoutubeListSchemaProps {
  data: yt.Search.ListInfo;
}

const YoutubeListSchema = ({ data }: YoutubeListSchemaProps) => {
  if (import.meta.env.DEV) {
    console.clear(); // clear the console
  }

  const [listDownloadFilesProgress, updateListDownloadFilesProgress] =
    useState<ListDownloadFilesProgress>(() => ({
      downloaded: 0,
      show: false,
      listlogScreenState: [],
    }));

  const [listConfiguration, setistConfiguration] =
    useState<yt.Download.ListConfiguration>(() => ({
      indicesList: new Set(data.videos.map((_, i) => i)),
      total: data.videoCount!,
    }));

  const updateList = useCallback((newList: Set<number>) => {
    setistConfiguration((current) => ({
      ...current,
      indicesList: newList,
    }));
  }, []);

  return (
    <YoutubeUserChoiceContext>
      <ListDownloadRequestInfoContext.Provider
        value={{ updateList, data: listConfiguration }}
      >
        <ProgressDownloadedFilesContext.Provider
          value={{ listDownloadFilesProgress, updateListDownloadFilesProgress }}
        >
          <div className="youtube-list-schema">
            <YoutubeListInfo listDetails={data} />

            <div className="playlist-download-info">
              <DownloadControls
                downloadRequestInfo={
                  {
                    listInfo: data,
                    indicesList: listConfiguration.indicesList,
                  } satisfies yt.Download.ListDownloadRequestInfo
                }
                provider="youtube-list"
              />

              <PlaylistProgress
                total={listConfiguration.indicesList.size}
                downloaded={listDownloadFilesProgress.downloaded}
              />

              <FontAwesomeIcon
                icon={faEye}
                title={listDownloadFilesProgress.show ? "hide log" : "show log"}
                className={`log-screen-toggle${
                  listDownloadFilesProgress.listlogScreenState.length > 0
                    ? " show"
                    : ""
                }${listDownloadFilesProgress.show ? " on" : ""}`}
                onClick={() => {
                  updateListDownloadFilesProgress((current) => ({
                    ...current,
                    show: !current.show,
                  }));
                }}
              />
            </div>

            <ListProgressLogScreen videos={data.videos} />

            <ListDownloads vidoes={data.videos} />
          </div>
        </ProgressDownloadedFilesContext.Provider>
      </ListDownloadRequestInfoContext.Provider>
    </YoutubeUserChoiceContext>
  );
};

export default YoutubeListSchema;
