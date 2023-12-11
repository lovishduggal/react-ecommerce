import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchLoggdInUser,
    fetchLoggdInUserOrders,
    updateUser,
} from './userAPI';

const initialState = {
    userOrders: [],
    userInfo: null, //? This info will be used in case of detailed user info, while auth will only be used for loggedInUser id etc checks
    status: 'idle',
};

export const fetchLoggdInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggdInUserOrders',
    async (userId) => {
        const response = await fetchLoggdInUserOrders(userId);
        return response.data;
    }
);

export const fetchLoggdInUserAsync = createAsyncThunk(
    'user/fetchLoggdInUser',
    async (userId) => {
        const response = await fetchLoggdInUser(userId);
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'counter/updateUser',
    async (updateData) => {
        const response = await updateUser(updateData);
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
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
            .addCase(fetchLoggdInUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggdInUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            });
    },
});

export const { increment } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
