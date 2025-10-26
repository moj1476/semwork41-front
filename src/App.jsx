import { RouterProvider } from "react-router-dom";
import {router} from "./config/routes/routes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {

  return (
      <>
          <Navbar />
          <RouterProvider router={router} />
      </>
  )
}

export default App
