import { ytdl } from "../../../../../public/types/youtube-types";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  controlBodyScroll,
  getFileSize,
} from "../../../../routes/youtube/utils/helpers";

interface VideoMoreDetailsProps {
  format: ytdl.videoFormat;
  onClickAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioMoreDetails = ({ format, onClickAction }: VideoMoreDetailsProps) => {
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

          <span className="label">{format.audioBitrate}K</span>
        </div>

        <table>
          <tbody>
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
              <td>Audio Chennels</td>
              <td>{format.audioChannels}</td>
            </tr>

            <tr>
              <td>
                <span>Sound-Only</span>
              </td>

              <td style={{ textAlign: "center" }}>
                <a
                  href={format.url}
                  target="_blank"
                  className="only-link"
                  title="sound link"
                >
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AudioMoreDetails;
