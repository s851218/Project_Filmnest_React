import AdminHeader from "./components/AdminHeader";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function Admin() {
  return (
    <>
      <AdminHeader />
      <div className="bg-white text-dark">
        <div className="container mt-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
