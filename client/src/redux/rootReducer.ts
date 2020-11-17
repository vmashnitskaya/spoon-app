import { combineReducers } from 'redux';

import auth from './auth/authSlice';
import recipes from './recipes/recipesSlice';

const rootReducer = combineReducers({
    auth,
    recipes,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
