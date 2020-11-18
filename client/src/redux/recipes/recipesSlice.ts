import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './recipesInterfaces';
import staticFields from './staticFields';

const initial: InitialState = {
    categories: staticFields.categories,
    measures: staticFields.measures,
    timeUnits: staticFields.timeUnits,
    loading: false,
    error: '',
    recipes: [],
    infoMessage: '',
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: initial,
    reducers: {
        fetchRecipesPending(state) {
            return { ...state, loading: true };
        },
        fetchRecipesSuccess(state, action) {
            const { recipes } = action.payload;
            return {
                ...state,
                loading: false,
                recipes,
            };
        },
        postRecipesSuccess(state, action) {
            const { message } = action.payload;
            return {
                ...state,
                loading: false,
                infoMessage: message,
            };
        },
        fetchRecipesFailed(state, action) {
            const { message } = action.payload;
            return { ...state, error: message, loading: false };
        },
        resetMessages(state) {
            return { ...state, error: '', infoMessage: '' };
        },
    },
});

export const {
    fetchRecipesPending,
    fetchRecipesSuccess,
    postRecipesSuccess,
    fetchRecipesFailed,
    resetMessages,
} = recipesSlice.actions;

export default recipesSlice.reducer;
