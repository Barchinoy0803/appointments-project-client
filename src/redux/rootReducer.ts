import { combineReducers } from '@reduxjs/toolkit';
import { mainApi } from '../service/api/api';
import modalSlice from './features/modal.slice';
import userSlice from './features/user.slice';
import breadcrumbSlice from "./features/breadcrumb.slice"

export const rootReducer = combineReducers({
  modal: modalSlice,
  userSlice,
  breadcrumbSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
