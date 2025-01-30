import {
  faFacebook,
  faInstagram,
  faSquareXTwitter,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const linkIcons = [
  { name: "youtube", icon: faYoutube },
  { name: "facebook", icon: faFacebook },
  { name: "x", icon: faSquareXTwitter },
  { name: "instagram", icon: faInstagram },
  { name: "tiktok", icon: faTiktok },
];

/**
 * @info max svg (stroke-dash-offset) attribute value
 * @info 0 -> progress (100%)
 * @info 144 -> progress (0%)
 */
export const $progressMax = 144;

/** used with download handlers */
export const statusCode_errorMsg = new Map([
  [201, "invalid video url"],
  [202, "session folder doesn't exists"],
  [203, "failed to read session info"],
  [204, "failed to save session info"],
  [205, "failed to download files"],
  [206, "faild to open a download session"],
]);
