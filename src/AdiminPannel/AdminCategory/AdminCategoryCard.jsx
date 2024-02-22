import React, { useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  List,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FetchUserCategory } from "../../Services/CategoryService";
import { apiAxios } from "../../axiosApi";
import { useSelector } from "react-redux";

function AdminCategoryCard({
  image,
  name,
  id,
  Draggableprop,
  ref,
  index,
  draggableHandleProp,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  let categoryStore = useSelector((data) => {
    return data.CategorySlice;
  });

  const { CategoryData, isLoading } = categoryStore;

  const handleDelete = async (id) => {
    onClose();
    try {
      await apiAxios.delete(`categories/delete/${id}`).then((response) => {
        response &&
          toast({
            title: "Category deleted",
            status: "success",
            duration: 4000,
          });
      });
      FetchUserCategory();
    } catch (error) {
      console.log(error);
    }
  };
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
                borderRadius={150}
                w={120}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
                }}
              />
              <Text
                w={"60%"}
                fontSize={26}
                fontWeight={"bold"}
                mt={14}
                color="#273746">
                {name}
              </Text>
              <Button mt={16} colorScheme="green" variant="outline">
                Edit
              </Button>
              <Button
                mt={16}
                colorScheme="red"
                variant="outline"
                onClick={onOpen}>
                Delete
              </Button>
            </ListItem>
          </Box>
        )}
      </Draggable>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AdminCategoryCard;
