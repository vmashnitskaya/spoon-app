import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './authInterfaces';

const initial: InitialState = {
    loading: false,
    error: '',
    userData: localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData') || '')
        : {
              first_name: '',
              last_name: '',
              admin: false,
              token: '',
              userId: '',
          },
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initial,
    reducers: {
        fetchAuthPending(state) {
            return { ...state, loading: true };
        },
        fetchAuthSuccess(state, action) {
            const { token, userId, last_name, first_name, admin } = action.payload;
            return {
                ...state,
                loading: false,
                userData: { ...state.userData, token, userId, last_name, first_name, admin },
            };
        },
        fetchAuthFailed(state, action) {
            const { message } = action.payload;
            return { ...state, error: message, loading: false };
        },
        logout() {
            return { ...initial };
        },
    },
});

export const { fetchAuthPending, fetchAuthSuccess, fetchAuthFailed, logout } = authSlice.actions;

export default authSlice.reducer;
