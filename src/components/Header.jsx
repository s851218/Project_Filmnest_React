import { useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import { setSearchText, setSearchValue, setIsSearchOpen } from "../slice/searchSlice";
import { setLogout } from "../slice/userSlice";
import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const id = useSelector((state)=>state.user.profile.userId);
  const searchValue = useSelector((state) => state.search.value);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.patch(`${apiBase}/users/${id}`, { token: "" });
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      dispatch(setLogout());
      navigate("/")
      alert("登出成功");
    } catch (error) {
      alert("登出失敗");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      navbarRef.current.scrollY = window.scrollY;

      if (navbarRef.current.scrollY > 0) {
        navbarRef.current.classList.add("active");
      } else {
        navbarRef.current.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setSearchValue("");
    }
    dispatch(setIsSearchOpen(!isSearchOpen));
  };

  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      dispatch(setSearchText(searchValue));
      navigate("/projectExplore");
    }
  };

  return (
    <>
      <nav ref={navbarRef} className="navbar navbar-expand-md navbar-dark py-5 d-none d-lg-flex">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
          </NavLink>
          <Link type="button" className="navbar-toggler border-0 ms-auto d-lg-none" to="/headerSm">
            <span className="navbar-toggler-icon"></span>
          </Link>
          <div className="collapse navbar-collapse text-white">
            <div className="p-0 me-12 dropdown nav-item">
              <button className="btn btn-outline-light border-0 fw-bolder dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                探索
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item mb-2" to="/projectExplore" onClick={() => dispatch(setCategory("all"))}>
                    <img src="全部專案.png" alt="全部專案" className="me-2" style={{ width: "24px" }} />
                    全部專案
                  </Link>
                </li>
                {categoryData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="dropdown-item mb-2" to="/projectExplore" onClick={() => dispatch(setCategory(item))}>
                        <img src={`${item}.png`} alt={item} className="me-2" style={{ width: "24px" }} />
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-0 me-12 nav-item ">
              <div className="search-container">
                <button className={`search-icon ${isSearchOpen ? "d-none" : ""}`} type="button" onClick={handleSearchToggle}>
                  <span className="fw-bolder me-2 text-white">搜尋</span>
                  <span className="material-symbols-outlined text-white">search</span>
                </button>
                <div className={`search-input-container ${isSearchOpen ? "open" : ""}`}>
                  <input type="text" className="search-input" placeholder="輸入影片名稱" value={searchValue} onChange={(e) => dispatch(setSearchValue(e.target.value))} />
                  <span className="material-symbols-outlined search-input-search-icon" onClick={handleSearchSubmit}>
                    Search
                  </span>
                  <span className="material-symbols-outlined search-input-close-icon" onClick={handleSearchToggle}>
                    Close
                  </span>
                </div>
              </div>
            </div>
            <div className={`p-0 me-12 nav-item ${!profile.token && "d-none"}`}>
              <NavLink to="/admin/adminProfile">工作室</NavLink>
            </div>
            <div className="p-0 me-12 nav-item">
              <NavLink to="/aboutStudio">提案者頁面</NavLink>
            </div>
            <div className="ms-auto d-flex flex-column flex-lg-row align-items-center">
              {profile.token ? (
                <>
                  <button type="button" className="btn btn-primary" onClick={handleLogout}>
                    登出
                  </button>
                  <NavLink to="/personalCenter" className="btn btn-outline-light fw-bolder py-1 px-1 me-8 border-0">
                    <span className="me-2">{profile.userName}</span> <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
                  </NavLink>
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
      <nav ref={navbarRef} className="navbar navbar-expand-md navbar-dark py-5 d-lg-flex d-lg-none">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
          </NavLink>
          <Link type="button" className="navbar-toggler border-0 ms-auto d-block" to="/headerSm">
            <span className="navbar-toggler-icon"></span>
          </Link>
        </div>
      </nav>
    </>
  );
}
