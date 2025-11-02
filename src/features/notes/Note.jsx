import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGlasses } from 'react-icons/fa';
import { selectNoteById } from './notesApiSlice';

function Note({ noteId }) {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const handleEdit = (e) => {
      // stop event propagation when called from the inner button to avoid double navigation
      if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
      navigate(`/dash/notes/${noteId}`);
    };

    return (
      <tr onClick={() => handleEdit()} className="note-list-row">
        <td className="note-status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="note-created">{created}</td>
        <td className="note-updated">{updated}</td>
        <td className="note-title">{note.title}</td>
        <td className="note-username">{note.username}</td>
        <td className="note-edit">
          <button
            type="button"
            className="icon-button-edit"
            onClick={handleEdit}
            aria-label={`View note ${note.title}`}
          >
            <FaGlasses />
          </button>
        </td>
      </tr>
    );
  }
  return null;
}

Note.propTypes = {
  noteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Note;
