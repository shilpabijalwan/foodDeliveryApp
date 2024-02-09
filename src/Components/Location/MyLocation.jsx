import axios from "axios";
import React, { useEffect, useState } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
function MyLocation() {
  const [userLocation, setUserLoaction] = useState(null);
  const [userCode, setUserCode] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  // console.log(latitude, longitude);
  // console.log(userLocation);

  useEffect(() => {
    const showPosition = (position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setlongitude(longitude);
    };

    if (navigator.geolocation) {
      const position = navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);
  const getCurrentLocation = () => {
    const fetchlocation = async () => {
      try {
        await axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          .then((res) => {
            // console.log(res.data.address);
            setUserLoaction(res.data.address.town);
            setUserCode(res.data.address.postcode);
          });
      } catch (error) {
        console.error("Error fetching address:", error);
        setUserLoaction("");
      }
    };
    fetchlocation();
  };

  return (
    <Button
      // isLoading={userLocation ? false : true}

      spinnerPlacement="start"
      onClick={getCurrentLocation}
      colorScheme="teal"
      variant="outline"
      px={8}
      gap={3}>
      <CiLocationOn />
      {!userLocation ? "Get current loction" : userLocation + " " + userCode}
    </Button>
  );
}

export default MyLocation;
