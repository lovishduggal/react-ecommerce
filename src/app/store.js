import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authtReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authtReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducer,
    },
});
