import axios, { AxiosError } from "axios";
import { yt, ytdl } from "@_types/youtube-types";
import { UserChoice } from "./contexts";

/**
 * format the video duration to the form of (hours : minutes : seconds)
 * @param length video length in seconds
 */
export const frmtVideoDuration = (
  length: number
): {
  durationText: string;
  days: number;
  hrs: number;
  mins: number;
  secs: number;
} => {
  const sec_dy = 24 * 60 * 60;
  const sec_hr = 60 * 60;
  const sec_min = 60;

  const frmt = (n: number) => {
    const s = n.toString();
    return s.length < 2 ? "0" + s : s;
  };

  const days = (length / sec_dy) >>> 0;
  const hrs = ((length % sec_dy) / sec_hr) >>> 0;
  const mins = ((length % sec_hr) / sec_min) >>> 0;
  const secs = length % sec_min >>> 0;

  const durationText = `${days ? days + ":" : ""}${
    days || hrs ? frmt(hrs) + ":" : ""
  }${frmt(mins)}:${frmt(secs)}`;

  return { durationText, days, hrs, mins, secs };
};

/** get the playlist total duration to the form of (hours : minutes : seconds) */
export const getPlaylistTotalDuration = (videos: yt.Search.Video[]) => {
  return frmtVideoDuration(
    videos.reduce((total, videoDur) => total + videoDur.duration, 0) / 1000
  );
};

export const frmtUploadDate = (sinceDate: string) => {
  const since = new Date(sinceDate);
  const now = new Date();
  const diff = new Date(now.getTime() - since.getTime());

  const finalFormat = (count: number, label: string) => {
    return `${count} ${count === 1 ? label : `${label}s`} ago`;
  };

  const years = diff.getUTCFullYear() - 1970;
  if (years > 0) return finalFormat(years, "year");

  const months = diff.getUTCMonth();
  if (months > 0) return finalFormat(months, "month");

  let days = diff.getUTCDate();
  if (days > 1) {
    days -= 1; // remove the plus day
    // weeks
    if (days > 7) {
      let weeks = 0;
      while (days > 0) {
        days -= 7;
        weeks += 1;
      }
      return finalFormat(weeks, "week");
    }
    // days
    return finalFormat(days, "day");
  }

  const hours = diff.getUTCHours();
  if (hours > 0) return finalFormat(hours, "hour");

  const minutes = diff.getUTCMinutes();
  if (minutes > 0) return finalFormat(minutes, "minute");

  const seconds = diff.getUTCSeconds();
  if (seconds > 0) return finalFormat(seconds, "second");

  return "NaN";
};

/** format the views of the video or playlist (ex: 5500 -> 5.5k) */
export const frmtViews = (views: string): string => {
  const frmt = (views: string, pow: number) => {
    const n = +(+views / 10 ** pow).toFixed(1);
    /*
     * $$
     * ex: floor(1.0) === 1 => true
     * ex: floor(1.5) !== 1 => false
     */
    const $$ = Math.floor(n) === n;
    return n.toFixed(+!$$);
  };

  switch (views.length) {
    // thousand
    case 4:
    case 5:
    case 6:
      return `${frmt(views, 3)}K`;
    // million
    case 7:
    case 8:
    case 9:
      return `${frmt(views, 6)}M`;
    // billion
    case 10:
    case 11:
    case 12:
      return `${frmt(views, 9)}B`;
    // trillion 💀😱😨
    case 13:
    case 14:
    case 15:
      return `${frmt(views, 12)}T`;
    default:
      return views;
  }
};

/** stop body scrolling when more details pupup is open */
export const controlBodyScroll = (
  h: "100%" | "unset",
  ovfy: "hidden" | "visible"
) => {
  document.body.style.height = h;
  document.body.style.overflowY = ovfy;
};

export const getQuality = (qualityLabel: string) => {
  return +qualityLabel?.split("p")[0];
};

/** get the right quality dimention for comparison */
export const getQualityDimension = (format: ytdl.videoFormat): number => {
  const qualityLabel = getQuality(format.qualityLabel);

  return (
    isValidVideoQuality(qualityLabel)
      ? qualityLabel
      : isValidVideoQuality(format.height!)
      ? format.height
      : format.width
  )!;
};

export const getQualityLabel = (qualityLabel: string) => {
  return new Map<string, string>([
    ["4320", "8k"],
    ["2160", "4k"],
    ["1440", "2k"],
    ["1080", "FHD"],
    ["720", "HD"],
    ["480", "SD"],
    ["360", "LD"],
    ["240", "LLD"],
    ["144", "ULD"],
  ]).get(qualityLabel.split("p")[0]);
};

export const isValidVideoQuality = (widthOrHeight: number) => {
  return new Set([4320, 2160, 1440, 1080, 720, 480, 360, 240, 144]).has(
    widthOrHeight
  );
};

export const getFileSize = (contentLength: string) => {
  const len = +contentLength;
  const GB_Byte = 1024 * 1024 * 1024;
  const MB_Byte = 1024 * 1024;
  const KB_Byte = 1024;

  const GB = len / GB_Byte;
  const MB = (len % GB_Byte) / MB_Byte;
  const KB = (len % MB_Byte) / KB_Byte;

  return GB >>> 0
    ? GB.toFixed(2) + " gb"
    : MB >>> 0
    ? MB.toFixed(1) + " mb"
    : Math.ceil(KB) + " kb";
};

