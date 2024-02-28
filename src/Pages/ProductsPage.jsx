import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";
import UserProductCard from "../Components/UserProductCard/UserProductCard";
import Loader from "../Components/Spinner/Spinner";

function ProductsPage() {
  const [filteredData, setfilteredData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const cateId = id;

  const storeData = useSelector((data) => {
    return data.userProductSlice;
  });

  const { ProductData, isLoading, isError } = storeData;
  // console.log(ProductData);

  useEffect(() => {
    const newData = ProductData?.filter((ele) => {
      // console.log(ele.category);
      // if (ele.category_id == cateId) {
      //   return ele;
      // }
      if (ele.category.includes(cateId, 0)) {
        // console.log(ele.category);
        return ele;
      }
    });
    setfilteredData(newData);
  }, [ProductData]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box
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
