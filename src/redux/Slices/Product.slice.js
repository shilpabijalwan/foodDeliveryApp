import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ProductData: [],
  isError: null,
  isLoading: false,
};
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    GetProducts: (state, action) => {
      state.isLoading = false;
      state.ProductData = action.payload;
    },
    ProductILoading: (state, action) => {
      state.isLoading = true;
    },
    ProductIsError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const { GetProducts, ProductILoading, ProductIsError } =
  ProductSlice.actions;
