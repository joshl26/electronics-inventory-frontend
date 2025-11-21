/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  partsApiSlice,
  selectAllParts,
  selectPartById,
  selectPartIds,
} from "./partsApiSlice";

describe("partsApiSlice selectors", () => {
  const store = configureStore({
    reducer: {
      [partsApiSlice.reducerPath]: partsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(partsApiSlice.middleware),
  });

  it("should return empty arrays for initial state", () => {
    const state = store.getState();

    expect(selectAllParts(state)).toEqual([]);
    expect(selectPartIds(state)).toEqual([]);
  });

  it("selectPartById returns undefined for unknown id", () => {
    const state = store.getState();
    expect(selectPartById(state, "unknown-id")).toBeUndefined();
  });
});
