import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Loader from "../Components/Spinner/Spinner";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import { FetchUserCategory } from "../Services/CategoryService";
import { BASE_URL } from "../../../ipData";
import axios from "axios";

function HomePage() {
  const categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });
  // console.log(categoryStore);

  const { CategoryData, isError, isLoading } = categoryStore;
  // console.log(CategoryData, isError, isLoading);\

  const authStore = useSelector((data) => {
    return data.AuthSlice;
  });
  const token = JSON.parse(localStorage.getItem("token")) || null;

  const fetchUser = async () => {
    try {
      axios
        .get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          localStorage.setItem("userDetails", JSON.stringify(response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUserCategory();
    fetchUser();
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
