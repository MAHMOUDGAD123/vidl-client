import "./playlist.css";
import type { yt } from "@_types/youtube-types";
import PlaylistItem from "./PlaylistItem";
import BackToTopBtn from "@_components/popup/BackToTopBtn";
import { useRef } from "react";

interface PlaylistProps {
  vidoes: yt.Search.Video[];
}

const Playlist = ({ vidoes }: PlaylistProps) => {
  const playlistEle = useRef<HTMLDivElement>(null);
  const backToTopBtn = useRef<HTMLDivElement>(null);

  return (
    <div
      className="playlist"
      ref={playlistEle}
      onScroll={() => {
        const ele = playlistEle.current!;
        const bttb = backToTopBtn.current!;

        if (ele.scrollTop > 300) {
          bttb.classList.add("visible");
        } else {
          bttb.classList.remove("visible");
        }
      }}
    >
      {vidoes.map((video, i) => (
        <PlaylistItem key={i} video={video} counter={i + 1} index={i} />
      ))}

      <BackToTopBtn targetEle={playlistEle} ref={backToTopBtn} />
    </div>
  );
};

export default Playlist;
