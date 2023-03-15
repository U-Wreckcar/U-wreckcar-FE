import { configureStore } from '@reduxjs/toolkit';
import filter from 'redux/slice/filterSlice';
import utms from 'redux/slice/utmSlice';

export const store = configureStore({
  reducer: { utms, filter },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
