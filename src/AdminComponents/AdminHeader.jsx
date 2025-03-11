import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export default function AdminHeader() {
  const profile = useSelector((state) => state.user.profile);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark py-4 bg-primary-10">
        <div className="container">
          <div className="d-block d-lg-none">
            <NavLink type="button" className="navbar-toggler border-0 me-3" to="/adminHeaderSm">
              <span className="navbar-toggler-icon"></span>
            </NavLink>
          </div>
          <NavLink className="p-0 me-12" to="/admin/adminProfile">
            Studio
          </NavLink>
          <div className="ms-auto d-none d-lg-block">
            {profile.token ? (
              <NavLink to="/personalCenter" className="btn btn-outline-light  fw-bolder py-1 px-1 me-8 border-0">
                <span className="me-2">{profile.userName}</span> <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
              </NavLink>
            ) : (
              <NavLink to="/login" className="btn btn-outline-light fw-bolder py-3 px-5 me-8">
                登入 / 註冊
              </NavLink>
            )}
            <NavLink to="/aboutProposal" className="btn btn-outline-light fw-bolder py-3 px-5 ms-8">
              我要提案
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
