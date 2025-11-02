import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPartById } from './partsApiSlice';
import './PartsList.css';

function Part({ partId }) {
  const part = useSelector((state) => selectPartById(state, partId));
  const navigate = useNavigate();

  if (part) {
    const handleEdit = () => navigate(`/dash/parts/${partId}`);

    return (
      <tr onClick={handleEdit} className="part-list-row">
        <td className="part-number">{part.partNumber}</td>
        <td className="part-name">{part.name}</td>
        <td className="part-type">{part.partType}</td>
        <td className="part-description">{part.description}</td>
        <td className="part-qty">{part.qty}</td>
        <td className="part-backqty">{part.backOrder}</td>
        <td className="part-edit">
          <button
            type="button"
            className="icon-button-edit table__button"
            onClick={(e) => {
              e.stopPropagation(); // prevent double navigation from the row click
              handleEdit();
            }}
            aria-label={`Edit part ${part.partNumber}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }

  // Valid table fallback when no part found
  return (
    <tr>
      <td colSpan="7" className="no-parts">
        <h3>No parts to show</h3>
      </td>
    </tr>
  );
}

Part.propTypes = {
  partId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Part;
