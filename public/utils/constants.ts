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
