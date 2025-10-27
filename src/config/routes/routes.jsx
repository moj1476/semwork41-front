import {
    createBrowserRouter, Outlet,
} from "react-router-dom";
import {RoutesPath} from "../../const/const.js";
import MainPage from "../../pages/MainPage/MainPage.jsx";
import AccountPage from "../../pages/AccountPage/AccountPage.jsx";
import BuilderPage from "../../pages/BuilderPage/BuilderPage.jsx";
import ReviewsPage from "../../pages/ReviewsPage/ReviewsPage.jsx";
import AdminPage from "../../pages/AdminPage/AdminPage.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import {AdminProtectedRoute, ProtectedRoute} from "../../providers/AuthProvider.jsx";

export const router = createBrowserRouter([
    {
        element: (<>
            <Navbar />
            <Outlet />
        </>),
        children: [
            {
                path: RoutesPath.main,
                element: <MainPage />,
            },
            {
                path: RoutesPath.account,
                element: <ProtectedRoute><AccountPage /></ProtectedRoute>,
            },
            {
                path: RoutesPath.builder,
                element: <BuilderPage />,
            },
            {
                path: RoutesPath.reviews,
                element: <ReviewsPage />,
            },
            {
                path: RoutesPath.admin,
                element: <AdminProtectedRoute><AdminPage /></AdminProtectedRoute>,
            }
        ]
    }

]);