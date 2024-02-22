import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import Loader from "../Components/Spinner/Spinner";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import { useEffect } from "react";
import { FetchUserCategory } from "../Services/CategoryService";

function HomePage() {
  const categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });
  // console.log(categoryStore);
  const { CategoryData, isError, isLoading } = categoryStore;
  useEffect(() => {
    FetchUserCategory();
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
