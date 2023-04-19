import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Table } from "@tanstack/react-table";
import { MainTableType } from "@/src/components/mainPage/TableData";

type AddItem = {
  isOpen:boolean
  del:boolean
  plus:boolean
  table:any
  select:any
  data:any
};


const initialState: AddItem = {
  isOpen:false,
  del:false,
  plus:false,
  table:null,
  select:{},
  data:[],

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
    },
    addTable(state, action:PayloadAction<Table<MainTableType>>){
      state.table = action.payload
    },
    selectTable(state, action) {
      state.select = action.payload
    },
    dataTable(state, action) {
      state.data = action.payload
    },
    delSelectTable(state){
      state.select = {}
    }
  },
});

export const { addItem, delItem, addTable, selectTable, dataTable, delSelectTable } =  addUtmSlice.actions;
export default  addUtmSlice.reducer;
