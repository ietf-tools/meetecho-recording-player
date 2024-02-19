import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "~/redux/features/session-slice";
import sessionUIReducer from "~/redux/features/session-ui-slice";
import pollsReducer from "~/redux/features/polls-slice";
import transcriptReducer from "~/redux/features/transcript-slice";

// Declare here all the redux store context/slice (aka features)

export const store = configureStore({
  reducer: {
    sessionData: sessionReducer,
    sessionUI: sessionUIReducer,
    pollsData: pollsReducer,
    transcriptData: transcriptReducer,
  },
});
