import "./youtubeVideoSchema.css";
import type { yt } from "../../../../../public/types/youtube-types";
import VideoDownloads from "./VideoDownloads";
import YoutubeVideoInfo from "./YoutubeVideoInfo";
import DownloadControls from "../DownloadControls";
import YoutubeUserChoiceContext from "../YoutubeUserChoiceContext";

interface YoutubeVideoSchemaProps {
  data: yt.Search.VideoInfo;
}

const YoutubeVideoSchema = ({ data }: YoutubeVideoSchemaProps) => {
  const { videoFormats, audioFormats, videoDetails } = data;

  return (
    <YoutubeUserChoiceContext>
      <div className="youtube-video-schema">
        <YoutubeVideoInfo videoDetails={videoDetails} />

        {videoDetails.isLive ? (
          <a href={videoDetails.video_url} target="_blank">
            <i
              className="fi fi-sr-live-alt live-indicator"
              style={{ fontSize: 50 }}
            ></i>
          </a>
        ) : (
          <>
            <DownloadControls
              downloadRequestInfo={
                {
                  videoDetails,
                } satisfies yt.Download.VideoDownloadRequestInfo
              }
              provider="youtube-video"
            />
            <VideoDownloads
              videoFormats={videoFormats}
              audioFormats={audioFormats}
            />
          </>
        )}
      </div>
    </YoutubeUserChoiceContext>
  );
};

export default YoutubeVideoSchema;
