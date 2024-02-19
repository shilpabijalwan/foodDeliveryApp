import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../../Services/ProductServices";

function ProductCard({ category, price, name, image, id }) {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const handleDelete = async (id) => {
    // console.log(id);
    onClose();

    try {
      await axios
        .delete(`http://192.168.1.18:8000/api/products/delete/${id}`)
        .then((response) => {
          // console.log(response);
          toast({
            title: "Product deleted",
            status: "success",
            duration: 4000,
          });
        });
      fetchAdminProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          h={190}
          w={190}
          m={"auto"}
        />
        <Stack mt="6" spacing="3" ml={16}>
          <Heading size="md">{name}</Heading>

          <Text color="blue.600" fontSize="2xl">
            ₹ {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup
          m={"auto"}
          // border={"1px solid blue"}
          w={"90%"}
          justifyContent={"space-around"}>
          <Link to={`/update/${id}`}>
            <Button variant="solid" colorScheme="blue" px={10}>
              Edit
            </Button>
          </Link>
          <Button variant="solid" colorScheme="red" px={10} onClick={onOpen}>
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
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
    </Card>
  );
}

export default ProductCard;
