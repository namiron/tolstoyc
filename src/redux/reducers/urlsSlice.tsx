import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IParsData } from "../types/IUrlsProps";

const initialState: IInitialState = {
  metaData: [],
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    postUrls(state, { payload }: PayloadAction<IParsData[]>) {
      state.metaData = [...state.metaData, ...payload]; 
    },
  },
});

export const { postUrls } = urlsSlice.actions;

export default urlsSlice.reducer;
