import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CategoryCard({ image, name, id }) {
  return (
    <Link to={`category_id/${id}`}>
      <Box m={"auto"} justifyContent={"center"}>
        <Image
          src={image}
          alt="img"
          // w={50}
          h={150}
          m="auto"
          mt={15}
          border={"1px solid wheat"}
          borderRadius={150}
          w={150}
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
          }}
        />
        <Text
          fontSize={18}
          fontWeight={"bold"}
          mt={4}
          textAlign={"center"}
          color="#273746">
          {name}
        </Text>
      </Box>
    </Link>
  );
}

export default CategoryCard;
