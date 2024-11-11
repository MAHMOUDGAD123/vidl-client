/* eslint-disable @typescript-eslint/no-explicit-any */

// ------------------ Schema Start ------------------
export type SchemaType = ({ data }: any) => JSX.Element;

export type SchemaId = "yt-vid" | "yt-list";

export type LocationState = {
  schemaId: SchemaId;
  data: any;
};
// ------------------- Schema End -------------------

export type ProviderType =
  | "youtube-video"
  | "youtube-list"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "x";