/** get userChoice data from localStorage */
export const getStoredUserChoiceData = () => {
  return JSON.parse(
    window.localStorage.getItem("_vidl_user_choice_")!
  ) as UserChoice;
};

// progress
export const startProgressInterval = (
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>,
  sessionID: string
) => {
  if (import.meta.env.DEV) {
    console.log("Progress interval start 🟩");
  }

  const intervID = setInterval(async () => {
    const apiUrl = import.meta.env.DEV
      ? "http://localhost:3000/api/youtube/progress-info"
      : "https://vidl-api.vercel.app/api/youtube/progress-info";

    try {
      const requestData = { sessionID };
      const response = await axios.post<yt.Progress.ProgressApiResponse>(
        apiUrl,
        requestData,
        {
          withCredentials: true,
          responseType: "json",
        }
      );

      const progressInfo = response.data;

      if (progressInfo.state === "error") {
        throw new AxiosError(progressInfo.msg);
      }

      progressDispatch(progressInfo);
    } catch (err) {
      clearInterval(intervID);
      progressDispatch({
        state: "error",
        msg: (err as AxiosError).message,
      });
    }
  }, 1000);

  return intervID;
};

export const stopProgressInterval = (
  progressDispatch: React.Dispatch<yt.Progress.ProgressStateAction>,
  intervalId: number
) => {
  clearInterval(intervalId);
  progressDispatch({
    state: "done",
    msg: "download is done",
  });

  if (import.meta.env.DEV) {
    console.log("Progress interval stop 🟩");
  }
};

/** to deal with non-founded quality */
export const getVideoFormat_safe = (
  formats: ytdl.videoFormat[],
  quality: yt.Download.VideoQuality
): yt.Download.VideoQuality | null => {
  const safe_map = new Map<
    yt.Download.VideoQuality,
    {
      up: yt.Download.VideoQuality[] | null;
      down: yt.Download.VideoQuality[] | null;
    }
  >([
    [4320, { up: null, down: [2160, 1440, 1080, 720, 480, 360, 240, 144] }],
    [2160, { up: [4320], down: [1440, 1080, 720, 480, 360, 240, 144] }],
    [1440, { up: [2160, 4320], down: [1080, 720, 480, 360, 240, 144] }],
    [1080, { up: [1440, 2160, 4320], down: [720, 480, 360, 240, 144] }],
    [720, { up: [1080, 1440, 2160, 4320], down: [480, 360, 240, 144] }],
    [480, { up: [720, 1080, 1440, 2160, 4320], down: [360, 240, 144] }],
    [360, { up: [480, 720, 1080, 1440, 2160, 4320], down: [240, 144] }],
    [240, { up: [360, 480, 720, 1080, 1440, 2160, 4320], down: [144] }],
    [144, { up: [240, 360, 480, 720, 1080, 1440, 2160, 4320], down: null }],
  ]);

  let formatIndex = 0;

  // [1] get the ordered quality first
  formatIndex = formats.findIndex((format) =>
    format.qualityLabel.startsWith(`${quality}`)
  );
  if (formatIndex !== -1) {
    return quality;
  }

  // if we didn't find the ordered quality (here the work starts 💀)

  // [2] go up in the (safe_map) and get the first match
  const upSearch = safe_map.get(quality)!.up;
  if (upSearch !== null) {
    for (const Q of upSearch) {
      formatIndex = formats.findIndex((format) =>
        format.qualityLabel.startsWith(`${Q}`)
      );
      if (formatIndex !== -1) {
        return Q;
      }
    }
  }

  // [3] go down in the (safe_map) and get the first match
  const downSearch = safe_map.get(quality)!.down;
  if (downSearch !== null) {
    for (const Q of downSearch) {
      formatIndex = formats.findIndex((format) =>
        format.qualityLabel.startsWith(`${Q}`)
      );
      if (formatIndex !== -1) {
        return Q;
      }
    }
  }

  return null;
};

/** to deal with non-founded quality */
export const getAudioFormat_safe = (
  formats: ytdl.videoFormat[],
  quality: yt.Download.AudioQuality
): yt.Download.AudioQuality | null => {
  const safe_map = new Map<
    yt.Download.AudioQuality,
    {
      up: yt.Download.AudioQuality[] | null;
      down: yt.Download.AudioQuality[] | null;
    }
  >([
    [160, { up: null, down: [128, 64, 48] }],
    [128, { up: [160], down: [64, 48] }],
    [64, { up: [128, 160], down: [48] }],
    [48, { up: [64, 128, 160], down: null }],
  ]);

  let formatIndex = 0;

  // [1] get the ordered quality first
  formatIndex = formats.findIndex((format) => format.audioBitrate === quality);
  if (formatIndex !== -1) {
    return quality;
  }

  // if we didn't find the ordered quality (here the work starts 💀)

  // [2] go up in the (safe_map) and get the first match
  const upSearch = safe_map.get(quality)!.up;
  if (upSearch !== null) {
    for (const Q of upSearch) {
      formatIndex = formats.findIndex((format) => format.audioBitrate === Q);
      if (formatIndex !== -1) {
        return Q;
      }
    }
  }

  // [3] go down in the (safe_map) and get the first match
  const downSearch = safe_map.get(quality)!.down;
  if (downSearch !== null) {
    for (const Q of downSearch) {
      formatIndex = formats.findIndex((format) => format.audioBitrate === Q);
      if (formatIndex !== -1) {
        return Q;
      }
    }
  }

  return null;
};
