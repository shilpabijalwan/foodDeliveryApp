import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Loader from "../Components/Spinner/Spinner";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import { useEffect, useState } from "react";
import { FetchUserCategory } from "../Services/CategoryService";

function HomePage() {
  // let newcate;

  const categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });
  // console.log(categoryStore);
  const productStore = useSelector((data) => {
    return data.ProductSlice.ProductData;
  });
  // console.log(productStore);
  const { CategoryData, isError, isLoading } = categoryStore;

  return isLoading ? (
    <Loader />
  ) : (
    <Box
      display={"grid"}
      gridTemplateColumns="repeat(5,1fr)"
      gap={10}
      w={"80%"}
      m={"auto"}
      my={10}>
      {CategoryData?.map((ele) => (
        <CategoryCard {...ele} key={ele.id} />
      ))}
    </Box>
  );
}

export default HomePage;
