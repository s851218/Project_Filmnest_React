import ReactLoading from "react-loading";

export default function GrayScreenLoading({
  isLoading,
  studioProfileIsLoading,
  projectDataIsLoading,
}) {
  return (
    <>
      {(isLoading || studioProfileIsLoading || projectDataIsLoading) && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(63, 63, 63, 0.9)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="3rem" height="3rem" />
        </div>
      )}
    </>
  );
}
