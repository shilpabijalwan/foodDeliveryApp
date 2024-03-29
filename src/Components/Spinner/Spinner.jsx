import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      height={"100vh"}
      alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}

export default Loader;
