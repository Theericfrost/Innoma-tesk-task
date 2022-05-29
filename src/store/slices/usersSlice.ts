import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, User } from "store/types";
import { getUsersFromFirebase } from "db";

const STORE_KEY = "users";

export const actionCreators = {
  fetchUsers: createAsyncThunk(`${STORE_KEY}/fetchUsers`, getUsersFromFirebase),
};

export interface UsersState {
  loading: LoadingStatus;
  data: User[];
}

const initialState: UsersState = {
  loading: LoadingStatus.NOT_LOADED,
  data: [],
};

export const usersSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionCreators.fetchUsers.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(actionCreators.fetchUsers.fulfilled, (state, action) => {
      state.loading = LoadingStatus.LOADED;
      state.data = action.payload;
    });
    builder.addCase(actionCreators.fetchUsers.rejected, (state) => {
      state.loading = LoadingStatus.ERROR;
    });
  },
});

const selectSlice = (state: { [STORE_KEY]: UsersState }) => state[STORE_KEY];

export const selectors = {
  users: createSelector(selectSlice, (state) => state.data),
  usersLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADED
  ),
  usersLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADING
  ),
  usersLoadingFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.ERROR
  ),
};
