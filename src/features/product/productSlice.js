import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createProduct,
    fetchAllProducts,
    fetchAllProductsByFilters,
    fetchBrands,
    fetchCategories,
    fetchProductById,
    updateProduct,
} from './productAPI';
import toast from 'react-hot-toast';

const initialState = {
    products: [],
    brands: [],
    categories: [],
    selectedProduct: null,
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
    async ({ filter, sort, pagination, admin }) => {
        const response = await fetchAllProductsByFilters(
            filter,
            sort,
            pagination,
            admin
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

export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        const response = await fetchProductById(id);
        return response.data;
    }
);

export const createProductIdAsync = createAsyncThunk(
    'product/createProduct',
    async (product) => {
        const response = await createProduct(product);
        toast.success('Product created successfully');
        return response.data;
    }
);
export const updateProductAsync = createAsyncThunk(
    'product/updateProduct',
    async (update) => {
        const response = await updateProduct(update);
        toast.success('Product updated successfully');
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
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
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action?.payload;
            })
            .addCase(createProductIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProductIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products.push(action?.payload);
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                state.products[index] = action.payload;
                state.selectedProduct = action.payload;
            });
    },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectStatus = (state) => state.product.status;

export default productSlice.reducer;
