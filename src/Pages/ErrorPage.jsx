import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <Box
      w={"80%"}
      justifyContent={"center"}
      m={"auto"}
      textAlign={"center"}
      mt={230}>
      <Heading justifyContent={"center"} mb={50} color={"red"}>
        404 Page Not found
      </Heading>
      <Link>
        <Text fontSize={"xl"} color={"blue"}>
          Back to homepage
        </Text>
      </Link>
    </Box>
  );
}

export default ErrorPage;
