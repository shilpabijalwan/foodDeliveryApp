import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryData: [],
  isError: null,
  isLoading: false,
};
const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    GetCategory: (state, action) => {
      state.isLoading = false;
      state.CategoryData = action.payload;
    },
    CategoryIsLoading: (state, action) => {
      state.isLoading = true;
    },
    CategoryIsError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default CategorySlice.reducer;
export const { CategoryIsLoading, CategoryIsError, GetCategory } =
  CategorySlice.actions;
