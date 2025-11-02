import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTrash } from 'react-icons/fa';
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice';
import useAuth from '../../hooks/useAuth';
import './EditNoteForm.css';

function EditNoteForm({ note, users }) {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();
  const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] =
    useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note?.title ?? '');
  const [text, setText] = useState(note?.text ?? '');
  const [completed, setCompleted] = useState(Boolean(note?.completed));
  const [userId, setUserId] = useState(note?.user ?? (users && users.length ? users[0].id : ''));

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setText('');
      setUserId(users && users.length ? users[0].id : '');
      navigate('/dash/notes');
    }
  }, [isSuccess, isDelSuccess, navigate, users]);

  // keep userId in sync if users prop changes
  useEffect(() => {
    if (!userId && users && users.length > 0) {
      setUserId(users[0].id);
    }
  }, [users, userId]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = () => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e?.preventDefault();
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async (e) => {
    e?.preventDefault();
    await deleteNote({ id: note.id });
  };

  const created = note?.createdAt
    ? new Date(note.createdAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    : '';

  const updated = note?.updatedAt
    ? new Date(note.updatedAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    : '';

  const options = (users || []).map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validTitleClass = !title ? 'form__input--incomplete' : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        type="button"
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
        aria-label="Delete note"
      >
        <FaTrash />
      </button>
    );
  }

  return (
    <>
      <p className={errClass} aria-live="polite">
        {errContent}
      </p>

      <form className="edit-note-form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>Edit Note #{note?.ticket ?? ''}</h2>
          <div className="form__action-buttons">
            <button
              type="submit"
              className="icon-button"
              title="Save"
              disabled={!canSave}
              aria-label="Save note"
            >
              <FaSave />
            </button>
            {deleteButton}
          </div>
        </div>

        <label className="form__label" htmlFor="note-title">
          Title:
          <input
            className={`form__input ${validTitleClass}`}
            id="note-title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
            aria-required="true"
          />
        </label>

        <label className="form__label" htmlFor="note-text">
          Text:
          <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="note-text"
            name="text"
            value={text}
            onChange={onTextChanged}
            aria-required="true"
          />
        </label>

        <div className="form__row">
          <div className="form__divider">
            <label className="form__label form__checkbox-container" htmlFor="note-completed">
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
                aria-checked={completed}
              />
            </label>

            <label className="form__label" htmlFor="note-username">
              ASSIGNED TO:
              <select
                autoComplete="username"
                id="note-username"
                name="username"
                className="form__select"
                value={userId}
                onChange={onUserIdChanged}
                aria-label="Assigned user"
              >
                {options}
              </select>
            </label>
          </div>

          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

EditNoteForm.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    ticket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};

EditNoteForm.defaultProps = {
  users: [],
};

export default EditNoteForm;
