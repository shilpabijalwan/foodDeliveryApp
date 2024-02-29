import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cartproduct: [],
};

const CartProductSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    GetCartProducts: (state, action) => {
      // console.log(action.payload.id);
      const existingItem = state.Cartproduct.find(
        (ele) => ele.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.Cartproduct.unshift({ ...action.payload, quantity: 1 });
      }
    },
    QuantityIncrease: (state, action) => {
      const item = state.Cartproduct.find((ele) => ele.id === action.payload);
      item.quantity++;
    },
    QuantityDecrease: (state, action) => {
      const item = state.Cartproduct.find((ele) => ele.id === action.payload);
      if (item.quantity == 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    RemoveCartItem: (state, action) => {
      const Removeitem = state.Cartproduct.filter(
        (ele) => ele.id != action.payload
      );
      state.Cartproduct = Removeitem;
    },
    resetCart: (state, action) => {
      state.Cartproduct = null;
    },
  },
});

export default CartProductSlice.reducer;
export const {
  GetCartProducts,
  QuantityIncrease,
  QuantityDecrease,
  setProductQuantity,
  RemoveCartItem,
  resetCart,
} = CartProductSlice.actions;
