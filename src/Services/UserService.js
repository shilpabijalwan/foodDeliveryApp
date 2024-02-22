import axios from "axios";
import { BASE_URL } from "../../../ipData";
import { userData } from "../redux/Slices/Auth.slice";
import { store } from "../redux/store";

export const fetchUser = async () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  // console.log("token", token);
  try {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        store.dispatch(userData(response.data));
      });
  } catch (error) {
    console.log(error);
  }
};
