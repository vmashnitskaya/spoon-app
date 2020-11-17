import { RootState } from '../rootReducer';

const userData = (state: RootState) => state.auth.userData;
const loading = (state: RootState) => state.auth.loading;
const error = (state: RootState) => state.auth.error;

export default { userData, loading, error };
