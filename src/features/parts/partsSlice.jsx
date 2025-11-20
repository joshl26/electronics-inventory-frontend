import { createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";

const partsAdapter = createEntityAdapter({});

const partsSlice = createSlice({
  name: "parts",
  initialState: { data: partsAdapter.getInitialState() },
  reducers: {
    printParts: (state) => {
      return state.data;
    },
  },
});

export const { printParts } = partsSlice.actions;

export default partsSlice.reducer;
