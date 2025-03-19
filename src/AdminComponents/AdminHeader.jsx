import { Link, NavLink, useNavigate } from "react-router";
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
      });
      navigate("/");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "登出失敗",
      });
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
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-center">
              {profile.token ? (
                <>
                  <div className="collapse navbar-collapse text-white">
                    <div className="p-0 me-8 dropdown nav-item">
                      <button className="btn btn-outline-secondary text-white border-0 fw-bolder" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="me-2">{profile.userName}</span> <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
                      </button>
                      <ul className="dropdown-menu py-0">
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/profile">
                            <span className="material-symbols-outlined fs-7 me-3">manage_accounts</span>
                            <span>個人資料</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/favoriteProject">
                            <span className="material-symbols-outlined fs-7 me-3">favorite</span>
                            <span>收藏專案</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/orderRecords/orderRecordsAll">
                            <span className="material-symbols-outlined fs-7 me-3">receipt_long</span>
                            <span>訂單紀錄</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/favoriteVideo">
                            <span className="material-symbols-outlined fs-7 me-3">movie</span>
                            <span>收藏影音</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/viewRecords">
                            <span className="material-symbols-outlined fs-7 me-3">subscriptions</span>
                            <span>觀看紀錄</span>
                          </Link>
                        </li>
                        <li>
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" onClick={handleLogout}>
                            <span class="material-symbols-outlined fs-7 me-3">exit_to_app</span>
                            <span>登出</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <NavLink to="/login" className="btn btn-outline-light fw-bolder py-3 px-5 me-8">
                  登入 / 註冊
                </NavLink>
              )}
              <div className="border-start border-white d-none d-lg-block mx-3" style={{ height: "20px" }}></div>

              <NavLink to="/aboutProposal" className="btn btn-outline-light fw-bolder py-3 px-5 ms-8">
                我要提案
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
