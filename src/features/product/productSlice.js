import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchAllProducts,
    fetchAllProductsByFilters,
    fetchBrands,
    fetchCategories,
} from './productAPI';

const initialState = {
    products: [],
    brands: [],
    categories: [],
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

export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async () => {
        const response = await fetchBrands();
        return response.data;
    }
);

export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async () => {
        const response = await fetchCategories();
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
            )
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action?.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action?.payload;
            });
    },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
