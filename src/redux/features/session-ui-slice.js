import { createSlice } from "@reduxjs/toolkit";

let darkModeFlag = "";

function setDefaultThemeBasedOnTheHourOfTheDay() {
  const d = new Date();
  const currentHour = d.getHours();
  darkModeFlag = currentHour >= 19 || currentHour <= 6 ? true : false;
}

setDefaultThemeBasedOnTheHourOfTheDay();

const initialState = {
  isDarkThemeEnabled: darkModeFlag,
  selectedVideoType: undefined,
  selectedVideoSrc: undefined,
  selectedVideoStart: 0,
  playerUrl: undefined,
  videoStartTimeFromQuery: undefined,
};

function buildPlayerUrl({ type, src, start, videoStartTimeFromQuery }) {
  switch (type) {
    case 1:
      return `${src}`;
    case 2:
      return `https://www.youtube.com/watch?v=${src}&t=${
        videoStartTimeFromQuery || `${start}s`
      }`;
    case 3:
      return `https://videodelivery.net/${src}/manifest/video.m3u8`;
    default:
      console.warn(`Unknown video type: ${type}`);
      return;
  }
}

export const sessionUISlice = createSlice({
  name: "sessionUI",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      const { type, src, start = 0, videoStartTimeFromQuery } = action.payload;
      state.selectedVideoType = type;
      state.selectedVideoSrc = src;
      state.selectedVideoStart = start;
      state.videoStartTimeFromQuery = videoStartTimeFromQuery;
      state.playerUrl = buildPlayerUrl({ type, src, start, videoStartTimeFromQuery });
    },
    setVideoType: (state, action) => {
      const { type, src, start = 0 } = action.payload;
      state.selectedVideoType = type;
      state.selectedVideoSrc = src;
      state.selectedVideoStart = start;
      state.playerUrl = buildPlayerUrl({
        type,
        src,
        start,
        videoStartTimeFromQuery: state.videoStartTimeFromQuery,
      });
    },
    toggleTheme: (state) => {
      state.isDarkThemeEnabled = !state.isDarkThemeEnabled;
    },
  },
});

export const { toggleTheme, setVideo, setVideoType } =
  sessionUISlice.actions;

export default sessionUISlice.reducer;
