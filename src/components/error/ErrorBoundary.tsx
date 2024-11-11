import "./errorBoundary.css";
import { Link, useRouteError } from "react-router-dom";
import { useRef } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BackToTopBtn from "../popup/BackToTopBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FontIcon from "../decoration/FontIcon";
import {
  faArrowLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const ErrorBoundary = () => {
  const error = useRouteError() as { message: string };
  const windowEle = useRef<Window>(window);

  return (
    <>
      <Header />
      <main>
        <div className="error-boundary">
          <i className="fi fi-sr-times-hexagon icon"></i>

          <div className="error">
            <FontIcon icon={faCircleExclamation} />
            <h2>Whoops, something went wrong</h2>
          </div>

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
          {error?.message && (
            <div className="err-info">
              <span>Error Messgae</span>
              <span>{error.message}</span>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTopBtn targetEle={windowEle} id="backToTopBtn" />
    </>
  );
};

export default ErrorBoundary;
