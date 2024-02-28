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

export const SortProductId = async (ids, id) => {
  // console.log(ids);
  store.dispatch(ProductIsLoading());
  try {
    await apiAxios
      .post("products/sortProducts", { products: ids, category_id: id })
      .then((response) => {
        // console.log(response);
        fetchAdminProducts();
      });
  } catch (error) {
    // console.log(error);
    // store.dispatch(ProductIsError(error));
  }
};
