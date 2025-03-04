import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../slice/userSlice";
import { useNavigate } from "react-router";

export default function HeaderSmSec() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/headerSm");
  };
  return (
    <>
      <div className="mb-3">
        <Link className="p-0 me-3" to="/">
          <img src="close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="logo" style={{ width: "20px" }} />
        </Link>
        <Link className="p-0 me-12" to="/">
          <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
        </Link>
      </div>
      <ul className="nav flex-column">
        {profile.token ? (
          <Link to="/headerSm" className="d-flex align-items-center fw-bolder py-3 px-5 btn btn-primary-8 border-0 border-bottom">
            <div>
              <i className="bi bi-chevron-left me-3"></i>
            </div>
            <div>返回</div>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary-8 border-0 border-bottom fw-bolder py-3">
            登入 / 註冊
          </Link>
        )}
        <Link className="nav-item px-5 py-3 border-bottom">個人頁面</Link>
        <Link className="nav-item px-5 py-3">贊助紀錄</Link>
        <Link className="nav-item px-5 py-3">提案紀錄</Link>
        <Link className="nav-item px-5 py-3 border-bottom">收藏專案</Link>
        <Link className="nav-item px-5 py-3 border-bottom">編輯個人資料</Link>
        <Link className="nav-item px-5 py-3" onClick={handleLogout}>
          登出
        </Link>
      </ul>
    </>
  );
}
