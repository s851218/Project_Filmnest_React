import PropTypes from "prop-types";
import ReactLoading from "react-loading";

export default function GrayScreenLoading({ isLoading = false }) {
  return (
    <>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(35, 35, 35, 0.98)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="3rem" height="3rem" />
        </div>
      )}
    </>
  );
}
GrayScreenLoading.propTypes = {
  isLoading: PropTypes.bool,
};
