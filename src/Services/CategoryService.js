import { apiAxios } from "../axiosApi";
import {
  CategoryIsError,
  CategoryIsLoading,
  GetCategory,
} from "../redux/Slices/Category.Slice";
import { store } from "../redux/store";

export const FetchUserCategory = async () => {
  store.dispatch(CategoryIsLoading());
  try {
    await apiAxios.get("categories/getCategories").then((response) => {
      store.dispatch(GetCategory(response.data));
    });
  } catch (error) {
    console.log(error);
    // store.dispatch(CategoryIsError(error));
  }
};

export const SortCategoryId = async (ids) => {
  // console.log(ids);
  store.dispatch(CategoryIsLoading());
  try {
    await apiAxios
      .post("categories/sortCategories", { ids: ids })
      .then((response) => {
        // console.log(response);
        FetchUserCategory();
      });
  } catch (error) {
    // console.log(error);
    store.dispatch(CategoryIsError(error));
  }
};
