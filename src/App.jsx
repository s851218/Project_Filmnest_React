import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
