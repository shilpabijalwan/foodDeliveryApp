import React, { useState } from "react";
import AdminNavbar from "../NavBar/AdminNavBar";
import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  Toast,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiAxios, multipartApi } from "../../axiosApi";
function AddCategory() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const stroeCategory = useSelector((data) => {
    console.log(data);
  });

  const handleAdd = async (data) => {
    // console.log(data.image[0]);
    // console.log(data);
    const formdata = {
      image: data.image[0],
      name: data.name,
    };

    try {
      const response = await multipartApi.post("/categories/add", formdata);
      // console.log(response);

      {
        response.status &&
          toast({
            title: "new category added successfully",
            status: "success",
            duration: 3000,
          });
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box
        w={"100%"}
        // border="1px solid blue"
      >
        <VStack
          w={{ base: "70%", sm: "70%", md: "40%" }}
          m={"auto"}
          h={"600px"}
          // border={"1px solid blue"}
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
          my={50}>
          <Box
            px={100}
            py={30}
            my={10}
            // border="1px solid blue"
            fontSize="4xl"
            fontFamily={"cursive"}
            fontWeight={"bold"}>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip={"text"}
              fontWeight="extrabold">
              Add Category
            </Text>
          </Box>
          <form onSubmit={handleSubmit(handleAdd)} style={{ width: "50%" }}>
            <Stack spacing={10}>
              <Input
                variant="filled"
                placeholder="category name"
                type="text"
                {...register("name", { required: true })}
              />

              <Input
                variant="filled"
                placeholder="add image"
                type="file"
                {...register("image", { required: true })}
                // onChange={(e) => console.log(e.target.value)}
              />

              <Button
                type="submit"
                colorScheme="teal"
                variant="outline"
                fontWeight={"bold"}
                fontSize={22}>
                Add
              </Button>
            </Stack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default AddCategory;
