import PropTypes from "prop-types";
import Popup from "./Popup";
import { useState } from "react";

ColorCell.propTypes = {
  color: PropTypes.string.isRequired,
};

export default function ColorCell({ color }) {
  const [copiedColor, setCopiedColor] = useState(""),
    [isPopVisible, setIsPopVisible] = useState(false),
    onCellClick = (color) => {
      setIsPopVisible(true);
      setTimeout(() => setIsPopVisible(false), 2500);
      navigator.clipboard.writeText(color);
      setCopiedColor(color);
    };

  return (
    <div onClick={() => onCellClick(color)} className="color-cell">
      <div
        className="h-40 w-28 rounded-lg"
        style={{ backgroundColor: color }}
      />
      <span className="mt-2 font-bold">{color}</span>
      {isPopVisible && <Popup colorCode={copiedColor} />}
    </div>
  );
}
