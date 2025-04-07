import { Outlet } from "react-router";
import AdminSidebar from "../AdminComponents/AdminSidebar";

export default function AdminHome() {
  return (
    <>
      <div className="py-3 py-lg-8">
        <div className="row">
          <div className="col-lg-2">
            <div className="row mb-3">
              <div className="col bg-white rounded-5">
                <AdminSidebar />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
