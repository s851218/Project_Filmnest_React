import { useDispatch } from "react-redux";
import { setLogout } from "../slice/userSlice";
import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
import { Outlet } from "react-router";

export default function PersonalCenter() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <>
      <div className="container d-none d-lg-block pt-18 pb-11 py-lg-20">
        <div className="row pt-8">
          <div className="col-2 px-5 bg-primary-8 rounded-4">
            <PersonalCenterSidebar />
          </div>
          <div className="col-10 px-1">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none pt-18 pb-11 py-lg-20">
        <PersonalCenterSidebar />
        <Outlet />
      </div>
      <div className="container pt-20 pb-10">
        <h1>會員中心</h1>
        <button type="button" className="btn btn-info" onClick={handleLogout}>
          登出
        </button>
      </div>
    </>
  );
}
