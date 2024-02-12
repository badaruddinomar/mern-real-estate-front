import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
  successMessage: null,
};

export const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    errorMessageAction: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessageAction: (state) => {
      state.errorMessage = null;
    },
    successMessageAction: (state, action) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessageAction: (state) => {
      state.successMessage = null;
    },
  },
});
export const {
  errorMessageAction,
  clearErrorMessageAction,
  successMessageAction,
  clearSuccessMessageAction,
} = messageReducer.actions;
export default messageReducer.reducer;
