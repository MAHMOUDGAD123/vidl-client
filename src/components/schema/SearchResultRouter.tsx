import "./searchResultRouter.css";
import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { LocationState, SchemaId, SchemaType } from "@_types/globals";
// schemas
import YoutubeVideoSchema from "./youtube/video/YoutubeVideoSchema";
import YoutubeListSchema from "./youtube/playlist/YoutubeListSchema";

const schemaMap = new Map<SchemaId, unknown>([
  ["yt-vid", YoutubeVideoSchema],
  ["yt-list", YoutubeListSchema],
]);

const SearchResult = () => {
  const location = useLocation();
  const resultEle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      resultEle.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }, []);

  return location.state !== null ? (
    <div className="search-result-router" ref={resultEle}>
      {(() => {
        const { schemaId, data } = location.state as LocationState;
        const Schema = schemaMap.get(schemaId) as SchemaType;
        return <Schema data={data} />;
      })()}
    </div>
  ) : (
    <Navigate to=".." replace={true} />
  );
};

export default SearchResult;
