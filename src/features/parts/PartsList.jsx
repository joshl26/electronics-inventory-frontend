// import str from "../../mock_data/parts.json";

import { useGetPartsQuery } from "./partsApiSlice";
import { useUpdateUserMutation, selectAllUsers } from "../users/usersApiSlice";
import PartCard from "../../components/PartCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import React, { useState } from "react";
import Part from "../parts/Part";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const PartsList = () => {
  const [partsListView, setPartsListView] = useState("");

  const { username } = useAuth();

  const users = useSelector((state) => selectAllUsers(state));

  let currentUser = users.find((user) => user.username === username);

  // console.log(currentUser.partsListView);

  // console.log(currentUser.partsListView);

  // if (currentUser.partsListView) {
  //   setPartsListView(currentUser.partsListView);
  // }
  const [colorMode] = useState("");

  const [updateUser] = useUpdateUserMutation();

  // useEffect(() => {
  //   async function asyncCall() {
  //     console.log("calling");
  //     const result = await currentUser.partsListView;
  //     setPartsListView(currentUser.partsListView);
  //     console.log(result);
  //     // Expected output: "resolved"
  //   }
  //   return () => {
  //     asyncCall();
  //   };
  // }, [currentUser.partsListView]);

  const onSaveUserClicked = async (e) => {
    await updateUser({
      id: currentUser.id,
      username,
      roles: currentUser.roles,
      active: currentUser.active,
      colorMode,
      partsListView,
    });

    setPartsListView(e.target.value);
  };

  const radios = [
    { name: "Table View", value: "Card" },
    { name: "Card View", value: "Table" },
  ];

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

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = parts;

    const cardContent =
      ids?.length &&
      ids.map((partId) => <PartCard key={partId} partId={partId} />);

    const tableContent =
      ids?.length && ids.map((partId) => <Part key={partId} partId={partId} />);

    const table = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Part Name
            </th>
            <th scope="col" className="table__th note__title">
              Part Type
            </th>
            <th scope="col" className="table__th note__updated">
              Qty
            </th>
            <th scope="col" className="table__th note__created">
              Description
            </th>
            <th scope="col" className="table__th note__edit">
              Images
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );

    content = (
      <>
        <Container>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-success" : "outline-danger"}
                name="radio"
                value={radio.value}
                checked={partsListView === radio.value}
                onChange={(e) => onSaveUserClicked(e)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>

        {partsListView === "Card" ? table : cardContent}
      </>
    );
  }

  return content;
};

export default PartsList;
