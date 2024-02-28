import React, { useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { Box } from "@chakra-ui/react";
import { fetchAdminProducts } from "../Services/ProductServices";
import { FetchUserCategory } from "../Services/CategoryService";
import { fetchUser } from "../Services/UserService";

function LayOut() {
  useEffect(() => {
    fetchUser();
    fetchAdminProducts();
    FetchUserCategory();
  }, []);

  return (
    <Box>
      <NavBar />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default LayOut;
