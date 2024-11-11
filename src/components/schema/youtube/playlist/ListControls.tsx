import "./listControls.css";
import { useContext, useEffect, useRef } from "react";
import {
  defaultChoice,
  ListDownloadRequestInfoContext,
  UserChoiceContext,
} from "../../../../routes/youtube/utils/contexts";

const ListControls = () => {
  const selectAllEle = useRef<HTMLInputElement>(null);
  const selectQualityEle = useRef<HTMLSelectElement>(null);
  const { userChoice, setUserChoice } = useContext(UserChoiceContext)!;
  const listDownloadRequestInfoContext = useContext(
    ListDownloadRequestInfoContext
  )!;

  if (import.meta.env.DEV) {
    console.log(listDownloadRequestInfoContext.data); // log the info
  }

  // select the quality option at initial render & at userChoice change
  useEffect(() => {
    const ele = selectQualityEle.current!.querySelector(
      `option[value="${userChoice.choice}"]`
    ) as HTMLOptionElement;

    if (ele !== null) {
      ele.selected = true;
    } else {
      setUserChoice(defaultChoice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChoice]);

  // select all by default
  useEffect(() => {
    selectAllEle.current!.checked = true;
  }, []);

  return (
    <div className="list-controls">
      <span className="select-all">
        <input
          type="checkbox"
          name="selectAll"
          ref={selectAllEle}
          onClick={() => {
            const checked = selectAllEle.current!.checked;
            if (checked) {
              const allList = new Array(
                listDownloadRequestInfoContext.data.total
              ).keys();
              listDownloadRequestInfoContext.updateList(new Set(allList));
            } else {
              listDownloadRequestInfoContext.updateList(new Set());
            }
          }}
        />
        Select all
      </span>

      <div className="quality-selector">
        <select
          ref={selectQualityEle}
          name="qualitySelect"
          onChange={(e) => {
            setUserChoice({
              isVideo:
                e.currentTarget.selectedOptions[0].dataset.video === "true",
              choice: +e.currentTarget.value,
            });
          }}
        >
          {/* video */}
          <optgroup label="Video">
            {[1440, 1080, 720, 480, 360, 240, 144].map((Q) => (
              <option
                key={Q}
                value={Q}
                label={Q + "p"}
                data-video={true}
              ></option>
            ))}
          </optgroup>

          {/* audio */}
          <optgroup label="Sound">
            {[160, 128, 64, 48].map((Q) => (
              <option
                key={Q}
                value={Q}
                label={Q + "k"}
                data-video={false}
              ></option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default ListControls;
