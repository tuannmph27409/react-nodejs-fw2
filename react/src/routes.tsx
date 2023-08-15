import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import ProductManagement from "./pages/Product-Management";
import ProductAdd from "./pages/Product-Add";
import ProductEdit from "./pages/Product-Edit";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutWebsite from "./layouts/LayoutWebsite";
import ProductDetail from "./pages/Product-Detail";
import List from "./components/List";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            {
                index: true,
                element: <Navigate to="/product" />
            },
            {
                path: 'product',
                element: <List />
            },
            {
                path: 'product/product-detail/:idProduct',
                element: <ProductDetail />
            }
        ]
    },

    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                    </div>
                ),
            },
            {
                path: "product",
                element: <ProductManagement />,
            },
            {
                path: "product/add",
                element: <ProductAdd />,
            },
            {
                path: "product/:idProduct/edit",
                element: <ProductEdit />,
            },
        ],
    },
]);