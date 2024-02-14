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
export default function UserProductCard({ image, name, price }) {
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
        <Button
          variant="solid"
          colorScheme="blue"
          textAlign={"center"}
          w={190}
          m="auto">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
