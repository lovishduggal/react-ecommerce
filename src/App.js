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
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggdInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';

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
        path: '/login',
        element: <LoginPage></LoginPage>,
    },
    {
        path: '/signup',
        element: <SignupPage></SignupPage>,
    },
    {
        path: '/cart',
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
        path: '/order-success/:id',
        element: <OrderSuccessPage></OrderSuccessPage>,
    },
    {
        path: '/orders',
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
        path: '*',
        element: <PageNotFound></PageNotFound>,
    },
]);

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(() => {
        if (user) {
            dispatch(fetchItemsByUserIdAsync(user?.id));
            dispatch(fetchLoggdInUserAsync(user?.id));
        }
    }, [dispatch, user?.id, user]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
