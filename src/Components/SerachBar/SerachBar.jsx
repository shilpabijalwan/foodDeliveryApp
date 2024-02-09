import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";
function SerachBar() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <CiSearch />
      </InputLeftElement>
      <Input type="search" placeholder="search" w={170} variant="filled" />
    </InputGroup>
  );
}

export default SerachBar;
