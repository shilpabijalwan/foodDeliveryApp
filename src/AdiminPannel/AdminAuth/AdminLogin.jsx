import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiAxios } from "../../axiosApi";

// import { axiosToken } from "../axiosApi";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await apiAxios.post("/admins/login", data);

      localStorage.setItem("token", JSON.stringify(response.data.token));

      response.data.token &&
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
        });
      setTimeout(() => {
        response && navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response.data.error,
        status: "error",
        duration: 3000,
      });
    }
    // reset();
  };

  return (
    <Box w={"100%"}>
      <VStack
        w={{ base: "70%", sm: "70%", md: "50%" }}
        m={"auto"}
        h={"600px"}
        // border={"1px solid blue"}
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
        my={50}>
        <Box
          px={10}
          py={30}
          my={10}
          // border="1px solid blue"
          fontSize="2xl"
          fontFamily={"cursive"}
          fontWeight={"bold"}>
          <Text
            fontSize="6xl"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip={"text"}
            fontWeight="extrabold">
            Hi Admin!
          </Text>
          <Text
            fontSize="4xl"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip={"text"}
            fontWeight="extrabold">
            LOG IN YOUR ACCOUNT
          </Text>
          <Text fontSize={"2xl"}>
            Don&apos;t have any account ?&nbsp;
            <Link to="/adminsignup" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </Text>
        </Box>
        <form onSubmit={handleSubmit(handleLogin)} style={{ width: "50%" }}>
          <Stack spacing={10}>
            <Input
              variant="filled"
              placeholder="email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
                      value
                    ) || "Email address must be valid address",
                },
              })}
              // onChange={(e) => console.log(e.target.value)}
            />
            <InputGroup size="md">
              <Input
                variant="filled"
                placeholder="password"
                type={show ? "text" : "password"}
                {...register("password", { required: true })}
                // onChange={(e) => console.log(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" colorScheme="teal" variant="outline">
              Log In
            </Button>
          </Stack>
        </form>
      </VStack>
    </Box>
  );
}

export default AdminLogin;
