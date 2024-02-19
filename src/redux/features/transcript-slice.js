import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transcripts: undefined,
  isTranscriptLoading: false,
  isTranscriptError: false,
};

export const transcriptSlice = createSlice({
  name: "transcriptData",
  initialState,
  reducers: {
    updateTranscriptData: (state, action) => {
      state.transcripts = action.payload;
    },
    updateTranscriptLoading: (state, action) => {
      state.isTranscriptLoading = action.payload;
    },
    updateTranscriptError: (state, action) => {
      state.isTranscriptError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateTranscriptData,
  updateTranscriptLoading,
  updateTranscriptError,
} = transcriptSlice.actions;

export default transcriptSlice.reducer;
