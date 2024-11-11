import "./listProgressLogScreen.css";
import { yt } from "../../../../../public/types/youtube-types";
import ListLogScreenItem from "./ListLogScreenItem";
import {
  ListDownloadRequestInfoContext,
  ProgressDownloadedFilesContext,
} from "../../../../routes/youtube/utils/contexts";
import { useContext } from "react";

interface ListProgressLogScreenProps {
  videos: yt.Search.Video[];
}

const ListProgressLogScreen = ({ videos }: ListProgressLogScreenProps) => {
  const { listDownloadFilesProgress } = useContext(
    ProgressDownloadedFilesContext
  )!;

  const { data } = useContext(ListDownloadRequestInfoContext)!;

  const showUp =
    listDownloadFilesProgress.listlogScreenState.length > 0 &&
    listDownloadFilesProgress.show &&
    data.indicesList.size > 0
      ? " show"
      : "";

  return (
    <div className={`list-progress-log-screen${showUp}`}>
      {listDownloadFilesProgress.listlogScreenState.map(
        ({ state, videoIndex }) => {
          const { title, id } = videos[videoIndex];
          return <ListLogScreenItem key={id} state={state} title={title!} />;
        }
      )}
    </div>
  );
};

export default ListProgressLogScreen;
