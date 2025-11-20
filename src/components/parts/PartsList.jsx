// Presentational component that focuses on UI rendering
// file: src/components/parts/PartsList/PartsList.jsx

import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartsTable from "./PartsTable";
import PartsSearchBar from "./PartsSearchBar";

const PartsList = ({
  parts,
  searchQuery,
  statusFilter,
  sortOption,
  typeFilter,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onTypeChange,
  canAddParts,
}) => {
  return (
    <section>
      <div className="section-top-spacer" />

      {/* Header Section */}
      <Row>
        <Col md={10}>
          <h1>Parts Inventory</h1>
        </Col>
        <Col
          md={2}
          style={{
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {canAddParts && (
            <Link className="btn-text" to="/dash/parts/new">
              <Button className="btn-style">Add New Part</Button>
            </Link>
          )}
        </Col>
      </Row>

      <div className="vh3-spacer" />

      {/* Main Content */}
      <div className="parts-container">
        <PartsSearchBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          sortOption={sortOption}
          typeFilter={typeFilter}
          onSearchChange={onSearchChange}
          onStatusChange={onStatusChange}
          onSortChange={onSortChange}
          onTypeChange={onTypeChange}
        />

        <PartsTable
          parts={parts}
          sortOption={sortOption}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
        />

        {parts.length === 0 && (
          <div className="no-results">
            <p>No parts found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

PartsList.propTypes = {
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
  searchQuery: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
  typeFilter: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  canAddParts: PropTypes.bool.isRequired,
};

export default PartsList;
