import AdminHeader from "./AdminComponents/AdminHeader";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function Admin() {
  return (
    <>
      <AdminHeader />
      <div className="text-dark" style={{ background: "#FAFAFA" }}>
        <div className="container-fluid mt-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
