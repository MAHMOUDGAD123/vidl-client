import "./listDownloads.css";
import type { yt } from "@_types/youtube-types";
import ListControls from "./ListControls";
import Playlist from "./Playlist";

interface ListDownloadsProps {
  vidoes: yt.Search.Video[];
}

const ListDownloads = ({ vidoes }: ListDownloadsProps) => {
  return (
    <div className="list-downloads">
      <ListControls />
      <Playlist vidoes={vidoes} />
    </div>
  );
};

export default ListDownloads;
