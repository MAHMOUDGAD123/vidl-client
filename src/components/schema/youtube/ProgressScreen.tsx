import "./progressScreen.css";

interface ProgressScreenProps {
  progressMsg: string;
}

const ProgressScreen = ({ progressMsg }: ProgressScreenProps) => {
  return (
    <div className="progress-screen">
      <span>{progressMsg}</span>
    </div>
  );
};

export default ProgressScreen;
