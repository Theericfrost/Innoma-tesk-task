import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/usersSlice";
import { userSlice } from "./slices/userSlice";
import { communitySlice } from "./slices/communitySlice";
import { snackBarSlice } from "./slices/snackBarSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    user: userSlice.reducer,
    community: communitySlice.reducer,
    snackBar: snackBarSlice.reducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
