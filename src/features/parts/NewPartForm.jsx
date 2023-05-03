import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPartMutation } from "./partsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
// import { set } from "lodash";
import useAuth from "../../hooks/useAuth";
import { FilePicker } from "../../components/FilePicker";

const NewPartForm = ({ users, partTypes }) => {
  const { username, isManager, isAdmin } = useAuth();

  console.log(username);

  const [addNewPart, { isLoading, isSuccess, isError, error }] =
    useAddNewPartMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [qty, setQty] = useState(0);
  const [partType, setPartType] = useState("None");
  // const [updatedBy, setUpdatedBy] = useState(username);
  // const [updatedAt, setUpdatedAt] = useState(updated);
  const [images, setImages] = useState([]);
  const [partNumber, setPartNumber] = useState("None");
  const [lotId, setLotId] = useState("None");
  const [serialNumber, setSerialNumber] = useState("None");
  const [manufacturer, setManufacturer] = useState("None");
  const [mfgDate, setMfgDate] = useState("None");
  const [backOrder, setBackOrder] = useState(0);
  const [vendorName, setVendorName] = useState("None");
  const [partPackage, setPartPackage] = useState("None");
  const [partLocation, setPartLocation] = useState("None");
  const [cost, setCost] = useState(0.0);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setDescription("");
      setUserId("");
      setQty(0);
      setPartType("");
      setImages([]);
      setPartNumber("");
      setLotId("");
      setSerialNumber("");
      setManufacturer("");
      setMfgDate("");
      setBackOrder(0);
      setVendorName("");
      setPartPackage("");
      setPartLocation("");
      setCost(0.0);
      navigate("/dash/parts");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onQtyChanged = (e) => setQty(e.target.value);
  const onPartTypeChanged = (e) => setPartType(e.target.value);
  const onImagesChanged = (e) => setImages(e.target.value);
  const onPartNumberChanged = (e) => setPartNumber(e.target.value);
  const onLotIdChanged = (e) => setLotId(e.target.value);
  const onSerialNumberChanged = (e) => setSerialNumber(e.target.value);
  const onManufacturerChanged = (e) => setManufacturer(e.target.value);
  const onMfgDateChanged = (e) => setMfgDate(e.target.value);
  const onBackOrderChanged = (e) => setBackOrder(e.target.value);
  const onVendorName = (e) => setVendorName(e.target.value);
  const onPartPackageChanged = (e) => setPartPackage(e.target.value);
  const onPartLocationChanged = (e) => setPartLocation(e.target.value);
  const onPartCostChanged = (e) => setCost(e.target.value);

  const canSave = [name, description, userId].every(Boolean) && !isLoading;

  const onSavePartClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewPart({
        user: userId,
        name,
        description,
        qty,
        partType,
        images,
        partNumber,
        lotId,
        serialNumber,
        manufacturer,
        mfgDate,
        backOrder,
        vendorName,
        partPackage,
        partLocation,
      });
    }
  };

  const options = partTypes.map((types, idx) => {
    return (
      <option key={idx} value={types}>
        {types}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validDescriptionClass = !description ? "form__input--incomplete" : "";

  const content = (
    <div>
      <p className={errClass}>{error?.data?.message}</p>
      <form className="form" onSubmit={onSavePartClicked}>
        <div className="form__title-row">
          <h2>Add New Part</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Defaults">
              <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="name">
          Part Name:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />

        <label className="form__label" htmlFor="description">
          Description:
        </label>
        <textarea
          className={`form__input form__input--text ${validDescriptionClass}`}
          id="description"
          name="description"
          value={description}
          onChange={onDescriptionChanged}
        />

        <label className="form__label" htmlFor="qty">
          Qty:
        </label>
        <input
          min="0"
          max="10000"
          className="form__input"
          id="qty"
          name="qty"
          type="number"
          onChange={onQtyChanged}
          value={qty}
        />
        <label className="form__label" htmlFor="parttype">
          Part Type:
        </label>
        <select
          id="parttype"
          name="parttype"
          className="form__select"
          value={partType}
          onChange={onPartTypeChanged}
        >
          {options}
        </select>
        <FilePicker />
      </form>
    </div>
  );

  return content;
};

export default NewPartForm;
