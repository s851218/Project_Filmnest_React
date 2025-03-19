import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { setLogout } from "../slice/userSlice";
import axios from "axios";
import { Toast } from "../assets/js/costomSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function AdminHeader() {
  const profile = useSelector((state) => state.user.profile);
  const id = useSelector((state) => state.user.profile.userId);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.patch(`${apiBase}/users/${id}`, { token: "" });
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      dispatch(setLogout());
      Toast.fire({
        icon: "success",
        title: "登出成功",
      })
      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "登出失敗",
      })
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark py-4 bg-primary-10">
        <div className="container">
          <div className="d-block d-lg-none">
            <NavLink type="button" className="navbar-toggler border-0 me-3" to="/adminHeaderSm">
              <span className="navbar-toggler-icon"></span>
            </NavLink>
          </div>
          <NavLink className="p-0 me-12" to="/admin/adminProjectsHome">
            Studio
          </NavLink>
          <div className="ms-auto d-none d-lg-block">
            {profile.token ? (
              <>
                <NavLink to="/personalCenter" className="btn btn-outline-light  fw-bolder py-1 px-1 me-8 border-0">
                  <span className="me-2">{profile.userName}</span> <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
                </NavLink>
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                  登出
                </button>
              </>
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
