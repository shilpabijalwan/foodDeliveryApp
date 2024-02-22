import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <Box
      bg={"#BFA5E3"}
      px={10}
      py={30}
      justifyContent={"space-around"}
      display={"flex"}
      fontSize={30}>
      <Link to={"/adminlogin"}>
        <Button size={"xl"} p={5} colorScheme="blue" variant={"outline"}>
          Login in as a Admin
        </Button>
      </Link>
      <Link to={"/signin"}>
        <Button size={"xl"} p={5} colorScheme="green" variant={"outline"}>
          Login in as a User
        </Button>
      </Link>
    </Box>
  );
}

export default FirstPage;
