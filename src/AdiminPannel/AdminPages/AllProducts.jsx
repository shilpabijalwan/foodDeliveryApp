import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProducts,
  ProductILoading,
  ProductIsError,
} from "../../redux/Slices/Product.slice";
import { Box } from "@chakra-ui/react";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../Components/Spinner/Spinner";
import { fetchAdminProducts } from "../../Services/ProductServices";

function AllProducts() {
  const dispatch = useDispatch();
  const storeProduct = useSelector((data) => {
    return data.ProductSlice;
  });
  const { ProductData, isLoading, isError } = storeProduct;

  useEffect(() => {
    dispatch(ProductILoading());
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Box w={"90%"} m={"auto"} mt={30}>
      {/* All Products */}
      <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={10}>
        {ProductData?.map((ele) => (
          <ProductCard {...ele} key={ele.id} />
        ))}
      </Box>
    </Box>
  );
}

export default AllProducts;
