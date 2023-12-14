import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fecthAllOrders, updateOrder } from './orderAPI';

const initialState = {
    orders: [],
    currentOrder: null,
    totalOrders: 0,
    status: 'idle',
};

export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order) => {
        const response = await createOrder(order);
        return response.data;
    }
);

export const fecthAllOrdersAsync = createAsyncThunk(
    'order/fecthAllOrders',
    async ({ pagination, sort }) => {
        const response = await fecthAllOrders({ pagination, sort });
        return response.data;
    }
);

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async (order) => {
        const response = await updateOrder(order);
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.currentOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            })
            .addCase(fecthAllOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fecthAllOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.totalOrders;
            })
            .addCase(updateOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.orders.findIndex(
                    (order) => order.id === action.payload.id
                );
                state.orders[index] = action.payload;
            });
    },
});

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
