import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { Box } from "@chakra-ui/react";

import Loader from "../Components/Spinner/Spinner";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import {
  CategoryIsError,
  CategoryIsLoading,
  GetCategory,
} from "../redux/Slices/Category.Slice";

function HomePage() {
  const dispatch = useDispatch();
  const categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });
  // console.log(categoryStore);

  const { CategoryData, isError, isLoading } = categoryStore;
  // console.log(CategoryData, isError, isLoading);

  useEffect(() => {
    (async () => {
      dispatch(CategoryIsLoading());
      try {
        await axios
          .get("http://192.168.1.21:8000/api/categories/getCategories")
          .then((response) => {
            // console.log(response);
            dispatch(GetCategory(response.data.category));
          });
      } catch (error) {
        console.log(error);
        dispatch(CategoryIsError(error));
      }
    })();
  }, []);

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
