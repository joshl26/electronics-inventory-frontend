import { useSelector } from "react-redux";
import { selectAllUsers } from "components/features/users/usersApiSlice";
import NewNoteForm from "components/features/notes/NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewNoteForm users={users} />;

  return content;
};

export default NewNote;
