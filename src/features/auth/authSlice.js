import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, fetchCount } from './authAPI';

const initialState = {
    loggedInUser: null,
    status: 'idle',
};

export const fetchCreateUserAsync = createAsyncThunk(
    'counter/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            });
    },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;

export default authSlice.reducer;
