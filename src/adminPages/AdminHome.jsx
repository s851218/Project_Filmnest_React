import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <div className="pt-3 pt-lg-8">
        <div className="row">
          <div className="col-lg-2 px-5 bg-white rounded-4">
            <AdminSidebar />
          </div>
          <div className="col-12 col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
