import axios from "axios";
import type { yt } from "../../../../public/types/youtube-types";

interface YoutubeSearchActionProps {
  request: Request;
}

export const youtubeSearchAction = async ({
  request,
}: YoutubeSearchActionProps): Promise<yt.Search.SearchActionReturn> => {
  const formData = await request.formData();
  const { searchUrl } = Object.fromEntries(formData) as yt.Search.FormData;

  if (!searchUrl.length) {
    return { error: true, errMsg: "Please, enter a youtube url" };
  }

  const apiUrl = `http://localhost:3000/api/youtube/smart-search`;

  // if the server fail with (500) <ErrorBoundary> will be activated
  const response = await axios.post<yt.Search.SearchServerResponse>(
    apiUrl,
    { searchUrl },
    {
      responseType: "json",
    }
  );

  if (response.data.type === "none") {
    return { error: true, errMsg: response.data.errMsg };
  }

  const { type, info } = response.data;
  return { error: false, type, data: info };
};
