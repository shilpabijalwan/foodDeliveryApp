import React from "react";

import AdminNavbar from "../NavBar/AdminNavBar";
import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

function AddProducts() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const stroeCategory = useSelector((data) => {
    return data.CategorySlice.CategoryData;
  });
  // console.log(stroeCategory);
  const handleAdd = async (data) => {
    // console.log(data);
    const formData = {
      name: data.name,
      price: data.price,
      image: data.image[0],
      category: data.catagoryselect,
    };
    console.log(data.catagoryselect, data.image[0]);

    try {
      const response = await axios.post(
        "http://192.168.1.18:8000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      {
        response.status &&
          toast({
            title: "new product added successfully",
            status: "success",
            duration: 3000,
          });
      }
      reset();
    } catch (error) {
      console.log(error);

      // toast({
      //   title: "somthing went wrong while adding a new product" + error.message,
      //   status: "error",
      //   duration: 6000,
      // });
    }

    reset();
  };
  return (
    <>
      <AdminNavbar />
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
              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
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
              Add New Product
            </Text>
          </Box>
          <form onSubmit={handleSubmit(handleAdd)} style={{ width: "50%" }}>
            <Stack spacing={10}>
              <Input
                variant="filled"
                placeholder="product name"
                type="text"
                {...register("name", { required: true })}
              />
              <Input
                variant="filled"
                placeholder="price"
                type="number"
                {...register("price", {
                  required: true,
                })}
              />

              <Input
                variant="filled"
                placeholder="Add image"
                type="file"
                {...register("image", { required: true })}
                // onChange={(e) => console.log(e.target.value)}
              />

              <Select
                placeholder="Choose product category"
                bg="tomato"
                borderColor="tomato"
                focusBorderColor="tomato"
                fontSize={18}
                fontWeight={"bold"}
                {...register("catagoryselect", { required: true })}>
                {stroeCategory?.map((ele) => (
                  <option value={ele.id} key={ele.id}>
                    {ele.name}
                  </option>
                ))}
              </Select>
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
    </>
  );
}

export default AddProducts;
