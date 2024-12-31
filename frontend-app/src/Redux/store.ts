import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice"; // Existing slice
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Existing reducer
    auth: authReducer, // New auth reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
