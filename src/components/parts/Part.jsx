import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPartById } from "../../features/parts/partsApiSlice";
import "./PartsList.css";

const Part = ({ partId, partsListStatus, partsListType }) => {
  const part = useSelector((state) => selectPartById(state, partId));
  const navigate = useNavigate();
  const handleEdit = () => navigate(`/dash/parts/${partId}`);

  const partTypeTernary =
    partsListType === "All" ? true : part.partType === `${partsListType}`;

  const partStatusTernary =
    partsListStatus === "All"
      ? true
      : partsListStatus === "In Stock"
      ? part.qty > 0
      : part.qty === 0;

  const ternaryStatement = partStatusTernary && partTypeTernary;

  if (part) {
    if (ternaryStatement) {
      return (
        <tr onClick={() => handleEdit()} className="part-list-row">
          <td className="part-number">{part.partNumber}</td>
          <td className="part-name">{part.name}</td>
          <td className="part-type">{part.partType}</td>
          <td className="part-description">{part.description}</td>
          <td className="part-qty">{part.qty}</td>
          <td className="part-backqty">{part.backOrder}</td>
          <td className="part-edit">
            <button
              className="icon-button-edit table__button"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </td>
        </tr>
      );
    } else {
      return "";
    }
  }
};

export default Part;
