import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import HomePage from "../Pages/HomePage";

import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";
import Login from "../Pages/Login";
import Home from "../AdiminPannel/AdminHome/Home";
import AddProducts from "../AdiminPannel/AdminPages/AddProducts";

import ProductsPage from "../Pages/ProductsPage";
import AddCategory from "../AdiminPannel/AdminPages/AddCategory";
import UpdateProduct from "../AdiminPannel/UpDatePage/UpdateProduct";
import ErrorPage from "../Pages/ErrorPage";
import AdminLogin from "../AdiminPannel/AdminAuth/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminSignup from "../Pages/Signup";
import AdminCategoryPage from "../AdiminPannel/AdminCategory/AdminCategoryPage";
import AdminLayOut from "../AdiminPannel/AdminLayOut/AdminLayOut";
import FirstPage from "../firstPage/FirstPage";
import Loader from "../Components/Spinner/Spinner";
import { Box, Text } from "@chakra-ui/react";
import { FetchUserCategory } from "../Services/CategoryService";
import SortProductList from "../AdiminPannel/SortProductList";

export function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return (
    <Box
      w={"100%"}
      h={"100vh"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}>
      <Text fontSize={40} color={"green"}>
        Redirecting.....
      </Text>
    </Box>
  );
}
export const firstPage = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorBoundary />}>
        <Route path="/" element={<FirstPage />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="adminsignup" element={<AdminSignup />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </>
  )
);
export const routeruser = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayOut />} errorElement={<ErrorPage />}>
        <Route path="/" element={<HomePage />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="category_id/:id" element={<ProductsPage />} />
      </Route>
    </>
  )
);

export const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AdminLayOut />} errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <Home />
            // </PrivateRoute>
          }
        />
        <Route path="add" element={<AddProducts />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="category" element={<AdminCategoryPage />} />
        <Route path="update/:id" element={<UpdateProduct />} />

        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="adminsignup" element={<AdminSignup />} />
        <Route path="category/category_id/:id" element={<SortProductList />} />
      </Route>
    </>
  )
);
