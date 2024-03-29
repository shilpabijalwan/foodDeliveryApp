import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../../../ipData";
import Loader from "../../Components/Spinner/Spinner";
import { apiAxios } from "../../axiosApi";
import { fetchAdmin } from "../../Services/UserService";

const Links = [
  { title: "OrdersDetails", link: "/order", icon: "" },
  { title: "Products", link: "/", icon: "" },

  { title: "Categories", link: "/category", icon: "" },
  { title: "Add Product", link: "/add" },
  {
    title: "Add Category",
    link: "/add-category",
  },
];

function AdminNavbar() {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const AdminDetails = JSON.parse(localStorage.getItem("details")) || "";
  // console.log(AdminDetails);

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <HStack
      position={"sticky"}
      top={0}
      zIndex={4}
      bg={"#D6EAF8"}
      w={"100%"}
      py={2}
      justifyContent={{ base: "space-between", sm: "space-around" }}
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
      }}>
      <HStack
        // border={"1px solid green"}
        w={{ base: "20%", sm: "30%", md: "30%" }}>
        <Box w={100}>
          <img
            src="https://i.pinimg.com/originals/34/0c/6a/340c6add7519212185a08d4205eb1965.png"
            alt=""
            // width={"100%"}
          />
        </Box>
      </HStack>

      <HStack
        // border={"1px solid blue"}
        w={{ base: "70%", sm: "70%", md: "60%" }}
        justifyContent={"space-around"}>
        {Links?.map((ele, i) => (
          <Box color={"#2C3E50"} _hover={{ color: "#F08080" }} key={i}>
            <NavLink
              to={ele.link}
              key={i}
              style={({ isActive }) => {
                return isActive
                  ? { color: "#D35400", fontSize: 20, fontWeight: 600 }
                  : { fontSize: 20, fontWeight: 600 };
              }}>
              <Box display={"flex"}>{ele.title}</Box>
            </NavLink>
          </Box>
        ))}
        <Button
          isDisabled
          fontSize={20}
          colorScheme={"purple"}
          variant={"outline"}
          fontWeight={"bold"}>
          Hii {AdminDetails.name}
        </Button>
      </HStack>
    </HStack>
  );
}

export default AdminNavbar;
