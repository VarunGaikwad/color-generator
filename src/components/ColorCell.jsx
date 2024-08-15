import PropTypes from "prop-types";

ColorCell.propTypes = {
  color: PropTypes.string.isRequired,
  onCellClick: PropTypes.func.isRequired,
};

export default function ColorCell({ color, onCellClick }) {
  return (
    <div onClick={() => onCellClick(color)} className="color-cell">
      <div
        className="h-40 w-28 rounded-lg"
        style={{ backgroundColor: color }}
      />
      <span className="mt-2 font-bold">{color}</span>
    </div>
  );
}
