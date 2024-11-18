import "./listProgressLogScreen.css";
import { yt } from "@_types/youtube-types";
import ListLogScreenItem from "./ListLogScreenItem";
import { ProgressDownloadedFilesContext } from "@_routes/youtube/utils/contexts";
import { useContext } from "react";

interface ListProgressLogScreenProps {
  videos: yt.Search.Video[];
}

const ListProgressLogScreen = ({ videos }: ListProgressLogScreenProps) => {
  const { listDownloadFilesProgress } = useContext(
    ProgressDownloadedFilesContext
  )!;

  const showUp =
    listDownloadFilesProgress.listlogScreenState.length > 0 &&
    listDownloadFilesProgress.show
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
