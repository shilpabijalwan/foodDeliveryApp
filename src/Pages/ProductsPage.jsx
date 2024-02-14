import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  GetProducts,
  ProductIsLoading,
  ProductIsError,
} from "../redux/Slices/userProduct.slice";

import { useParams } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";
import UserProductCard from "../Components/UserProductCard/UserProductCard";
import Loader from "../Components/Spinner/Spinner";

function ProductsPage() {
  const [filteredData, setfilteredData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const cateId = id;
  // console.log(cateId);

  const storeData = useSelector((data) => {
    return data.userProductSlice;
  });

  const { ProductData, isLoading, isError } = storeData;
  // console.log(ProductData);

  useEffect(() => {
    dispatch(ProductIsLoading());
    (async () => {
      try {
        await axios
          .get("http://192.168.1.21:8000/api/products/getProducts")
          .then((res) => {
            // console.log(res.data.product);
            dispatch(GetProducts(res.data.product));
          });
      } catch (error) {
        dispatch(ProductIsError(error));
      }
    })();
  }, []);

  useEffect(() => {
    const newData = ProductData?.filter((ele) => {
      // console.log(ele.category_id);
      if (ele.category_id == cateId) {
        return ele;
      }
    });
    setfilteredData(newData);
    // console.log(newData);
  }, [filteredData]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box
      border={"1px solid green"}
      display={"grid"}
      gridTemplateColumns="repeat(4,1fr)"
      w={"85%"}
      m={"auto"}
      gap={10}
      my={10}>
      {filteredData?.map((ele) => (
        <Box key={ele.id}>
          <UserProductCard {...ele} />
        </Box>
      ))}
    </Box>
  );
}

export default ProductsPage;
