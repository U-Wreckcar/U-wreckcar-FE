import { configureStore } from '@reduxjs/toolkit';
import add from 'redux/slice/addslice'

const store = configureStore({
  reducer: {
     add
  },
});

export default store;