import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";

function App() {
  const location = useLocation();

  // 不顯示Header和Footer頁面
  const layoutHiddenRoutes = ["/headerSm", "/headerSmSec"];

  const shouldHideLayout = layoutHiddenRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideLayout && <Header />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
