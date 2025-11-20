// Reusable table component for displaying parts
// file: src/components/parts/PartsTable.jsx

import PropTypes from "prop-types";
import Part from "components/features/parts/Part";

const PartsTable = ({ parts, sortOption, statusFilter, typeFilter }) => {
  if (!parts || parts.length === 0) {
    return null;
  }

  return (
    <table className="table table-parts">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="part-number">
            Number
          </th>
          <th scope="col" className="part-name">
            Name
          </th>
          <th scope="col" className="part-type">
            Type
          </th>
          <th scope="col" className="part-description">
            Description
          </th>
          <th scope="col" className="part-qty">
            Qty
          </th>
          <th scope="col" className="part-backqty">
            B/O
          </th>
          <th scope="col" className="note-edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {parts.map((part) => (
          <Part
            key={part.id}
            partId={part.id}
            partsListSort={sortOption}
            partsListStatus={statusFilter}
            partsListType={typeFilter}
          />
        ))}
      </tbody>
    </table>
  );
};

PartsTable.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      partNumber: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string,
      qty: PropTypes.number.isRequired,
      backOrder: PropTypes.number,
    })
  ).isRequired,
  sortOption: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  typeFilter: PropTypes.string.isRequired,
};

export default PartsTable;
