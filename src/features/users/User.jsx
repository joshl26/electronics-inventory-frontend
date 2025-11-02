import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPenSquare } from 'react-icons/fa';
import { selectUsersById } from './usersApiSlice';

function User({ userId }) {
  const user = useSelector((state) => selectUsersById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRoleString = user.roles.toString().replaceAll(',', ', ');
    const cellStatus = user.active ? '' : 'table__cell--inactive';

    return (
      <tr onClick={() => handleEdit()} className="user-list-row">
        <td className={`${cellStatus}`}>{user.username}</td>
        <td className={`${cellStatus}`}>{userRoleString}</td>
        <td className={`${cellStatus}`}>
          <button type="submit" className="icon-button table__button" onClick={handleEdit}>
            <FaPenSquare />
          </button>
        </td>
      </tr>
    );
  }
  return null;
}

User.propTypes = {
  // adjust type if your ids are numbers
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default User;
