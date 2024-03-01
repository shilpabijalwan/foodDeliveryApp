import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isError: null,
  isLoading: false,
};
const OrderSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    GetOrders: (state, action) => {
      state.isLoading = false;
      state.ProductData = action.payload;
    },
    OrderIsLoading: (state, action) => {
      state.isLoading = true;
    },
    OrderIsError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default OrderSlice.reducer;
export const { GetOrders, OrderIsLoading, OrderIsError } = OrderSlice.actions;
