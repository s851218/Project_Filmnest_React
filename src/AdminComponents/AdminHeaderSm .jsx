import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../slice/userSlice";
import axios from "axios";
import { Toast } from "../assets/js/costomSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function AdminHeaderSm() {
  const profile = useSelector((state) => state.user.profile);
  const id = useSelector((state) => state.user.profile.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.patch(`${apiBase}/users/${id}`, { token: "" });
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      Toast.fire({
        icon: "success",
        title: "登出成功",
      });
      dispatch(setLogout());
      navigate("/");
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "登出失敗",
        });
      }
    }
  };

  return (
    <>
      <div className="py-4 bg-primary-10 d-flex align-items-center">
        <Link className="p-0 me-3" onClick={() => navigate(-1)}>
          <img src="close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="logo" style={{ width: "20px" }} />
        </Link>
        <Link className="p-0 me-12" to="/admin/adminProjectsHome">
          Studio
        </Link>
      </div>
      <ul className="nav flex-column">
        {profile.token ? (
          <Link to="/personalCenter" className="d-flex justify-content-between align-items-center fw-bolder py-3 px-5 btn btn-primary-8 border-0 border-bottom">
            <div>
              <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
              <span className="ms-2">{profile.userName}</span>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary-8 border-0 border-bottom fw-bolder py-3">
            登入 / 註冊
          </Link>
        )}
        <Link className="nav-item py-3 mt-3 btn btn-primary border-0 fw-bolder">我要提案</Link>
        <Link to="/" className="nav-item py-3 mt-3 btn btn-primary border-0 fw-bolder">
          離開工作室
        </Link>
        <Link className="nav-item py-3 mt-3 btn btn-primary border-0 fw-bolder" onClick={handleLogout}>
          登出
        </Link>
      </ul>
    </>
  );
}
