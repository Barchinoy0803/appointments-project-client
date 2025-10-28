import { combineReducers } from '@reduxjs/toolkit';
import { mainApi } from '../service/api/api';

export const rootReducer = combineReducers({
  [mainApi.reducerPath]: mainApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
