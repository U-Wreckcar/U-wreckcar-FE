import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AddItem = {
  isOpen:boolean
};


const initialState: AddItem = {
  isOpen:false,
};

export const addUtmSlice = createSlice({
  name: "addItem",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
  },
});

export const { addItem } =  addUtmSlice.actions;
export default  addUtmSlice.reducer;
