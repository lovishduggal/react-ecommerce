import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggdInUserOrders } from './userAPI';

const initialState = {
    userOrders: [],
    status: 'idle',
};

export const fetchLoggdInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggdInUserOrders',
    async (userId) => {
        const response = await fetchLoggdInUserOrders(userId);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggdInUserOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggdInUserOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                //? this info can be different from loggedin user info.
                state.userOrders = action.payload;
            });
    },
});

export const { increment } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
