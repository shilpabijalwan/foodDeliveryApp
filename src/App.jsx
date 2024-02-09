import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routers";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
