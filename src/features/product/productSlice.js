import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllProductsByFilters } from './productAPI';

const initialState = {
    products: [],
    totalItems: 0,
    status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProductsByFilters',
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    }
);

export const fetchAllProductsByFiltersAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async ({ filter, sort, pagination }) => {
        const response = await fetchAllProductsByFilters(
            filter,
            sort,
            pagination
        );
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state) => {
            state.value = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action?.payload;
            })
            .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchAllProductsByFiltersAsync.fulfilled,
                (state, action) => {
                    state.status = 'idle';
                    state.products = action?.payload?.products;
                    state.totalItems = action?.payload?.totalItems;
                }
            );
    },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
