// import "@flaticon/flaticon-uicons/css/all/all.css";
import "./notFound404.css";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound404 = () => {
  return (
    <div className="not-found-404">
      <i className="fi fi-sr-404 icon"></i>
      <h2>Whoops, 404 page not found</h2>

      <p>Please try to refresh the page or go back to home page</p>

      <Link
        to="/"
        className="btn"
        children={
          <>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to home</span>
          </>
        }
      />
    </div>
  );
};

export default NotFound404;
