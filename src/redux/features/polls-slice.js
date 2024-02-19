import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polls: undefined,
  isPollsError: false,
  isPollsLoading: false,
};

export const pollsSlice = createSlice({
  name: "pollsData",
  initialState,
  reducers: {
    updatePoolsData: (state, action) => {
      state.polls = action.payload;
    },
    updatePollsError: (state, action) => {
      state.isPollsError = action.payload;
    },
    updatePollsLoading: (state, action) => {
      state.isPollsLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePoolsData, updatePollsLoading, updatePollsError } =
  pollsSlice.actions;

export default pollsSlice.reducer;
