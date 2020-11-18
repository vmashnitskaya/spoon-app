import { SelectOptions } from './recipesInterfaces';
import { RootState } from '../rootReducer';

const categories = (state: RootState): SelectOptions[] => state.recipes.categories;
const measures = (state: RootState): SelectOptions[] => state.recipes.measures;
const timeUnits = (state: RootState): SelectOptions[] => state.recipes.timeUnits;
const loading = (state: RootState): boolean => state.recipes.loading;
const error = (state: RootState): string => state.recipes.error;
const infoMessage = (state: RootState): string => state.recipes.infoMessage;

export default { categories, measures, timeUnits, loading, error, infoMessage };
