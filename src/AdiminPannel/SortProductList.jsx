import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SortProductId, fetchAdminProducts } from "../Services/ProductServices";
import { FetchUserCategory } from "../Services/CategoryService";
import { Box, List, Text } from "@chakra-ui/react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SortProductListCard from "./SortProductListCard";

function SortProductList() {
  const { id } = useParams();

  const [filterCategory, setfilterCategory] = useState(null);
  const [newProductData, setnewProductData] = useState(null);
  const [finalData, setFinalData] = useState(null);

  const storeData = useSelector((data) => {
    return data.userProductSlice;
  });
  const { ProductData, isLoading, isError } = storeData;

  const storeCategoryData = useSelector((data) => {
    return data.CategorySlice;
  });
  const { CategoryData } = storeCategoryData;

  useEffect(() => {
    FetchUserCategory();
    fetchAdminProducts();
  }, []);

  useEffect(() => {
    const data = CategoryData?.find((ele) => ele.id == id);
    setfilterCategory(data);

    const Myproducts = ProductData?.filter((ele) =>
      filterCategory?.products.includes(ele.id.toString())
    );

    setnewProductData(Myproducts);
  }, [CategoryData, ProductData]);

  useEffect(() => {
    setFinalData(newProductData);
  }, [newProductData]);

  const HandledragProducts = (data) => {
    // console.log(data);
    const src = data.source.index;
    const destination = data.destination.index;

    let temp = [...finalData];
    let [splicedata] = temp.splice(src, 1);
    // console.log(splicedata);
    temp.splice(destination, 0, splicedata);
    setFinalData(temp);

    const productid = finalData?.map((ele) => ele.id);
    // console.log(productid);
    SortProductId(productid, id);
  };

  return (
    <>
      <DragDropContext onDragEnd={(data) => HandledragProducts(data)}>
        {finalData && (
          <Droppable droppableId="drop-1">
            {(provided) => (
              <List spacing={8}>
                <Text
                  textAlign={"center"}
                  my={10}
                  fontSize={26}
                  fontWeight={"bold"}
                  color={"#00755e "}>
                  category / {filterCategory?.name}
                </Text>
                <Box
                  w={"80%"}
                  m={"auto"}
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {finalData?.map((ele, i) => (
                    <SortProductListCard {...ele} index={i} key={ele.id} />
                  ))}
                </Box>
              </List>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </>
  );
}

export default SortProductList;
