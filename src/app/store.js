import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authtReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authtReducer,
    },
});
