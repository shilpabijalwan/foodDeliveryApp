import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let AdminData = useSelector((data) => {
    return data.AuthSlice.userDetails;
  });
  // console.log(AdminData);

  return AdminData ? children : <Navigate to={"/adminlogin"} />;
}
export default PrivateRoute;
