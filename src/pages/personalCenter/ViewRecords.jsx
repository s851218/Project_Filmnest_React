import { Helmet } from "react-helmet-async";
import { ScrollRestoration } from "react-router";

export default function ViewRecords() {
  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>觀看紀錄</title>
      </Helmet>
      <div className="container">
        <h1>觀看紀錄</h1>
      </div>
    </>
  );
}
