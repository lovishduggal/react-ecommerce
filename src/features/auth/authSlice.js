import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, fetchCount, updateUser } from './authAPI';

const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null,
};

export const fetchCreateUserAsync = createAsyncThunk(
    'counter/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);

export const fetchCheckUserAsync = createAsyncThunk(
    'counter/checkUser',
    async (loginInfo) => {
        const response = await checkUser(loginInfo);
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
            })
            .addCase(fetchCheckUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCheckUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            })
            .addCase(fetchCheckUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            });
    },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
