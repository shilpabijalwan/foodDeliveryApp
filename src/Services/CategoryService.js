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
      // console.log(response);
      store.dispatch(GetCategory(response.data.category));
    });
  } catch (error) {
    console.log(error);
    store.dispatch(CategoryIsError(error));
  }
};
