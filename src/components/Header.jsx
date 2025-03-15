import { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import { setSearchText, setSearchValue, setIsSearchOpen } from "../slice/searchSlice";
import { setLogout } from "../slice/userSlice";
import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const id = useSelector((state) => state.user.profile.userId);
  const searchValue = useSelector((state) => state.search.value);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
  const navbarRef2 = useRef(null);
  const searchContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.patch(`${apiBase}/users/${id}`, { token: "" });
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      dispatch(setLogout());
      navigate("/");
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
  useEffect(() => {
    const handleScroll2 = () => {
      navbarRef2.current.scrollY = window.scrollY;

      if (navbarRef2.current.scrollY > 0) {
        navbarRef2.current.classList.add("active");
      } else {
        navbarRef2.current.classList.remove("active");
      }
    };
    window.addEventListener("scroll", handleScroll2);

    return () => {
      window.removeEventListener("scroll", handleScroll2);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        dispatch(setIsSearchOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchToggle = (e) => {
    console.log(buttonRef.current.contains(e.target));

    if (buttonRef.current.contains(e.target)) {
      navigate("/headerSm");
    } else {
      dispatch(setIsSearchOpen(!isSearchOpen));
    }
  };

  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      dispatch(setSearchText(searchValue));
      navigate("/projectExplore");
    } else {
      dispatch(setSearchText(""));
      navigate("/projectExplore");
    }
  };

  useEffect(() => {
    if (!isSearchOpen) {
      dispatch(setSearchValue(""));
      dispatch(setSearchText(""));
    }
  }, [isSearchOpen]);

  return (
    <>
      <nav ref={navbarRef} className="navbar navbar-expand-md navbar-dark py-5 d-none d-lg-flex">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            <img src="data:image/png;base64,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" alt="logo" />
          </NavLink>
          <Link type="button" className="navbar-toggler border-0 ms-auto d-lg-none" to="/headerSm">
            <span className="navbar-toggler-icon"></span>
          </Link>
          <div className="collapse navbar-collapse text-white">
            <div className="p-0 me-12 dropdown nav-item">
              <button className="btn btn-outline-light border-0 fw-bolder dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                探索
              </button>
              <ul className="dropdown-menu py-0">
                <li>
                  <Link className="btn btn-outline-secondary text-white border-0 w-100 d-flex align-items-center" to="/projectExplore" onClick={() => dispatch(setCategory("all"))}>
                    <img src="全部專案.png" alt="全部專案" className="me-2" style={{ width: "24px" }} />
                    全部專案
                  </Link>
                </li>
                {categoryData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link className="btn btn-outline-secondary text-white border-0 w-100 d-flex align-items-center" to="/projectExplore" onClick={() => dispatch(setCategory(item))}>
                        <img src={`${item}.png`} alt={item} className="me-2" style={{ width: "24px" }} />
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-0 me-12 nav-item ">
              <div ref={searchContainerRef} className="search-container">
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
            {profile.hasStudio && (
              <div className={`p-0 me-12 nav-item ${!profile.token && "d-none"}`}>
                <NavLink to="/admin/adminProjectsHome">工作室</NavLink>
              </div>
            )}
            <div className="ms-auto d-flex flex-column flex-lg-row align-items-center">
              {profile.token ? (
                <>
                  <div className="collapse navbar-collapse text-white">
                    <div className="p-0 me-12 dropdown nav-item">
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
                          <Link className="btn btn-outline-secondary text-white border-0 d-flex align-items-center" to="/personalCenter/orderRecords">
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
      <nav ref={navbarRef2} className="navbar navbar-expand-md navbar-dark py-5 d-lg-flex d-lg-none">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
          </NavLink>
          <Link ref={buttonRef} type="button" className="navbar-toggler border-0 ms-auto d-block" onClick={handleSearchToggle} to="/headerSm">
            <span className="navbar-toggler-icon"></span>
          </Link>
        </div>
      </nav>
    </>
  );
}
