import { configureStore } from "@reduxjs/toolkit"
import add from "src/redux/slice/addslice"

const store = configureStore({
  reducer: {
    add,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
