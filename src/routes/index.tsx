import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Login } from "../components/login/Login";
import { ProductsCard } from "../components/product/ProductsCard";
import { CartProducts } from "../components/cart/CartProducts";
import { ProtectedRouter } from "../components/protected-router/ProtectedRouter";
import { ProductDetails } from "../components/products-details/ProductDetails";
import { ErrorPage } from "../components/error/ErrorPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [ 
            {
                path: '/',
                element: <ProductsCard/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/cart',
                element: (
                    <ProtectedRouter>
                        <CartProducts/>               
                    </ProtectedRouter>
                )
            },
            {
                path: '/product/:id',
                element: (
                    <ProtectedRouter>
                        <ProductDetails/>
                    </ProtectedRouter>
                )
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]);