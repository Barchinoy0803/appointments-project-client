import { combineReducers } from '@reduxjs/toolkit';
import { mainApi } from '../service/api/api';
import  modalSlice  from './features/modal.slice';

export const rootReducer = combineReducers({
  modalSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
