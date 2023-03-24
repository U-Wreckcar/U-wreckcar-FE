// // import {
// //   combineReducers,
// //   configureStore,
// //   PayloadAction,
// //   ThunkAction,
// //   Action
// // } from '@reduxjs/toolkit';
//  import { createWrapper } from 'next-redux-wrapper';
// // import filter from 'redux/slice/filterSlice';
// // import utms from 'redux/slice/utmSlice';
// // import add from 'redux/slice/addslice'

// // const reducer = (state: any, action: PayloadAction<any>) => {
// //   return combineReducers({
// //     add
// //   })(state, action);
// // };

// // const makeStore = () => configureStore({
// //   reducer:{
// //     add
// //   }
// // });
// // export type RootState = ReturnType<typeof store.getState>;
//  export type AppDispatch = typeof store.dispatch;

// // export const store = makeStore();


//  export type AppStore = ReturnType<typeof makeStore>;
// // export type AppThunk<ReturnType = void> = ThunkAction<
// //   ReturnType,
// //   RootState,
// //   unknown,
// //   Action
// // >;
// import { configureStore, Action, } from '@reduxjs/toolkit';
// import add from 'redux/slice/addslice'

// // 리덕스 store 생성함수
// const makeStore = () => {
 
//   // 슬라이스 통합 store 생성
//   const store = configureStore({
//     reducer: {
//       add
//     },
//   });

//   return store;
// };

// // store 생성
// const store = makeStore();

// // store 엑스포트

// export const wrapper = createWrapper<AppStore>(makeStore)
// // RootState 엑스포트
// export type RootState = ReturnType<typeof store.getState>;
// store.js

import { configureStore } from '@reduxjs/toolkit';
import add from 'redux/slice/addslice'

const store = configureStore({
  reducer: {
     add
  },
});

export default store;