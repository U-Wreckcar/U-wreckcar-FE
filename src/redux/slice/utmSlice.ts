import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store/store';

type UTMItem = {
  id?: number;
  created_at?: string;
  utm_url?: string;
  utm_campaign_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign_name?: string | null;
  utm_term?: string | null;
  utm_memo?: string | null;
  full_url?: string;
  shorten_url?: string;
};

interface UTMState {
  utms?: Array<UTMItem> | null;
}

const initialState: UTMState = {
  utms: [],
};

export const utmSlice = createSlice({
  name: 'UTMItem',
  initialState,
  reducers: {
    addUTM(state, action: PayloadAction<UTMItem>) {
      state.utms?.push(action.payload);
    },
    deleteUTM(state, action: PayloadAction<number>) {
      state.utms = state.utms?.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addUTM, deleteUTM } = utmSlice.actions;
export const utms = (state: RootState) => state.utms.utms;
export default utmSlice.reducer;
