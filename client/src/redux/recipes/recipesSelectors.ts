import { SelectOptions } from './recipesInterfaces';
import { RootState } from '../rootReducer';

const categories = (state: RootState): SelectOptions[] => state.recipes.categories;
const measures = (state: RootState): SelectOptions[] => state.recipes.measures;

export default { categories, measures };
