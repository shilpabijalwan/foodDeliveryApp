import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Auth.slice";
import ProductSlice from "./Slices/Product.slice";
import CategorySlice from "./Slices/Category.Slice";
import AdminCategorySlice from "./Slices/AdminCategory.slice";
import userProductSlice from "./Slices/userProduct.slice";
const rootReducer = combineReducers({
  AuthSlice,
  ProductSlice,
  CategorySlice,
  AdminCategorySlice,
  userProductSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
