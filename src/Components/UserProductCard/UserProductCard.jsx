import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCartProducts,
  QuantityDecrease,
  QuantityIncrease,
  RemoveCartItem,
  setProductQuantity,
} from "../../redux/Slices/CartSlice";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UserProductCard(props) {
  const { image, name, price, id } = props;
  const dispatchData = { ...props };
  const dispatch = useDispatch();
  const [qrt, setQrt] = useState(null);
  const cartData = useSelector((data) => {
    return data.CartProductSlice;
  });
  // console.log(cartData.Cartproduct);

  const [cartBtn, setCartBtn] = useState(false);

  const handleAddCart = (id) => {
    // console.log(id);

    dispatch(GetCartProducts(dispatchData));
  };
  const handleRemove = (id) => {
    // console.log(id);
    dispatch(RemoveCartItem(id));
    setCartBtn(false);
  };

  useEffect(() => {
    const show = cartData?.Cartproduct.find((ele) => {
      return ele.id == id;
    });
    if (show) {
      setCartBtn(true);
    }

    const Qrt = cartData.Cartproduct?.find((ele) => {
      return ele.id == id;
    });
    setQrt(Qrt?.quantity);
  }, [cartData]);

  const handleDecrease = (id) => {
    // console.log(id);

    dispatch(QuantityDecrease(id));
  };

  const handleIncrease = (id) => {
    dispatch(QuantityIncrease(id));
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image}
          alt={name}
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
        {!cartBtn ? (
          <Button
            onClick={() => handleAddCart(id)}
            variant="solid"
            colorScheme="blue"
            textAlign={"center"}
            w={190}
            m="auto">
            Add to cart
          </Button>
        ) : (
          <Stack direction="row" spacing={4} align="center" m={"auto"}>
            {qrt !== 1 ? (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => handleDecrease(id)}>
                -
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => handleRemove(id)}>
                <DeleteIcon />
              </Button>
            )}
            <Button colorScheme="teal" variant="outline">
              {qrt}
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => handleIncrease(id)}>
              +
            </Button>
          </Stack>
        )}
      </CardFooter>
    </Card>
  );
}
