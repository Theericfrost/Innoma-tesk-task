import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "store/types";

const STORE_KEY = "snackBar";

export interface SnackBarState {
  loading: LoadingStatus;
  open: boolean;
  message: string;
}

const initialState: SnackBarState = {
  loading: LoadingStatus.NOT_LOADED,
  open: false,
  message: "",
};

export const snackBarSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message;
      state.open = true;
    },
    close: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

const selectSlice = (state: { [STORE_KEY]: SnackBarState }) => state[STORE_KEY];

export const selectors = {
  snackBarMessage: createSelector(selectSlice, (state) => state.message),
  snackBarOpen: createSelector(selectSlice, (state) => {
    return state.open;
  }),
};
