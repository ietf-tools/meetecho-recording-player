import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionConfiguration: {},
};

export const sessionSlice = createSlice({
  name: "sessionData",
  initialState,
  reducers: {
    updateSessionConfiguration: (state, action) => {
      state.sessionConfiguration = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSessionConfiguration } = sessionSlice.actions;

export default sessionSlice.reducer;
