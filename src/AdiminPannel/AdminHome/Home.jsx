import React from "react";

import { Box } from "@chakra-ui/react";
import AdminNavbar from "../NavBar/AdminNavBar";
import AllProducts from "../AdminPages/AllProducts";

function Home() {
  return (
    <Box>
      <AllProducts />
    </Box>
  );
}

export default Home;
