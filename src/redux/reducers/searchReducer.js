import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  loading: false,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchTerm = action.payload;
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setSearchData, setLoadingState } = searchReducer.actions;
export default searchReducer.reducer;
