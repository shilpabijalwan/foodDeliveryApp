import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProducts,
  ProductILoading,
  ProductIsError,
} from "../../redux/Slices/Product.slice";
import { Box } from "@chakra-ui/react";
import ProductCard from "../ProductCard/ProductCard";

function AllProducts() {
  const dispatch = useDispatch();
  const storeProduct = useSelector((data) => {
    return data.ProductSlice;
  });
  const { ProductData, isLoading, isError } = storeProduct;
  // console.log(storeProduct);
  // console.log(ProductData, isLoading, isError);

  useEffect(() => {
    dispatch(ProductILoading());
    (async () => {
      try {
        await axios
          .get("http://192.168.1.21:8000/api/products/getProducts")
          .then((res) => {
            console.log(res.data.product);
            dispatch(GetProducts(res.data.product));
          });
      } catch (error) {
        dispatch(ProductIsError(error));
      }
    })();
  }, []);

  return (
    <Box w={"80%"} m={"auto"} mt={30}>
      {/* All Products */}
      <Box display={"grid"} gridTemplateColumns="repeat(3, 1fr)" gap={20}>
        {ProductData?.map((ele) => (
          <ProductCard {...ele} key={ele.id} />
        ))}
      </Box>
    </Box>
  );
}

export default AllProducts;
