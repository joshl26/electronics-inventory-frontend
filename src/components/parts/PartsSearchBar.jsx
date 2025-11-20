// Reusable search bar component for filtering parts
// file: src/components/parts/PartsSearchBar/PartsSearchBar.jsx

import PropTypes from "prop-types";
import { Col, Dropdown, Row } from "react-bootstrap";
import partTypes from "mock_data/partTypes";

const SORT_OPTIONS = [
  "Part Number Ascending",
  "Part Number Descending",
  "Part Name Ascending",
  "Part Name Descending",
  "Part Type Ascending",
  "Part Type Descending",
  "Part Description Ascending",
  "Part Description Descending",
  "Create Date Ascending",
  "Create Date Descending",
  "Stock Qty Ascending",
  "Stock Qty Descending",
  "Backorder Ascending",
  "Backorder Descending",
];

const STATUS_OPTIONS = ["All", "In Stock", "Out of Stock"];

const PartsSearchBar = ({
  searchQuery,
  statusFilter,
  sortOption,
  typeFilter,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onTypeChange,
}) => {
  return (
    <div className="parts-search-bar">
      <Row>
        <div className="vh2-spacer" />

        {/* Search Input */}
        <Col style={{ textAlign: "center" }}>
          <Row style={{ textAlign: "left" }}>
            <p style={{ lineHeight: "0" }}>Search</p>
          </Row>
          <input
            name="searchParts"
            className="parts-search-input"
            placeholder="Search parts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search parts by number, name, description, or type"
          />
        </Col>

        {/* Status Filter */}
        <Col style={{ textAlign: "center" }}>
          <Row style={{ textAlign: "left" }}>
            <p style={{ lineHeight: "0" }}>Status</p>
          </Row>
          <Row>
            <Dropdown className="button-style">
              <Dropdown.Toggle
                className="parts-status-dropdown"
                variant="success"
                id="dropdown-status"
                aria-label="Filter by status"
              >
                {statusFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu className="parts-status-dropdown-menu">
                {STATUS_OPTIONS.map((status) => (
                  <Dropdown.Item
                    key={status}
                    onClick={() => onStatusChange(status)}
                    active={statusFilter === status}
                  >
                    {status}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>

        {/* Sort Options */}
        <Col style={{ textAlign: "center" }}>
          <Row style={{ textAlign: "left" }}>
            <p style={{ lineHeight: "0" }}>Sort</p>
          </Row>
          <Row>
            <Dropdown>
              <Dropdown.Toggle
                className="parts-status-dropdown"
                variant="success"
                id="dropdown-sort"
                aria-label="Sort parts"
              >
                {sortOption}
              </Dropdown.Toggle>
              <Dropdown.Menu className="parts-status-dropdown-menu">
                {SORT_OPTIONS.map((option) => (
                  <Dropdown.Item
                    key={option}
                    onClick={() => onSortChange(option)}
                    active={sortOption === option}
                  >
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>

        {/* Type Filter */}
        <Col style={{ textAlign: "center" }}>
          <Row style={{ textAlign: "left" }}>
            <p style={{ lineHeight: "0" }}>Type</p>
          </Row>
          <Row>
            <Dropdown>
              <Dropdown.Toggle
                className="parts-status-dropdown"
                variant="success"
                id="dropdown-type"
                aria-label="Filter by part type"
              >
                {typeFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu className="parts-status-dropdown-menu">
                <Dropdown.Item
                  onClick={() => onTypeChange("All")}
                  active={typeFilter === "All"}
                >
                  All
                </Dropdown.Item>
                {partTypes.map((type) => (
                  <Dropdown.Item
                    key={type}
                    onClick={() => onTypeChange(type)}
                    active={typeFilter === type}
                  >
                    {type}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

PartsSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  sortOption: PropTypes.string.isRequired,
  typeFilter: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
};

export default PartsSearchBar;
