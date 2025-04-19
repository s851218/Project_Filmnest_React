import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import { setSearchValue, setIsSearchOpen } from "../slice/searchSlice";
import { setLogout } from "../slice/userSlice";
import axios from "axios";
import { Toast } from "../js/customSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function HeaderSm() {
  const profile = useSelector((state) => state.user.profile);
  const id = useSelector((state) => state.user.profile.userId);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const [isExpand, setIsExpand] = useState({ category: false });
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
  const handleIsExpand = () => {
    setIsExpand((prev) => ({ ...prev, category: !prev.category }));
  };
  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setSearchValue("");
    }
    dispatch(setIsSearchOpen(!isSearchOpen));
  };
  // 返回上一頁有問題，需點擊兩次
  const handleReturnPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <>
      <div className="py-3 d-flex justify-content-between container">
        <div>
          <Link className="me-3" onClick={(e)=>handleReturnPage(e)}>
            <img src="close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="close" style={{ width: "20px" }} />
          </Link>
          <Link to="/">
            <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
          </Link>
        </div>
        <div className="nav-item">
          <div className="search-container">
            <button
              className={`search-icon ${isSearchOpen ? "d-none" : ""}`}
              type="button"
              onClick={() => {
                handleSearchToggle();
                navigate("/headerSmSearch");
              }}
            >
              <span className="fw-bolder me-2 text-white">搜尋</span>
              <span className="material-symbols-outlined text-white">search</span>
            </button>
          </div>
        </div>
      </div>
      <ul className="nav flex-column">
        {profile.token ? (
          <Link to="/headerSmSec" className="d-flex justify-content-between align-items-center fw-bolder btn btn-primary-8 btn-main border-0 border-bottom">
            <div>
              <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
              <span className="ms-2">{profile.userName}</span>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary-8 btn-main border-0 border-bottom fw-bolder">
            登入 / 註冊
          </Link>
        )}
        <Link className="nav-item btn-main border-bottom" onClick={() => handleIsExpand()}>
          探索
        </Link>
        {isExpand.category && (
          <>
            <li>
              <Link className="dropdown-item py-2 px-5" to="/projectExplore" onClick={() => dispatch(setCategory("all"))} onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")} onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}>
                <img src="全部專案.png" alt="全部專案" className="me-2" style={{ width: "24px" }} />
                全部專案
              </Link>
            </li>
            {categoryData.map((item, index) => {
              return (
                <li key={index}>
                  <Link className="dropdown-item py-2 px-5" to="/projectExplore" onClick={() => dispatch(setCategory(item))} onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")} onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}>
                    <img src={`${item}.png`} alt={item} className="me-2" style={{ width: "24px" }} />
                    {item}
                  </Link>
                </li>
              );
            })}
          </>
        )}
        {profile.hasStudio && (
          <Link to="/admin/adminProfile" className={`nav-item mt-3 btn btn-primary btn-main border-0 fw-bolder ${!profile.token ? "d-none" : ""}`}>
            工作室
          </Link>
        )}
        <Link className="nav-item mt-3 btn btn-primary btn-main border-0 fw-bolder">我要提案</Link>
        <Link className="nav-item mt-3 btn btn-primary btn-main border-0 fw-bolder" onClick={handleLogout}>
          登出
        </Link>
      </ul>
    </>
  );
}
