import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <h1>Studio 主頁</h1>
      <div className="row">
        <div className="col-2 ">
          <AdminSidebar />
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
