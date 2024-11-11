import "./downloads.css";
import { ytdl } from "../../../../../public/types/youtube-types";
import VideoDownloadOption from "./DownloadOption";
import { getQuality } from "../../../../routes/youtube/utils/helpers";

interface DownloadsProps {
  formats: ytdl.videoFormat[];
  label: string;
}

const Downloads = ({ formats, label }: DownloadsProps) => {
  return (
    <div className="downloads">
      <div className="title">
        {label.split(" ").map((S, i) => (
          <span key={i} className="label">
            {S}
          </span>
        ))}
      </div>

      <div className="formats">
        {formats.map((format) => {
          // magicKey 🥰😍💖💓💝💘💖
          const magicKey = format.hasVideo
            ? getQuality(format.qualityLabel)
            : format.audioBitrate;
          return <VideoDownloadOption key={magicKey} format={format} />;
        })}
      </div>
    </div>
  );
};

export default Downloads;
