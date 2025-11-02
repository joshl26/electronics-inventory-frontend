/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    userSettings: {
      colorMode: '',
      partsListView: '',
    },
  },
  reducers: {
    colorModeState: (state, action) => {
      console.log(`Set color mode to: ${action.payload}`);
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          colorMode: action.payload,
        },
      };
    },
    partsListViewState: (state, action) => {
      console.log(`Set parts list view to: ${action.payload}`);
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          partsListView: action.payload,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { colorModeState, partsListViewState } = settingsSlice.actions;

export default settingsSlice.reducer;
