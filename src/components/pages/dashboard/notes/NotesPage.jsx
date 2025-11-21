// desc: Page component to display a list of notes with filtering based on user roles.
// file: src/components/pages/dashboard/notes/NotesPage.jsx

import { useGetNotesQuery } from "components/features/notes/notesApiSlice";
import OutletLoadingPage from "components/pages/OutletLoadingPage";
import useAuth from "hooks/useAuth";
import NoteList from "components/features/notes/NoteList";

const NotesPage = () => {
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notelist", {
    pollingInterval: 1500000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <OutletLoadingPage />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;

    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    return <NoteList notes={notes} filteredIds={filteredIds} />;
  }

  return null;
};

export default NotesPage;
