import "./playlistProgress.css";

interface PlaylistProgressProps {
  total: number;
  downloaded: number;
}

const PlaylistProgress = ({ total, downloaded }: PlaylistProgressProps) => {
  return (
    <div className={`playlist-progress`}>{`${downloaded} / ${total}`}</div>
  );
};

export default PlaylistProgress;
