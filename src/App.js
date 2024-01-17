import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import {
    fetchCheckAuthAsync,
    selectLoggedInUser,
    selectUserChecked,
} from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { Toaster } from 'react-hot-toast';
import { Grid } from 'react-loader-spinner';
import StripeCheckout from './pages/StripeCheckout';
import ResetPasswordPage from './pages/ResetPasswordPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Protected>
                <Home></Home>
            </Protected>
        ),
    },
    {
        path: '/admin',
        element: (
            <ProtectedAdmin>
                <AdminHome></AdminHome>
            </ProtectedAdmin>
        ),
    },
    {
        path: '/login',
        element: <LoginPage></LoginPage>,
    },
    {
        path: '/signup',
        element: <SignupPage></SignupPage>,
    },
    {
        path: '/my-cart',
        element: (
            <Protected>
                {' '}
                <CartPage></CartPage>
            </Protected>
        ),
    },
    {
        path: '/checkout',
        element: (
            <Protected>
                <Checkout></Checkout>
            </Protected>
        ),
    },
    {
        path: '/product-details/:id',
        element: (
            <Protected>
                <ProductDetailsPage></ProductDetailsPage>
            </Protected>
        ),
    },
    {
        path: '/admin/product-details/:id',
        element: (
            <ProtectedAdmin>
                <AdminProductDetailsPage></AdminProductDetailsPage>
            </ProtectedAdmin>
        ),
    },
    {
        path: '/admin/product-form',
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage></AdminProductFormPage>
            </ProtectedAdmin>
        ),
    },
    {
        path: '/admin/product-form/edit/:id',
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage></AdminProductFormPage>
            </ProtectedAdmin>
        ),
    },
    {
        path: '/admin/orders',
        element: (
            <ProtectedAdmin>
                <AdminOrdersPage></AdminOrdersPage>
            </ProtectedAdmin>
        ),
    },
    {
        path: '/order-success/:id',
        element: <OrderSuccessPage></OrderSuccessPage>,
    },
    {
        path: '/my-orders',
        element: <UserOrdersPage></UserOrdersPage>,
        //* We will add page later right now
    },
    {
        path: '/profile',
        element: <UserProfilePage></UserProfilePage>,
        //* We will add page later right now
    },
    {
        path: '/logout',
        element: <Logout></Logout>,
        //* We will add page later right now
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage></ResetPasswordPage>,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage></ForgotPasswordPage>,
    },
    {
        path: '/stripe-checkout/',
        element: (
            <Protected>
                <StripeCheckout></StripeCheckout>
            </Protected>
        ),
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>,
    },
]);

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const userChecked = useSelector(selectUserChecked);

    useEffect(() => {
        (async () => {
            await dispatch(fetchCheckAuthAsync());
        })();
    }, [dispatch]);
    useEffect(() => {
        if (user) {
            dispatch(fetchItemsByUserIdAsync());
            dispatch(fetchLoggedInUserAsync());
        }
    }, [dispatch, user]);

    return (
        <div className="App">
            {!userChecked ? (
                <div className="flex items-center justify-center h-screen w-[100vw]">
                    {' '}
                    <Grid
                        height="80"
                        width="80"
                        color="#1F2937"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    <RouterProvider router={router} />
                    <Toaster />
                </>
            )}
        </div>
    );
}

export default App;
