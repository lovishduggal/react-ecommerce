import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchLoggedInUser,
    fetchLoggedInUserOrders,
    updateUser,
} from './userAPI';

const initialState = {
    userInfo: null, //? This info will be used in case of detailed user info, while auth will only be used for loggedInUser id etc checks
    status: 'idle',
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async () => {
        const response = await fetchLoggedInUserOrders();
        return response.data;
    }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async () => {
        const response = await fetchLoggedInUser();
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
            .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchLoggedInUserOrdersAsync.fulfilled,
                (state, action) => {
                    state.status = 'idle';
                    //? this info can be different from loggedin user info.
                    state.userInfo.orders = action.payload;
                }
            )
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            });
    },
});

export const { increment } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
