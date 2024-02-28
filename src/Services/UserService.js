import axios from "axios";
import { BASE_URL } from "../../../ipData";
import { userData } from "../redux/Slices/Auth.slice";
import { store } from "../redux/store";
import { apiAxios, axiosToken } from "../axiosApi";

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
        // console.log(response);
        store.dispatch(userData(response.data));
        localStorage.setItem("details", JSON.stringify(response.data.name));
      });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdmin = async () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  // console.log("token", token);
  try {
    axiosToken.get(`/admins/getAdmin`).then((response) => {
      // console.log(response);
      store.dispatch(userData(response.data));
      localStorage.setItem("details", JSON.stringify(response.data.name));
    });
  } catch (error) {
    console.log(error);
  }
};
