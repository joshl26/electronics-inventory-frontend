import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTrash } from 'react-icons/fa';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import ROLES from '../../config/roles';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();

  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] =
    useDeleteUserMutation();

  const navigate = useNavigate();

  // Use safe defaults if `user` is missing for extra robustness in tests
  const [username, setUsername] = useState(user?.username ?? '');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user?.roles ?? []);
  const [active, setActive] = useState(Boolean(user?.active));

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  // Removed unused 'e' parameter to avoid no-unused-vars
  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  let canSave;
  if (password) {
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPwdClass = password && !validPassword ? 'form__input--incomplete' : '';
  const validRolesClass = !roles.length ? 'form__input--incomplete' : '';

  const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              type="button"
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FaSave />
            </button>
            <button
              type="button"
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FaTrash />
            </button>
          </div>
        </div>

        <label htmlFor="username" className="form__label">
          Username: <span className="nowrap">[3-20 letters]</span>
          <input
            className={`form__input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
            aria-invalid={!validUsername}
            aria-describedby={!validUsername ? 'username-hint' : undefined}
          />
        </label>
        <span id="username-hint" className="offscreen">
          Username must be 3–20 letters.
        </span>

        <label htmlFor="password" className="form__label">
          Password: <span className="nowrap">[empty = no change]</span>{' '}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            aria-invalid={password ? !validPassword : false}
            aria-describedby={password && !validPassword ? 'password-hint' : undefined}
          />
        </label>
        <span id="password-hint" className="offscreen">
          Password must be 4–12 characters and may include !@#$%.
        </span>

        <label className="form__label form__checkbox-container" htmlFor="user-active">
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label htmlFor="roles" className="form__label">
          ASSIGNED ROLES:
          <select
            id="roles"
            name="roles"
            className={`form__select ${validRolesClass}`}
            multiple
            size="3"
            value={roles}
            onChange={onRolesChanged}
            aria-invalid={!roles.length}
            aria-describedby={!roles.length ? 'roles-hint' : undefined}
          >
            {options}
          </select>
        </label>
        <span id="roles-hint" className="offscreen">
          Select one or more roles.
        </span>
      </form>
    </>
  );

  return content;
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    username: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    active: PropTypes.bool,
  }).isRequired,
};

export default EditUserForm;
