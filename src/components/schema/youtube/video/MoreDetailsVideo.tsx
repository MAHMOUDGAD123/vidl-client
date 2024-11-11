import { ytdl } from "../../../../../public/types/youtube-types";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  controlBodyScroll,
  getFileSize,
  getQualityLabel,
} from "../../../../routes/youtube/utils/helpers";

interface VideoMoreDetailsProps {
  format: ytdl.videoFormat;
  onClickAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoMoreDetails = ({ format, onClickAction }: VideoMoreDetailsProps) => {
  // stop scrolling on mount
  controlBodyScroll("100%", "hidden");

  return (
    <div
      className="option-more-details"
      onClick={(e) => {
        const ele = e.target;
        if (
          ele === e.currentTarget ||
          ele === e.currentTarget.querySelector(".close")
        ) {
          // allow scrolling
          controlBodyScroll("unset", "visible");
          // unmount
          onClickAction(false);
        }
      }}
    >
      <span className="close">Click any where to close</span>

      <div className="info">
        <div className="top">
          <span className="label">{format.container}</span>

          <span className="label">{getQualityLabel(format.qualityLabel!)}</span>

          {format.qualityLabel.includes("HDR") && (
            <span className="label">HDR</span>
          )}
        </div>

        <table>
          <tbody>
            <tr>
              <td>Bitrate</td>
              <td>{`${(format.bitrate! / 1024) >>> 0} kbps`}</td>
            </tr>

            <tr>
              <td>Resolution</td>
              <td>{`${format.width} x ${format.height}`}</td>
            </tr>

            <tr>
              <td>Quality</td>
              <td>{format.quality}</td>
            </tr>

            <tr>
              <td>FPS</td>
              <td>{format.fps}</td>
            </tr>

            <tr>
              <td>Size</td>
              <td>
                {format.isLive ? "---" : getFileSize(format.contentLength)}
              </td>
            </tr>

            <tr>
              <td>Codec</td>
              <td>{format.codecs.split(".")[0]}</td>
            </tr>

            <tr>
              <td>
                <span>Video-Only</span>
              </td>

              <td style={{ textAlign: "center" }}>
                <a
                  href={format.url}
                  target="_blank"
                  className="only-link"
                  title="no sound video link"
                >
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoMoreDetails;
