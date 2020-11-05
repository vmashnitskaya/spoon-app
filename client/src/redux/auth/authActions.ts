import { AnyAction, Dispatch } from 'redux';
import { fetchAuthPending, fetchAuthSuccess, fetchAuthFailed } from './authSlice';
import dataHttp from '../dataHttp';
import { UserInput } from './authInterfaces';

const registerUser = (userObject: UserInput) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(fetchAuthPending());
        await dataHttp('/api/auth/register', 'POST', {
            ...userObject,
        });
        const data = await dataHttp('/api/auth/login', 'POST', { ...userObject });
        dispatch(fetchAuthSuccess(data));
    } catch (e) {
        dispatch(fetchAuthFailed(e.message));
    }
};

const loginUser = (userObject: UserInput) => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(fetchAuthPending());
        const tokenData = await dataHttp('/api/auth/login', 'POST', { ...userObject });
        dispatch(fetchAuthSuccess(tokenData));
    } catch (e) {
        dispatch(fetchAuthFailed(e.message));
    }
};

export default { registerUser, loginUser };
