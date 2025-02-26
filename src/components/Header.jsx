import { useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import { Collapse } from "bootstrap";

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
  const collapseRef = useRef(null);

  const handleNavbarListOpen = () => {
    const collapsibleInstance = Collapse.getInstance(collapseRef.current);
    collapsibleInstance.toggle();
  };

  useEffect(() => {
    new Collapse(collapseRef.current, {
      toggle: false,
    });
  }, []);
  console.log(window.screen);

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

  return (
    <>
      <nav ref={navbarRef} className="navbar navbar-expand-md navbar-dark py-5">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            <img src="https://github.com/s851218/Project-FilmNest/blob/main/assets/images/logo.png?raw=true" alt="logo" />
          </NavLink>
          <NavLink className="p-0 me-12" to="/projectExplore">
            探索
          </NavLink>
          <NavLink className="p-0 me-12" to="/admin/adminProfile">
            後台頁面
          </NavLink>
          <NavLink to="/aboutStudio" className="p-0 me-12">
            提案者頁面
          </NavLink>
          <NavLink to="/projectIntro" className="p-0 me-12">
            專案介紹頁面
          </NavLink>
          <div className="ms-auto d-flex align-items-center">
            {profile.token ? (
              <NavLink to="/personalCenter" className="btn btn-outline-light fw-bolder py-1 px-1 me-3 border-0">
                <span className="me-2">{profile.userName}</span> <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
              </NavLink>
            ) : (
              <NavLink to="/login" className="btn btn-outline-light fw-bolder py-3 px-5 me-3">
                登入 / 註冊
              </NavLink>
            )}
            <div className="border-start border-white mx-3" style={{ height: "20px" }}></div>
            <NavLink to="/aboutProposal" className="btn btn-outline-light fw-bolder py-3 px-5 ms-8">
              我要提案
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
