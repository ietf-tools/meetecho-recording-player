import { createSlice } from "@reduxjs/toolkit";

// Function to check if the Dark Mode should be enabled based on the time of the day
let darkModeFlag = "";

function setDefaultThemeBasedOnTheHourOfTheDay() {
  var d = new Date();
  // The getHours() method returns the hour (from 0 to 23) of the specified date and time.
  var currentHour = d.getHours();

  // The dark theme load early morning and night, The light theme load morning and evening
  darkModeFlag = currentHour >= 19 || currentHour <= 6 ? true : false;
}

setDefaultThemeBasedOnTheHourOfTheDay();

// Initial State
const initialState = {
  isDarkThemeEnabled: darkModeFlag,
};

export const sessionUISlice = createSlice({
  name: "sessionUI",
  initialState,
  reducers: {
    // Theme
    toggleTheme: (state) => {
      state.isDarkThemeEnabled = !state.isDarkThemeEnabled;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = sessionUISlice.actions;

export default sessionUISlice.reducer;
