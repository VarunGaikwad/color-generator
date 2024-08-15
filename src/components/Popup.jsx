import PropTypes from "prop-types";

Popup.propTypes = {
  colorCode: PropTypes.string.isRequired,
};
export default function Popup({ colorCode }) {
  return (
    <div className="popup">
      Color <span className="text-neutral-100 font-medium">{colorCode}</span>{" "}
      copied to your clipboard
    </div>
  );
}
