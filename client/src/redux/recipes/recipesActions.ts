import { AnyAction, Dispatch } from 'redux';
import { Recipe } from './recipesInterfaces';
import { fetchRecipesPending, postRecipesSuccess, fetchRecipesFailed } from './recipesSlice';
import dataHttp from '../dataHttp';
import authSelectors from '../auth/authSelectors';
import { RootState } from '../rootReducer';

const createRecipe = (recipe: Recipe) => async (
    dispatch: Dispatch<AnyAction>,
    getState: () => RootState
) => {
    try {
        dispatch(fetchRecipesPending());
        const { token } = authSelectors.userData(getState());
        const data = await dataHttp(
            '/api/recipes/create',
            'POST',
            { ...recipe },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        dispatch(postRecipesSuccess(data));
    } catch (e) {
        dispatch(fetchRecipesFailed(e.message));
    }
};

export default { createRecipe };
