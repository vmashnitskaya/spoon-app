import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './recipesInterfaces';
import staticFields from './staticFields';

const initial: InitialState = {
    categories: staticFields.categories,
    measures: staticFields.measures,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: initial,
    reducers: {
        checkCategories() {},
    },
});

export const { checkCategories } = recipesSlice.actions;

export default recipesSlice.reducer;
