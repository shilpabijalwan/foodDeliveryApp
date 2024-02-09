import { useState } from "react";
import { Box, Text } from "@chakra-ui/react"; // adding linear gradient and
import LayOut from "./LayOut/LayOut";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LayOut />
    </>
  );
}

export default App;
