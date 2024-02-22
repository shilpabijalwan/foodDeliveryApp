import React from "react";

import { Outlet } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import AdminNavbar from "../NavBar/AdminNavBar";

function AdminLayOut() {
  return (
    <Box>
      <AdminNavbar />
      <Outlet />
    </Box>
  );
}

export default AdminLayOut;
