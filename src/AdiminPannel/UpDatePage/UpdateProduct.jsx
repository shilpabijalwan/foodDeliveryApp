import React, { useEffect, useState } from "react";
import AdminNavbar from "../NavBar/AdminNavBar";

import {
  Box,
  Button,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useStatStyles,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const [previmg, setPrevimg] = useState(null);
  //   console.log(previmg);
  const { register, handleSubmit, watch } = useForm();
  let imageField = watch("image");

  const { id } = useParams();
  //   console.log(id);

  const stroeCategory = useSelector((data) => {
    return data.CategorySlice.CategoryData;
  });

  const [productdata, setProductdata] = useState({
    name: "",
    price: null,
    image: "",
    category: "",
  });
  //   console.log(productdata.image);
  useEffect(() => {
    (async () => {
      try {
        await axios
          .get("http://192.168.1.21:8000/api/products/getProducts")
          .then((res) => {
            // console.log(res.data.product);
            const filteredData = res.data.product?.filter((ele) => {
              return ele.id == id;
            });
            filteredData?.map((ele) => {
              //   console.log(ele);
              setProductdata({
                name: ele.name,
                price: ele.price,
                image: ele.image,
                category: ele.category_id,
              });
            });
          });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleUpdate = async (data) => {
    console.log("working");
    console.log(data);
    const image = data.image.length ? data.image[0] : "";
    const formData = {
      name: data.name,
      price: data.price,
      image: image,
      category: data.catagoryselect,
    };

    console.log(formData);

    try {
      const res = await axios.patch(
        `http://192.168.1.21:8000/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AdminNavbar />

      <Box
        w={"100%"}
        // border="1px solid blue"
      >
        <VStack
          w={{ base: "70%", sm: "70%", md: "40%" }}
          m={"auto"}
          //   h={"600px"}
          pb={20}
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
              Update Your Product
            </Text>
          </Box>
          <form onSubmit={handleSubmit(handleUpdate)} style={{ width: "50%" }}>
            <Stack spacing={10}>
              <Input
                defaultValue={productdata.name}
                variant="filled"
                placeholder="product name"
                type="text"
                {...register("name", { required: true })}
              />
              <Input
                defaultValue={productdata.price}
                variant="filled"
                placeholder="price"
                type="number"
                {...register("price", {
                  required: true,
                })}
              />
              <Input
                // value={productdata.image}
                variant="filled"
                placeholder="Add image"
                type="file"
                {...register("image", {})}
                onChange={(e) =>
                  e.target.value
                    ? setPrevimg(URL.createObjectURL(e.target.files[0]))
                    : null
                }
              />
              {previmg ? (
                <Image
                  src={previmg}
                  alt="preview"
                  h={100}
                  w={100}
                  border={"1px solid gray"}
                />
              ) : (
                <Image
                  src={productdata.image}
                  alt="preview"
                  h={100}
                  w={100}
                  border={"1px solid gray"}
                />
              )}
              <Select
                placeholder="Choose product category"
                bg="tomato"
                borderColor="tomato"
                focusBorderColor="tomato"
                fontSize={18}
                fontWeight={"bold"}
                {...register("catagoryselect", { required: true })}>
                {stroeCategory?.map((ele) => (
                  <option
                    value={ele.id}
                    selected={productdata.category == ele.id}
                    key={ele.id}>
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
                Update
              </Button>
            </Stack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
}

export default UpdateProduct;
