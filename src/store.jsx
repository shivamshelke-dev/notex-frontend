import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./redux/noteSlice";
import authReducer from "./redux/authSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    auth: authReducer,
  },
});
