import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <div className="row pt-3 pb-0 py-lg-8">
        <div className="col-xl-2 col-lg-3 px-4">
          <AdminSidebar />
        </div>
        <div className="col-xl-10 col-lg-9 col px-0 px-sm-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
