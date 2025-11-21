/* eslint-disable no-unused-vars */
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  notesApiSlice,
  selectAllNotes,
  selectNoteById,
  selectNoteIds,
} from "./notesApiSlice";

// If you don't have a setupApiStore helper, you can create a store like this:
const store = configureStore({
  reducer: {
    [notesApiSlice.reducerPath]: notesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApiSlice.middleware),
});

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("notesApiSlice", () => {
  it("should have initial state selectors working correctly", () => {
    // Initial state should be empty
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

  // You can add more tests here for RTK Query hooks using renderHook if you want to test API calls
});
