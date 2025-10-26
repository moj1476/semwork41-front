import {
    createBrowserRouter,
} from "react-router-dom";
import {RoutesPath} from "../../const/const.js";
import MainPage from "../../pages/MainPage/MainPage.jsx";
import AccountPage from "../../pages/AccountPage/AccountPage.jsx";
import BuilderPage from "../../pages/BuilderPage/BuilderPage.jsx";
import ReviewsPage from "../../pages/ReviewsPage/ReviewsPage.jsx";
import AdminPage from "../../pages/AdminPage/AdminPage.jsx";

export const router = createBrowserRouter([
    {
        path: RoutesPath.main,
        element: <MainPage />,
    },
    {
        path: RoutesPath.account,
        element: <AccountPage />,
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
        element: <AdminPage />,
    }
]);