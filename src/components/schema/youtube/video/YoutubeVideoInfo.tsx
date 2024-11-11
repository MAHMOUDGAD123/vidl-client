import "./youtubeVideoInfo.css";
import {
  faCalendarDays,
  faCirclePlay,
  faClock,
  faEye,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FontIcon from "../../../decoration/FontIcon";
import type { ytdl } from "../../../../../public/types/youtube-types";
import {
  frmtUploadDate,
  frmtVideoDuration,
  frmtViews,
} from "../../../../routes/youtube/utils/helpers";

interface VideoInfoProps {
  videoDetails: ytdl.MoreVideoDetails;
}

const YoutubeVideoInfo = ({ videoDetails }: VideoInfoProps) => {
  const { durationText } = frmtVideoDuration(+videoDetails.lengthSeconds);
  const uploadDate = new Date(videoDetails.uploadDate).toDateString();

  return (
    <div className="youtube-video-info">
      <div className="thumbnail">
        <img
          decoding="async"
          src={videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url}
          alt="thumbnail"
        />

        <a className="video-link" href={videoDetails.video_url} target="_blank">
          <FontIcon
            icon={faCirclePlay}
            title="Watch Video"
            titlePosition="right"
          />
        </a>
      </div>
      <div className="details">
        <div className="title" title={videoDetails.title}>
          {videoDetails.title}
        </div>

        <a
          className="channel-info"
          href={videoDetails.author.channel_url}
          target="_blank"
          title={videoDetails.author.name}
        >
          <FontAwesomeIcon icon={faLink} />
          <div>{videoDetails.author.name}</div>
        </a>

        <div className="upload-date" title={uploadDate}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>{frmtUploadDate(videoDetails.uploadDate)}</span>
        </div>

        <div className="views" title={`${videoDetails.viewCount} view`}>
          <FontAwesomeIcon icon={faEye} />
          <span>{frmtViews(videoDetails.viewCount)} view</span>
        </div>

        {!videoDetails.isLive && (
          <div className="duration" title="Duration">
            <FontAwesomeIcon icon={faClock} />
            <span>{durationText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default YoutubeVideoInfo;
