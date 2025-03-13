import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
import { Outlet } from "react-router";

export default function PersonalCenter() {
  return (
    <>
      <div className="container container-lg pt-18 pb-11 py-lg-20">
        <div className="row row-lg pt-8">
          <div className="col-lg-2 px-5 bg-primary-8 rounded-4 d-none d-lg-block">
            <PersonalCenterSidebar />
          </div>
          <div className="col-lg-10 px-0 px-lg-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
