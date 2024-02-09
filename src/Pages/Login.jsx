import { Box, Button, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
function Login() {
  const { register, handleSubmit } = useForm();
  // console.log(register);

  const handleLogin = () => {
    console.log("working");
  };

  return (
    <Box w={"100%"} border="1px solid blue">
      <VStack
        w={"50%"}
        m={"auto"}
        h={"600px"}
        border={"1px solid blue"}
        mt={100}>
        <Box mb={100}>SIGN IN</Box>
        <form onSubmit={handleSubmit(handleLogin)} style={{ width: "50%" }}>
          <Input type="text" placeholder="email" />
          <br />
          <br />
          <br />
          <Input type="text" placeholder="password" />
          <br />
          <br />
          <br />
          <Input type="submit" />
        </form>
      </VStack>
    </Box>
  );
}

export default Login;
