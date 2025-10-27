import { RouterProvider } from "react-router-dom";
import {router} from "./config/routes/routes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import QueryProvider from "./providers/QueryProvider.jsx";
import {AuthProvider} from "./providers/AuthProvider.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
      <QueryProvider>
          <AuthProvider>
              <RouterProvider router={router} />
              <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
              />
          </AuthProvider>
      </QueryProvider>
  )
}

export default App
