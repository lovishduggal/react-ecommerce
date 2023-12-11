import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './authAPI';

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

export const signOutAsync = createAsyncThunk('counter/signOut', async () => {
    const response = await signOut();
    return response.data;
});

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
            .addCase(signOutAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = null;
            });
    },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
