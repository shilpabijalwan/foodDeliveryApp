import { RouterProvider } from "react-router-dom";
import { firstPage, routerAdmin, routeruser } from "./Routers/Routers";
import { useEffect, useState } from "react";
import { fetchUser } from "./Services/UserService";
import Loader from "./Components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { FetchUserCategory } from "./Services/CategoryService";
import FirstPage from "./firstPage/FirstPage";

function App() {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  let userData = useSelector((data) => {
    return data.AuthSlice.userDetails;
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser, userData]);

  return (
    <>
      {userData == null && <RouterProvider router={firstPage} />}

      {userData?.user_type == "admin" && (
        <RouterProvider router={routerAdmin} />
      )}
      {userData?.user_type == "customer" && (
        <RouterProvider router={routeruser} />
      )}
    </>
  );
}

export default App;
