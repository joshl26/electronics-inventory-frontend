/* eslint-disable no-unused-vars */
import React from "react";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  notesApiSlice,
  selectAllNotes,
  selectNoteById,
  selectNoteIds,
} from "./notesApiSlice";

// Create the Redux store with the API slice reducer and middleware
const store = configureStore({
  reducer: {
    [notesApiSlice.reducerPath]: notesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApiSlice.middleware),
});

// Wrapper component to provide Redux store context
const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("notesApiSlice", () => {
  it("should have initial state selectors working correctly", () => {
    const state = store.getState();

    const allNotes = selectAllNotes(state);
    const noteIds = selectNoteIds(state);

    expect(allNotes).toEqual([]);
    expect(noteIds).toEqual([]);
  });

  it("selectNoteById returns undefined for non-existing id", () => {
    const state = store.getState();
    const note = selectNoteById(state, "nonexistent-id");
    expect(note).toBeUndefined();
  });

  // Example of testing a hook with renderHook and wrapper
  // Uncomment and adapt if you have hooks to test

  // it("should test RTK Query hooks", async () => {
  //   const { result, waitFor } = renderHook(() => useGetNotesQuery(), { wrapper });
  //   await waitFor(() => result.current.isSuccess);
  //   expect(result.current.data).toBeDefined();
  // });
});
