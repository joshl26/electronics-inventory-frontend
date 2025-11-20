import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPartById } from "../../features/parts/partsApiSlice";
import { selectAllUsers } from "../../features/users/usersApiSlice";
import EditPartForm from "./EditPartForm";
import partTypes from "../../mock_data/partTypes";

const EditPart = () => {
  const { id } = useParams();

  const part = useSelector((state) => selectPartById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    part && users ? (
      <EditPartForm
        idReadOnly={false}
        part={part}
        users={users}
        partTypes={partTypes}
      />
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default EditPart;
