import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    username: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin;
            state.username = action.payload.username;
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('isAdmin', action.payload.isAdmin);
            localStorage.setItem('username', action.payload.username);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.username = '';
            // Instead of clearing localStorage, remove specific keys
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('username');
        },
        initializeAuth: (state) => {
            state.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
            state.isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;
            state.username = localStorage.getItem('username') || '';
        },
    },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
