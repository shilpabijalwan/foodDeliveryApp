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
  HStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { FetchUserCategory } from "../../Services/CategoryService";
import { apiAxios } from "../../axiosApi";
import { useSelector } from "react-redux";

function AdminCategoryCard({
  image,
  name,
  id,

  index,
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
  const handleEdit = (e) => {
    // console.log(e);
    // e.stopPropagation();
    e.preventDefault();
  };
  const handleDel = (e) => {
    e.preventDefault();
    onOpen();
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
            <Link to={`category_id/${id}`}>
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
                <HStack w={"70%"} gap={20}>
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
                    color="#273746">
                    {name}
                  </Text>
                </HStack>
                <HStack w={"20%"} m={"auto"} justifyContent={"space-around"}>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    onClick={(e) => handleEdit(e)}>
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={(e) => handleDel(e)}>
                    Delete
                  </Button>
                </HStack>
              </ListItem>
            </Link>
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
