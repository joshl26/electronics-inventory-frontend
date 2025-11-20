import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsersById } from "components/features/users/usersApiSlice";

import EditUserForm from "components/features/users/EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUsersById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};

export default EditUser;
