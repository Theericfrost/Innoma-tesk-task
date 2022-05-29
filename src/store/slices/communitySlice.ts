import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getCommunityFromFirebase,
  addUsersToCommunity,
  deleteUserFromCommunity,
} from "db/index";
import { LoadingStatus, User } from "store/types";

const STORE_KEY = "community";

export const actionCreators = {
  fetchCommunities: createAsyncThunk(
    `${STORE_KEY}/fetchCommunity`,
    getCommunityFromFirebase
  ),
  setCommunities: createAsyncThunk<any, User[]>(
    `${STORE_KEY}/setCommunities`,
    async (users, { dispatch }) => {
      await addUsersToCommunity(users);
      await dispatch(actionCreators.fetchCommunities());
      await dispatch(communitySlice.actions.resetAllSelections());
    }
  ),
  deleteFromCommunity: createAsyncThunk<any, string>(
    `${STORE_KEY}/deleteFromCommunity`,
    async (id, { dispatch }) => {
      await deleteUserFromCommunity(id);
      await dispatch(actionCreators.fetchCommunities());
    }
  ),
};

export interface CommunityState {
  loading: LoadingStatus;
  data: User[];
  selections: User[];
}

const initialState: CommunityState = {
  loading: LoadingStatus.NOT_LOADED,
  data: [],
  selections: [],
};

export const communitySlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {
    collectionsToggle: (state, action: PayloadAction<User>) => {
      if (
        state.selections.find(
          (selectionUser) => selectionUser.id === action.payload.id
        )
      ) {
        state.selections = [
          ...state.selections.filter((user) => user.id !== action.payload.id),
        ];
      } else {
        state.selections = [...state.selections, action.payload];
      }
    },
    resetAllSelections: (state) => {
      state.selections = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionCreators.fetchCommunities.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(
      actionCreators.fetchCommunities.fulfilled,
      (state, action) => {
        state.loading = LoadingStatus.LOADED;
        state.data = action.payload;
      }
    );
    builder.addCase(actionCreators.fetchCommunities.rejected, (state) => {
      state.loading = LoadingStatus.ERROR;
    });
  },
});

const selectSlice = (state: { [STORE_KEY]: CommunityState }) =>
  state[STORE_KEY];

export const selectors = {
  selections: createSelector(selectSlice, (state) => state.selections),
  communities: createSelector(selectSlice, (state) => state.data),
  communitiesLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADED
  ),
  communitiesLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.LOADING
  ),
  communitiesLoadingFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatus.ERROR
  ),
};
