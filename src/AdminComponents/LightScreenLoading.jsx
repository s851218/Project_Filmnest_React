import ReactLoading from "react-loading";

export default function LightScreenLoading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="3rem" height="3rem" />
        </div>
      )}
    </>
  );
}
