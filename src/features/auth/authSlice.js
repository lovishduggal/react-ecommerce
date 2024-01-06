import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    checkAuth,
    checkUser,
    createUser,
    resetPassword,
    resetPasswordRequest,
    signOut,
} from './authAPI';

const initialState = {
    loggedInUser: null,
    userChecked: false,
    status: 'idle',
    error: null,
    mailSent: false,
    passwordReset: false,
};

export const fetchCreateUserAsync = createAsyncThunk(
    'auth/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);

export const fetchCheckUserAsync = createAsyncThunk(
    'auth/checkUser',
    async (loginInfo) => {
        const response = await checkUser(loginInfo);
        return response.data;
    }
);

export const fetchCheckAuthAsync = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const response = await checkAuth();
        return response.data;
    }
);

export const resetPasswordRequestAsync = createAsyncThunk(
    'auth/resetPasswordRequest',
    async (email) => {
        const response = await resetPasswordRequest(email);
        return response.data;
    }
);
export const resetPasswordAsync = createAsyncThunk(
    'auth/resetPassword',
    async (data) => {
        const response = await resetPassword(data);
        return response.data;
    }
);

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
    const response = await signOut();
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.value = 1;
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
                state.error = action.error.message;
            })
            .addCase(signOutAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = null;
            })
            .addCase(fetchCheckAuthAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCheckAuthAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
                state.userChecked = true;
            })
            .addCase(fetchCheckAuthAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.userChecked = true;
            })
            .addCase(resetPasswordRequestAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.mailSent = true;
            })
            .addCase(resetPasswordAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.passwordReset = true;
            });
    },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectSentMail = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
