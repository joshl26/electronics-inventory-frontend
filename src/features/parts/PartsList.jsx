import { useGetPartsQuery } from "./partsApiSlice";
import { useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import OutletLoadingPage from "../../layout/OutletLoadingPage";
import Part from "../parts/Part";
import partTypes from "../../mock_data/partTypes";
import useAuth from "../../hooks/useAuth";
import "./PartsList.css";

const PartsList = () => {
  const { isManager, isAdmin, isEmployee } = useAuth();
  const [partsListStatus, setPartsListStatus] = useState("All");
  const [partsListSort, setPartsListSort] = useState("Part Number Ascending");
  const [partsListType, setPartsListType] = useState("All");

  //TODO Determnine why the first argument in useGetPartsQuery needs to be undefined here
  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery(undefined, {
    pollingInterval: 1500000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <OutletLoadingPage />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = parts;

    const partsCopy = { ...entities };
    let mappedArray = [];

    const partsArray = Object.keys(partsCopy).map((i) => partsCopy[i]);

    switch (partsListSort) {
      case "Part Number Ascending":
        //  Sort posts in alpahabetical order by partNumber field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) => a.partNumber.localeCompare(b.partNumber), "en", {
              numeric: true,
            }),
        ];
        break;
      case "Part Number Descending":
        //  Sort posts in reverse alpahbetical order by partNumber field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) => b.partNumber.localeCompare(a.partNumber), "en", {
              numeric: true,
            }),
        ];
        break;

      case "Create Date Ascending":
        //  Sort parts in chronological order by createdAt (date/time) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt), "en", {
              numeric: true,
            }),
        ];
        break;
      case "Create Date Descending":
        //  Sort parts in reverse chronological order by createdAt (date/time) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt), "en", {
              numeric: true,
            }),
        ];
        break;
      case "Stock Qty Ascending":
        //  Sort parts in numeric order by qty (number) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) =>
              a.qty
                .toString()
                .localeCompare(b.qty.toString(), "en", { numeric: true })
            ),
        ];
        break;
      case "Stock Qty Descending":
        //  Sort parts in reverse numeric order by qty (number) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) =>
              b.qty
                .toString()
                .localeCompare(a.qty.toString(), "en", { numeric: true })
            ),
        ];
        break;
      case "Backorder Ascending":
        //  Sort parts in numerical order by bacOrder (number) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) =>
              a.backOrder
                .toString()
                .localeCompare(b.backOrder.toString(), "en", { numeric: true })
            ),
        ];
        break;
      case "Backorder Descending":
        //  Sort parts in reverse numerical order by bacOrder (number) field
        mappedArray = [
          ...partsArray
            .slice()
            .sort((a, b) =>
              b.backOrder
                .toString()
                .localeCompare(a.backOrder.toString(), "en", { numeric: true })
            ),
        ];
        break;

      default:
        break;
    }

    var orderedIds = [];

    mappedArray.map((orderedPart) => orderedIds.push(orderedPart.id));

    const tableContent =
      orderedIds?.length &&
      orderedIds.map((partId) => (
        <Part
          key={partId}
          partId={partId}
          partsListSort={partsListSort}
          partsListStatus={partsListStatus}
          partsListType={partsListType}
        />
      ));

    // const tableContent =
    //   ids?.length && ids.map((partId) => <Part key={partId} partId={partId} />);

    const table = (
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
        <tbody>{tableContent}</tbody>
      </table>
    );

    content = (
      <section>
        <div className="section-top-spacer"></div>
        <Row>
          <Col md={10}>
            <h1>Parts Inventory</h1>
          </Col>
          <Col
            style={{
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
            md={2}
          >
            {(isManager || isAdmin || isEmployee) && (
              <Link className="btn-text" to="/dash/parts/new">
                <Button className="btn-style">Add New Part</Button>
              </Link>
            )}
          </Col>
        </Row>
        <div className="vh3-spacer"></div>
        <div className="parts-container">
          <div className="parts-search-bar">
            <Row>
              <div className="vh2-spacer"></div>
              <Col style={{ textAlign: "center" }}>
                <Row style={{ textAlign: "left" }}>
                  <p style={{ lineHeight: "0" }}>Search</p>
                </Row>
                <input
                  name="searchParts"
                  className="parts-search-input"
                  placeholder="Search parts..."
                ></input>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <Row style={{ textAlign: "left" }}>
                  <p style={{ lineHeight: "0" }}>Status</p>
                </Row>
                <Row>
                  <Dropdown className="button-style">
                    <Dropdown.Toggle
                      className="parts-status-dropdown"
                      variant="success"
                      id="dropdown-basic"
                    >
                      {partsListStatus}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="parts-status-dropdown-menu">
                      <Dropdown.Item onClick={() => setPartsListStatus("All")}>
                        All
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListStatus("In Stock")}
                      >
                        In Stock
                      </Dropdown.Item>

                      {/* <Dropdown.Item
                        onClick={() => setPartsListStatus("On Backorder")}
                      >
                        On Backorder
                      </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() => setPartsListStatus("Out of Stock")}
                      >
                        Out of Stock
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <Row style={{ textAlign: "left" }}>
                  <p style={{ lineHeight: "0" }}>Sort</p>
                </Row>
                <Row>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="parts-status-dropdown"
                      variant="success"
                      id="dropdown-basic"
                    >
                      {partsListSort}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="parts-status-dropdown-menu">
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Part Number Ascending")
                        }
                        href="#"
                      >
                        Part Number Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Part Number Descending")
                        }
                        href="#"
                      >
                        Part Number Descending
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => setPartsListSort("Part Name Ascending")}
                        href="#"
                      >
                        Part Name Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Part Name Descending")}
                        href="#"
                      >
                        Part Name Descending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Part Type Ascending")}
                        href="#"
                      >
                        Part Type Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Part Type Descending")}
                        href="#"
                      >
                        Part Type Descending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Part Description Ascending")
                        }
                        href="#"
                      >
                        Part Description Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Part Description Descending")
                        }
                        href="#"
                      >
                        Part Description Descending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Create Date Ascending")
                        }
                        href="#"
                      >
                        Create Date Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          setPartsListSort("Create Date Descending")
                        }
                        href="#"
                      >
                        Create Date Descending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Stock Qty Ascending")}
                        href="#"
                      >
                        Stock Qty Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Stock Qty Descending")}
                        href="#"
                      >
                        Stock Qty Descending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Backorder Ascending")}
                        href="#"
                      >
                        Backorder Ascending
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setPartsListSort("Backorder Descending")}
                        href="#"
                      >
                        Backorder Descending
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <Row style={{ textAlign: "left" }}>
                  <p style={{ lineHeight: "0" }}>Type</p>
                </Row>
                <Row>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="parts-status-dropdown"
                      variant="success"
                      id="dropdown-basic"
                    >
                      {partsListType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="parts-status-dropdown-menu">
                      <Dropdown.Item
                        onClick={() => setPartsListType("All")}
                        href="#/action-3"
                      >
                        All
                      </Dropdown.Item>
                      {partTypes.map((type) => (
                        <Dropdown.Item
                          key={type}
                          onClick={(e) => setPartsListType(e.target.innerHTML)}
                          href="#"
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
          {table}
        </div>
      </section>
    );
  }

  return content;
};

export default PartsList;
