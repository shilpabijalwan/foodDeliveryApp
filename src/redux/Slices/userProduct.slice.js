import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProductData: [],
  isError: null,
  isLoading: false,
};
const userProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    GetProducts: (state, action) => {
      state.isLoading = false;
      state.ProductData = action.payload;
    },
    ProductIsLoading: (state, action) => {
      state.isLoading = true;
    },
    ProductIsError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default userProductSlice.reducer;
export const { GetProducts, ProductIsLoading, ProductIsError } =
  userProductSlice.actions;
