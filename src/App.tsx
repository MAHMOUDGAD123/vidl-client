import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import YoutubePage from "./routes/youtube/YoutubePage";
import FacebookPage from "./routes/facebook/FacebookPage";
import XPage from "./routes/x/XPage";
import InstagramPage from "./routes/instagram/InstagramPage";
import TiktokPage from "./routes/tiktok/TiktokPage";
import HomePage from "./routes/HomePage";
import ErrorBoundary from "./components/error/ErrorBoundary";
import NotFound404 from "./components/error/NotFound404";
import { youtubeSearchAction } from "./routes/youtube/utils/actions";
import SearchResultRouter from "./components/schema/SearchResultRouter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      <Route path="/" index element={<HomePage />} />
      <Route
        path="/youtube"
        element={<YoutubePage />}
        action={youtubeSearchAction}
      >
        <Route path="search_result" element={<SearchResultRouter />} />
      </Route>
      <Route path="/facebook" element={<FacebookPage />} />
      <Route path="/x" element={<XPage />} />
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/tiktok" element={<TiktokPage />} />
      <Route path="*" element={<NotFound404 />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
