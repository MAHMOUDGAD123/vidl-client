import { createContext } from "react";
import type { yt } from "../../../../public/types/youtube-types";

// ===============================================================

export interface ListConfigurationContextType {
  updateList: (newList: Set<number>) => void;
  data: yt.Download.ListConfiguration;
}

export const ListDownloadRequestInfoContext =
  createContext<ListConfigurationContextType | null>(null);

// ===============================================================

export interface UserChoice {
  isVideo: boolean;
  choice: number;
}

export const defaultChoice: UserChoice = {
  isVideo: true,
  choice: 144,
};

export interface UserChoiceContextType {
  userChoice: UserChoice;
  setUserChoice: React.Dispatch<React.SetStateAction<UserChoice>>;
}

export const UserChoiceContext = createContext<UserChoiceContextType | null>(
  null
);

// ===============================================================

export type ListLogScreenItemState = "loading" | "done" | "failed" | "none";

export type ListLogScreenStateType = {
  state: ListLogScreenItemState;
  videoIndex: number;
};

export type ListDownloadFilesProgress = {
  downloaded: number;
  show: boolean;
  listlogScreenState: ListLogScreenStateType[];
};

export interface ProgressDownloadedFilesContextType {
  listDownloadFilesProgress: ListDownloadFilesProgress;
  updateListDownloadFilesProgress: React.Dispatch<
    React.SetStateAction<ListDownloadFilesProgress>
  >;
}

export const ProgressDownloadedFilesContext =
  createContext<ProgressDownloadedFilesContextType | null>(null);

// ===============================================================
