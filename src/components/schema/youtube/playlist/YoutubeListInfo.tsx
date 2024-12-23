import "./youtubeListInfo.css";
import {
  faCalendarDays,
  faClock,
  faEye,
  faLink,
  faListUl,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import type { yt } from "@_types/youtube-types";
import FontIcon from "@_components/decoration/FontIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  frmtUploadDate,
  frmtViews,
  getPlaylistTotalDuration,
} from "@_routes/youtube/utils/helpers";

interface ListInfoProps {
  listDetails: yt.Search.ListInfo;
}

const YoutubeListInfo = ({ listDetails }: ListInfoProps) => {
  return (
    <div className="youtube-list-info">
      <div className="thumbnail">
        <img
          src={
            listDetails.thumbnail?.url
              ? listDetails.thumbnail?.url
              : "/imgs/vidl.png"
          }
          alt="thumbnail"
          decoding="sync"
        />

        <a className="list-link" href={listDetails.url} target="_blank">
          <FontIcon
            icon={faListUl}
            title="Playlist Link"
            titlePosition="right"
          />
        </a>
      </div>

      <div className="details">
        <div className="title" title={listDetails.title}>
          {listDetails.title}
        </div>

        <a
          className="channel-info"
          href={listDetails.channel?.url}
          target="_blank"
          title={listDetails.channel?.name}
        >
          <FontAwesomeIcon icon={faLink} />
          <div>{listDetails.channel?.name}</div>
        </a>

        {listDetails.lastUpdate && (
          <div className="last-update" title={listDetails.lastUpdate}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>{frmtUploadDate(listDetails.lastUpdate)}</span>
          </div>
        )}

        <div className="video-count" title={`${listDetails.videoCount} video`}>
          <FontAwesomeIcon icon={faRectangleList} />
          <span>{listDetails.videoCount} video</span>
        </div>

        <div className="total-time" title="total time">
          <FontAwesomeIcon icon={faClock} />
          <span>
            {getPlaylistTotalDuration(listDetails.videos).durationText}
          </span>
        </div>

        <div className="views" title={`${listDetails.views} view`}>
          <FontAwesomeIcon icon={faEye} />
          <span>{frmtViews(`${listDetails.views}`)} view</span>
        </div>
      </div>
    </div>
  );
};

export default YoutubeListInfo;
