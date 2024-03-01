import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  QuantityDecrease,
  QuantityIncrease,
  RemoveCartItem,
  resetCart,
} from "../redux/Slices/CartSlice";

import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { apiAxios, axiosToken } from "../axiosApi";

function Cart() {
  const userdata = JSON.parse(localStorage.getItem("details")) || "";
  // console.log(userdata);
  const dispatch = useDispatch();
  let ProductsTotal;

  const [data, setData] = useState([]);
  const cartData = useSelector((data) => {
    return data.CartProductSlice;
  });
  // console.log(cartData.Cartproduct);

  useEffect(() => {
    const newData = cartData.Cartproduct?.map((ele) => {
      return {
        product_id: ele.id,
        quantity: ele.quantity,
      };
    });
    // newData.user_id = userdata.id;
    setData(newData);
  }, []);
  // console.log(data);

  ProductsTotal = cartData.Cartproduct?.reduce((accumulator, item) => {
    // console.log(item.price * item.quantity);
    return (accumulator += item.price * item.quantity);
  }, 0);

  const handleDecrease = (id) => {
    // console.log(id);

    dispatch(QuantityDecrease(id));
  };

  const handleIncrease = (id) => {
    dispatch(QuantityIncrease(id));
  };

  const handleRemove = (id) => {
    // console.log(id);
    dispatch(RemoveCartItem(id));
  };
  const handleOrderPlaced = async () => {
    // console.log("okkk");
    try {
      const res = await axiosToken.post("orders/createOrderWithItems", {
        order: data,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      // dispatch(resetCart());
    }
  };

  return (
    <Box w={"80%"} m={"auto"} mt={10}>
      {cartData.Cartproduct?.map((ele) => {
        return (
          <Card
            key={ele.id}
            py={6}
            mb={10}
            gap={20}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline">
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={ele.image}
              alt="Caffe Latte"
              w={100}
              h={100}
              // mt={10}
              mx={10}
              borderRadius={100}
            />

            <Stack w={"70%"}>
              <CardBody>
                <Heading size="md" color={"#8E44AD"}>
                  {ele.name}
                </Heading>
                <Box
                  display={"flex"}
                  w={"90%"}
                  justifyContent={"space-around"}
                  py={5}>
                  <Text py="2">
                    {ele.price} X {ele.quantity}
                  </Text>

                  <Stack direction="row" spacing={4} align="center" m={"auto"}>
                    {ele.quantity !== 1 ? (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => handleDecrease(ele.id)}>
                        -
                      </Button>
                    ) : (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => handleRemove(ele.id)}>
                        <DeleteIcon />
                      </Button>
                    )}
                    <Button colorScheme="teal" variant="outline">
                      {ele.quantity}
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => handleIncrease(ele.id)}>
                      +
                    </Button>
                  </Stack>
                  <Heading
                    color={"#915043"}
                    fontSize={"lg"}
                    py={2}
                    display={"flex"}
                    w={100}
                    justifyContent={"space-around"}>
                    Rs.
                    <Text>{ele.price * ele.quantity}</Text>
                  </Heading>
                </Box>
              </CardBody>
            </Stack>
          </Card>
        );
      })}
      <Box
        my={10}
        py={10}
        w={"70%"}
        m={"auto"}
        textAlign={"center"}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        }}>
        {cartData.Cartproduct?.length ? (
          <>
            <Heading>Total Cart Value:- {ProductsTotal}</Heading>
            <br />
            <br />

            <Button
              colorScheme="teal"
              variant={"outline"}
              size={"lg"}
              onClick={handleOrderPlaced}>
              Place Order
            </Button>
          </>
        ) : (
          <Box>
            <Heading mb={10} color={"green"}>
              Your cart is Empty
            </Heading>
            <Link to={"/"}>
              <Text color={"blue"} fontSize={18}>
                Go to HomePage
              </Text>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Cart;
