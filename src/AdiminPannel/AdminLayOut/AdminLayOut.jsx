import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import AdminNavbar from "../NavBar/AdminNavBar";
import { FetchUserCategory } from "../../Services/CategoryService";
import { fetchAdminProducts } from "../../Services/ProductServices";

function AdminLayOut() {
  useEffect(() => {
    FetchUserCategory();
    fetchAdminProducts();
    fetch;
  }, []);
  return (
    <Box>
      <AdminNavbar />
      <Outlet />
    </Box>
  );
}

export default AdminLayOut;
