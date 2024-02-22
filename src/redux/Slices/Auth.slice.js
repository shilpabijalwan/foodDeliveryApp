import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  isLoading: false,
  isError: null,
};
const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.isLoading = false;

      state.userDetails = action.payload;
    },

    UserDataLoading: (state, action) => {
      state.isLoading = true;
    },
    userDataIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});
export default AuthSlice.reducer;
export const { userDataLoading, userData, userDataIsError } = AuthSlice.actions;
