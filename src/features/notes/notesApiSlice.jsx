import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  },
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/notes',
      validateStatus: (response, result) => response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        // Avoid mutating server objects and avoid underscore dangle by mapping to new objects
        const loadedNotes = responseData.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
        }));
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: 'Note', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Note', id }))];
        }
        return [{ type: 'Note', id: 'LIST' }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: '/notes',
        method: 'POST',
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: '/notes',
        method: 'PATCH',
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, _error, arg) => [{ type: 'Note', id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: '/notes',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, _error, arg) => [{ type: 'Note', id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
