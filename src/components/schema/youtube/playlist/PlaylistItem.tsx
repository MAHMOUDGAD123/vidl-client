import "./playlistItem.css";
import { useContext, useEffect, useRef } from "react";
import type { yt } from "@_types/youtube-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  ListDownloadRequestInfoContext,
  ProgressDownloadedFilesContext,
} from "@_routes/youtube/utils/contexts";

interface PlaylistProps {
  video: yt.Search.Video;
  counter: number;
  index: number; // the indicesList index for the video
}

const PlaylistItem = ({ video, counter, index }: PlaylistProps) => {
  const checkboxEle = useRef<HTMLInputElement>(null);
  const listDownloadRequestInfoContext = useContext(
    ListDownloadRequestInfoContext
  )!;
  const progressDownloadedFilesContext = useContext(
    ProgressDownloadedFilesContext
  )!;

  useEffect(() => {
    const indicesListHasIt =
      listDownloadRequestInfoContext.data.indicesList.has(index);

    checkboxEle.current!.checked = indicesListHasIt;
    progressDownloadedFilesContext.updateListDownloadFilesProgress(
      (current) => ({ ...current, downloaded: 0 })
    );

    if (import.meta.env.DEV) {
      setTimeout(() => {
        console.log(`item ${index + 1} ${indicesListHasIt ? "🟩" : "🟥"}`);
      }, 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDownloadRequestInfoContext.data.indicesList]);

  return (
    <div className="playlist-item">
      <div className="checkbox-wrapper">
        <input
          ref={checkboxEle}
          type="checkbox"
          name="videoCheck"
          onChange={() => {
            const checked = checkboxEle.current!.checked;
            const oldList = new Set(
              listDownloadRequestInfoContext.data.indicesList
            );

            if (checked) {
              listDownloadRequestInfoContext.updateList(oldList.add(index));
            } else {
              oldList.delete(index);
              listDownloadRequestInfoContext.updateList(oldList);
            }
          }}
        />
        <FontAwesomeIcon icon={faCircleCheck} className="check" />
      </div>

      <a
        className="thumbnail"
        href={video.url}
        target="_blank"
        title="watch video"
      >
        <img src={video.thumbnail!.url} loading="lazy" decoding="async" />
        <div className="duration">{video.duration_formatted}</div>
      </a>

      <div className="video-details">
        <span className="counter">#{counter}</span>

        <span className="title" title={video.title}>
          {video.title}
        </span>

        <div className="more-info">
          {video.channel?.name && (
            <span title={video.channel.name}>{video.channel.name}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
