import "./searchBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "react-router-dom";
import Spinner from "./Spinner";
import { useRef } from "react";

const SearchBox = () => {
  const navigation = useNavigation();
  const inputEle = useRef<HTMLInputElement>(null);

  return (
    <div className="search-box">
      <input
        ref={inputEle}
        type="text"
        name="searchUrl"
        id="searchInput"
        placeholder="Enter the link"
        autoComplete="true"
        autoFocus
      />
      <div
        className="clear-input"
        onClick={() => {
          const ele = inputEle.current!;
          ele.value = "";
          ele.focus();
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>

      <button id="searchBtn" disabled={navigation.state === "submitting"}>
        {navigation.state === "submitting" ? (
          <Spinner />
        ) : (
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        )}
      </button>

      <div className="hints">
        <i className="fi fi-ss-interrogation hints-icon" tabIndex={0}></i>

        <div className="info">
          <div className="hint">
            <span>Focus</span>
            <div className="keys">
              <span className="key">ALT</span>
              <span className="key">S</span>
            </div>
          </div>

          <div className="hint">
            <span>Clear</span>
            <div className="keys">
              <span className="key">ALT</span>
              <span className="key">C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
