import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "components/features/notes/notesApiSlice";
import { selectAllUsers } from "components/features/users/usersApiSlice";
import EditNoteForm from "components/features/notes/EditNoteForm";

const EditNotePage = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default EditNotePage;
