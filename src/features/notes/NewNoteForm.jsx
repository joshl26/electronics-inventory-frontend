import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useAddNewNoteMutation } from './notesApiSlice';
import './NewNote.css';

function NewNoteForm({ users }) {
  const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(users && users.length > 0 ? users[0].id : '');

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setText('');
      setUserId(users && users.length > 0 ? users[0].id : '');
      navigate('/dash/notes');
    }
  }, [isSuccess, navigate, users]);

  // Keep userId in sync if users prop changes
  useEffect(() => {
    if (!userId && users && users.length > 0) {
      setUserId(users[0].id);
    }
  }, [users, userId]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = (users || []).map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validTitleClass = !title ? 'form__input--incomplete' : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form-new-note" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>Add New Note</h2>
          <div className="form__action-buttons">
            <button
              type="submit"
              className="icon-button"
              title="Save"
              disabled={!canSave}
              aria-label="Save note"
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="title">
          Title:
          <input
            className={`form__input ${validTitleClass}`}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
            aria-required="true"
          />
        </label>

        <label className="form__label" htmlFor="text">
          Text:
          <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
            aria-required="true"
          />
        </label>

        <label className="form__label form__checkbox-container" htmlFor="username">
          ASSIGNED TO:
          <select
            id="username"
            name="username"
            className="form__select"
            value={userId}
            onChange={onUserIdChanged}
            aria-label="Assigned user"
          >
            {options}
          </select>
        </label>
      </form>
    </>
  );

  return content;
}

NewNoteForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};

NewNoteForm.defaultProps = {
  users: [],
};

export default NewNoteForm;
