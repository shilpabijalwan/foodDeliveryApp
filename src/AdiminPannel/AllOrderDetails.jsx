import React, { useEffect } from "react";
import { fetchAllOrder } from "../Services/OrderService";

function AllOrderDetails() {
  useEffect(() => {
    fetchAllOrder();
  }, []);
  return <div>AllOrderDetails</div>;
}

export default AllOrderDetails;
