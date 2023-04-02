import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AddItem = {
  isOpen:boolean
  del:boolean
  plus:boolean
};


const initialState: AddItem = {
  isOpen:false,
  del:false,
  plus:false
};

export const addUtmSlice = createSlice({
  name: "addItem",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    delItem(state, action:PayloadAction<boolean>){
      state.del = action.payload
    }
  },
});

export const { addItem, delItem } =  addUtmSlice.actions;
export default  addUtmSlice.reducer;
