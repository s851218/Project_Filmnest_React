import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <div className="row">
        <div className="col-md-2 d-none d-md-block">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
