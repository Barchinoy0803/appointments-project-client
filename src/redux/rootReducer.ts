import { combineReducers } from '@reduxjs/toolkit';
import { mainApi } from '../service/api/api';
import modalSlice from './features/modal.slice';
import userSlice from './features/user.slice';

export const rootReducer = combineReducers({
  modalSlice,
  userSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
