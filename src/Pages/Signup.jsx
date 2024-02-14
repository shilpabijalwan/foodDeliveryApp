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
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // const inputFieldValues = watch({
  //   name: "FullName",
  //   email: "email",
  //   password: "password",
  // });

  const handleLogin = async (data) => {
    console.log(data);
    // console.log("working");
    // console.log(inputFieldValues);

    try {
      await axios
        .post("http://192.168.1.21:8000/api/users/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        .then((response) => {
          console.log(response.data);
          toast({
            title: response.data,
            status: "success",
            duration: 2000,
          });
          setTimeout(() => {
            response && navigate("/");
          }, 2000);
        });
    } catch (error) {
      console.log(error.response.data.errors);
      toast({
        title: error.response.data.errors.email,
        status: "error",
        duration: 6000,
      });
    }

    reset();
  };

  return (
    <Box
      w={"100%"}
      // border="1px solid blue"
    >
      <VStack
        w={{ base: "70%", sm: "70%", md: "45%" }}
        m={"auto"}
        h={"600px"}
        // border={"1px solid blue"}
        style={{
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
        my={50}>
        <Box
          px={100}
          py={30}
          my={10}
          // border="1px solid blue"
          fontSize="4xl"
          fontFamily={"cursive"}
          fontWeight={"bold"}>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip={"text"}
            fontWeight="extrabold">
            SIGN IN YOUR ACCOUNT
          </Text>
        </Box>
        <form onSubmit={handleSubmit(handleLogin)} style={{ width: "50%" }}>
          <Stack spacing={10}>
            <Input
              variant="filled"
              placeholder="Enter your full Name"
              type="text"
              {...register("name", { required: true })}
              // onChange={(e) => console.log(e.target.value)}
            />
            <Input
              variant="filled"
              placeholder="Enter your email"
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
            />
            <InputGroup size="md">
              <Input
                variant="filled"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
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
              Sign In
            </Button>
          </Stack>
        </form>
      </VStack>
    </Box>
  );
}

export default Signup;
