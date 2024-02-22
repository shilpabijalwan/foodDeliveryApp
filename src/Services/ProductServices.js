import { apiAxios } from "../axiosApi";
import { ProductIsError } from "../redux/Slices/Product.slice";
import {
  GetProducts,
  ProductIsLoading,
} from "../redux/Slices/userProduct.slice";
import { store } from "../redux/store";

export const fetchAdminProducts = async () => {
  store.dispatch(ProductIsLoading());
  try {
    let result = await apiAxios.get("/products/getProducts");
    store.dispatch(GetProducts(result.data.product));
  } catch (error) {
    store.dispatch(ProductIsError(error));
  }
};
