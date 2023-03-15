import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store/store';
type FilterItem = {
  create_st?: string | null;
  create_end?: string | null;
  date_scope?: string | undefined | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  keyword?: string | null;
  keyword_target?: string | null;
};
type Tag = {
  create_st?: string | null;
  create_end?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  keyword?: string | null;
  keyword_target?: string | null;
  date_scope?: string | undefined | null;
};
interface FilterState {
  filterItem?: Array<FilterItem>;
  tag?: Tag;
}

const initialState: FilterState = {
  tag: {},
  filterItem: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAddFilterItem(state, action: PayloadAction<FilterState>) {
      console.log(action.payload);

      state.tag = { ...state.tag, ...action.payload };
      // state.tag = action.payload.tag;
    },

    addFilterItem(state, action: PayloadAction<FilterItem>) {
      state.filterItem?.push(action.payload);
    },
  },
});

export const { addFilterItem, setAddFilterItem } = filterSlice.actions;
export const dateFilter = (state: RootState) => state.filter.filterItem;
export const datetag = (state: RootState) => state.filter.tag;
export default filterSlice.reducer;
