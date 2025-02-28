import { useState } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";

export default function HeaderSm() {
  const profile = useSelector((state) => state.user.profile);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const [isExpand, setIsExpand] = useState({ category: false });
  const dispatch = useDispatch();
  const handleIsExpand = () => {
    setIsExpand((prev) => ({ ...prev, category: !prev.category }));
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
          <Link to="/headerSmSec" className="d-flex justify-content-between align-items-center fw-bolder py-3 px-5 btn btn-primary-8 border-0 border-bottom">
            <div>
              <img src={profile.imageUrl} className="rounded-circle object-fit-cover" style={{ width: "40px", height: "40px" }} alt="" />
              <span className="ms-2">{profile.userName}</span>
            </div>
            <div>
              <i className="bi bi-chevron-right"></i>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary-8 border-0 border-bottom fw-bolder py-3">
            登入 / 註冊
          </Link>
        )}
        <Link className="nav-item py-3 px-5 border-bottom" onClick={() => handleIsExpand()}>
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
        <Link className="nav-item py-3 mt-3 btn btn-primary border-0 fw-bolder">我要提案</Link>
      </ul>
    </>
  );
}
