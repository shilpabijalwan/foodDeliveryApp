import React, { useRef } from "react";
import { Box, Image, ListItem, Text, HStack } from "@chakra-ui/react";

import { Draggable } from "react-beautiful-dnd";

function SortProductListCard({
  image,
  name,
  id,
  price,

  index,
}) {
  return (
    <>
      <Draggable draggableId={`dragid ${id}`} key={id} index={index}>
        {(provided) => (
          <Box
            w={"90%"}
            m={"auto"}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <ListItem
              px={6}
              display={"flex"}
              w={"100%"}
              borderRadius={40}
              justifyContent={"space-around"}
              gap={5}
              my={10}
              style={{
                boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
              }}>
              <Image
                src={image}
                alt="img"
                h={120}
                // mt={15}
                my={5}
                border={"1px solid wheat"}
                borderRadius={15}
                w={120}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
                }}
              />
              <HStack w={"80%"} justifyContent={"space-around"}>
                <Text fontSize={26} fontWeight={"bold"} color="#273746">
                  {name}
                </Text>
                <Text fontSize={20} fontWeight={"bold"} color="#273746">
                  Rs. {price}
                </Text>
              </HStack>
            </ListItem>
          </Box>
        )}
      </Draggable>
    </>
  );
}

export default SortProductListCard;
