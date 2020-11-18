import { SelectOptions } from './recipesInterfaces';
import { RootState } from '../rootReducer';

const categories = (state: RootState): SelectOptions[] => state.recipes.categories;
const measures = (state: RootState): SelectOptions[] => state.recipes.measures;
const timeUnits = (state: RootState): SelectOptions[] => state.recipes.timeUnits;

export default { categories, measures, timeUnits };
