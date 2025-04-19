import { Helmet } from "react-helmet-async";
import PersonalCenterSidebar from "../../components/PersonalCenterSidebar";
import { Outlet } from "react-router";

export default function PersonalCenter() {
  return (
    <>
      <Helmet>
        <title>編輯個人資料</title>
      </Helmet>
      <div className="container container-lg pt-18 pt-lg-20">
        <div className="row row-lg py-5 py-lg-8">
          <div className="col-xl-2 col-lg-3 mb-5 mb-lg-0">
            <PersonalCenterSidebar />
          </div>
          <div className="col-xl-10 col-lg-9 px-0 px-lg-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
