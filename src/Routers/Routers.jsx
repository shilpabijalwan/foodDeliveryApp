import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayOut />} errorElement={<ErrorPage />}>
        <Route path="" element={<HomePage />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="category_id/:id" element={<ProductsPage />} />
      </Route>
      {/* <Route path="/admin" element={<LayOutAdmin />}> */}
      <Route path="admin" element={<Home />} />
      <Route path="add" element={<AddProducts />} />
      <Route path="add-category" element={<AddCategory />} />
      <Route path="update/:id" element={<UpdateProduct />} />
      {/* </Route> */}
    </>
  )
);
