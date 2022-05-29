import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, Nullable, User } from "store/types";
import { getUserFromFirebase } from "db";

const STORE_KEY = "user";

export const actionCreators = {
  fetchUser: createAsyncThunk<any, string>(
    `${STORE_KEY}/fetchUser`,
    async (id) => {
      return await getUserFromFirebase(id);
    }
  ),
};

export interface UserState {
  loading: LoadingStatus;
  data: Nullable<User>;
}

const initialState: UserState = {
  loading: LoadingStatus.NOT_LOADED,
  data: null,
};

export const userSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionCreators.fetchUser.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(actionCreators.fetchUser.fulfilled, (state, action) => {
      state.loading = LoadingStatus.LOADED;
      state.data = action.payload;
    });
    builder.addCase(actionCreators.fetchUser.rejected, (state) => {
      state.loading = LoadingStatus.ERROR;
    });
  },
});

const selectSlice = (state: { [STORE_KEY]: UserState }) => state[STORE_KEY];

export const selectors = {
  currentUser: createSelector(selectSlice, (state) => state.data),
  currentUserLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADED
  ),
  currentUserLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADING
  ),
  currentUserLoadingFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.ERROR
  ),
};
