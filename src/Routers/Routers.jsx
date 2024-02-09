import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import HomePage from "../Pages/HomePage";
import About from "../Pages/About";
import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";
import Login from "../Pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayOut />}>
      <Route path="" element={<HomePage />} />

      <Route path="signin" element={<Login />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);
