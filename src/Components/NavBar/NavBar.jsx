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
  useToast,
} from "@chakra-ui/react";

import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
// import MyLocation from "../Location/MyLocation";
import { color } from "framer-motion";
import SerachBar from "../SerachBar/SerachBar";
import axios from "axios";
import { BASE_URL } from "../../../../ipData";
import { axiosToken } from "../../axiosApi";
import { connect } from "react-redux";

function NavBar(props) {
  // console.log(props.cartItems.length);
  const Links = [
    {
      title: "Cart",
      link: "/cart",
      icon: <CiShoppingCart size={40} />,
      count: props.cartItems?.length,
    },
  ];

  const toast = useToast();
  const userdata = JSON.parse(localStorage.getItem("details")) || "";
  const token = JSON.parse(localStorage.getItem("token")) || null;

  const handleLogOut = async () => {
    try {
      await axiosToken.post(`/user/logout`).then((response) => {
        response && localStorage.removeItem("token");

        response &&
          toast({
            title: response?.data,
            status: "success",
            duration: 3000,
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* <MyLocation /> */}
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
              {/* <Box display={"flex"}> */}
              <Box>
                {ele.icon}
                <Box
                  bgColor={"#F2F4F4"}
                  border={"1px solid #E5E8E8"}
                  position={"absolute"}
                  top={3}
                  ml={6}
                  h={6}
                  w={6}
                  pb={1}
                  borderRadius={15}
                  textAlign={"center"}>
                  <Text fontSize={14} fontWeight={600} color={"green"}>
                    {ele.count}
                  </Text>
                </Box>
              </Box>
              {/* {ele.title} */}
              {/* </Box> */}
            </NavLink>
          </Box>
        ))}
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="red">
            <CiUser size={24} color="white" />
          </MenuButton>
          <MenuList>
            <MenuGroup>
              {token ? (
                <MenuItem fontSize={18} fontWeight={"bold"} color={"#8A56D5"}>
                  Hello {userdata.name}
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
              {/* <MenuItem> */}
              {token && (
                <Button
                  onClick={handleLogOut}
                  w={"80%"}
                  my={2}
                  colorScheme="red"
                  variant="outline"
                  ml={5}>
                  Logout
                </Button>
              )}
              {/* </MenuItem> */}
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}
const mapStateToProps = (state) => ({
  cartItems: state.CartProductSlice.Cartproduct,
});
export default connect(mapStateToProps)(NavBar);
