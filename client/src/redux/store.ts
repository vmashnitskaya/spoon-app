import { configureStore, Action } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

declare module 'redux' {
    export interface Dispatch<A extends Action = AnyAction> {
        <TReturnType, TState, TExtraThunkArg>(
            thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
        ): TReturnType;
    }
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true,
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
