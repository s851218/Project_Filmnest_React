import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <div className="d-none d-lg-block pt-8">
        <div className="row">
          <div className="col-2">
            <AdminSidebar />
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none pt-3">
        <AdminSidebar />
        <Outlet />
      </div>
    </>
  );
}
