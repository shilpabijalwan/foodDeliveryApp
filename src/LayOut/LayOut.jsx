import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { Box } from "@chakra-ui/react";

function LayOut() {
  return (
    <Box border="1px solid blue">
      <NavBar />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default LayOut;
