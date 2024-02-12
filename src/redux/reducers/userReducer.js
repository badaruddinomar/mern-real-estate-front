import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInRequestAction: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    signInSuccessAction: (state, action) => {
      state.loading = false;
      (state.isAuthenticated = true), (state.user = action.payload);
    },
    signInFailAction: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { signInRequestAction, signInFailAction, signInSuccessAction } =
  userReducer.actions;
export default userReducer.reducer;
