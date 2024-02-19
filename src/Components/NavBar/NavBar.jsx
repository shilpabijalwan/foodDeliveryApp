import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import MyLocation from "../Location/MyLocation";
import { color } from "framer-motion";
import SerachBar from "../SerachBar/SerachBar";

const Links = [
  { title: "", link: "/", icon: "" },
  { title: "Offer", link: "/offer", icon: "" },
  { title: "Help", link: "/help", icon: "" },
  // { title: "Sign In", link: "/signin", icon: <CiUser size={24} /> },
  {
    title: "Cart",
    link: "/cart",
    icon: <CiShoppingCart size={24} />,
    count: "",
  },
  {
    title: "Admin",
    link: "/admin",
  },
];

function NavBar() {
  const LoginUser = JSON.parse(localStorage.getItem("userDetails")) || "";
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const navigate = useNavigate();
  // console.log(LoginUser);

  return (
    <HStack
      w={"100%"}
      py={2}
      zIndex={5}
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
        <MyLocation />
      </HStack>

      <HStack
        // border={"1px solid blue"}
        w={{ base: "70%", sm: "70%", md: "48%" }}
        justifyContent={"space-around"}>
        <Box>
          <SerachBar />
        </Box>

        {Links?.map((ele, i) => (
          <Box color={"#2C3E50"} _hover={{ color: "#F08080" }} key={i}>
            <NavLink
              to={ele.link}
              key={i}
              style={({ isActive }) => {
                return isActive
                  ? { color: "red", fontSize: 18, fontWeight: 600 }
                  : { fontSize: 18, fontWeight: 600 };
              }}>
              <Box display={"flex"}>
                <Box>
                  {ele.icon}
                  <Text
                    position={"absolute"}
                    top={5}
                    ml={4}
                    fontSize={18}
                    fontWeight={400}>
                    {ele.count}
                  </Text>
                </Box>
                {ele.title}
              </Box>
            </NavLink>
          </Box>
        ))}
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="pink">
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup>
              {token ? (
                <MenuItem fontSize={18} fontWeight={"bold"} color={"#8A56D5"}>
                  Hello {LoginUser?.name.toUpperCase()}
                </MenuItem>
              ) : (
                <MenuItem fontSize={18} fontWeight={"bold"} w={"100%"}>
                  <Link to="/signin">
                    <Button
                      colorScheme="red"
                      variant="outline"
                      w={"90%"}
                      m={"auto"}
                      px={16}>
                      Login/SignUp
                    </Button>
                  </Link>
                </MenuItem>
              )}
              <MenuItem>Orders</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

export default NavBar;
