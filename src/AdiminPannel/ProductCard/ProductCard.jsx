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
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

function ProductCard({ category, price, name, image }) {
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
          <Button variant="solid" colorScheme="blue" px={10}>
            Edit
          </Button>
          <Button variant="solid" colorScheme="red" px={10}>
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
