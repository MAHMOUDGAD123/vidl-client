import {
  Navigate,
  Outlet,
  useActionData,
  useNavigation,
} from "react-router-dom";
import type { yt } from "@_types/youtube-types";
import type { LocationState } from "@_types/globals";
import InputForm from "@_components/form/InputForm";
import Page from "@_components/layout/Page";
import BadUrlError from "@_components/error/BadUrlError";

const YoutubePage = () => {
  const actionData = useActionData() as yt.Search.SearchActionReturn;
  const navigation = useNavigation();
  const error = actionData?.error;

  return (
    <Page pageTitle="Youtube Downloader">
      <InputForm />

      {error && navigation.state === "idle" ? (
        <BadUrlError errMsg={actionData.errMsg!} />
      ) : (
        actionData?.data && (
          <Navigate
            to="search_result"
            state={
              {
                schemaId: actionData.type === "video" ? "yt-vid" : "yt-list",
                data: actionData.data,
              } satisfies LocationState
            }
            replace={true}
          />
        )
      )}
      <Outlet />
    </Page>
  );
};

export default YoutubePage;
