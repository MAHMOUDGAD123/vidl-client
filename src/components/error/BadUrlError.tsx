import "./badUrlError.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface badUrlErrorProps {
  errMsg: string;
}

const BadUrlError = ({ errMsg }: badUrlErrorProps) => {
  return (
    <div className="bad-url-error">
      <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
      <p>{errMsg}</p>
    </div>
  );
};

export default BadUrlError;
