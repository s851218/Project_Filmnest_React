import { Helmet } from "react-helmet-async";
import { ScrollRestoration } from "react-router";

export default function FavoriteVideo() {
  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>收藏影音</title>
      </Helmet>

      <div className="container">
        <h1>收藏影音</h1>
      </div>
    </>
  );
}
