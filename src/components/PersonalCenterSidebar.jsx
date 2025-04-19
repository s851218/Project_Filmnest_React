import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useEffect } from "react";

export default function PersonalCenterSidebar() {
  const userImage = useSelector((item) => item.user.profile.imageUrl);
  const project = useSelector((item) => item.expanded.expanded.project);
  useEffect(() => {}, [project]);

  return (
    <>
      <div className="d-none d-lg-block">
        <nav>
          <div className="d-flex justify-content-center align-items-center mb-8 mt-10">
            <img
              src={userImage}
              className="rounded-circle object-fit-cover "
              style={{ width: "120px", height: "120px" }}
              alt=""
            />
          </div>
          <ul className="list-unstyled d-flex flex-column">
            <li className="mb-3">
              <NavLink
                to="/personalCenter/profile"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  manage_accounts
                </span>
                <span>個人資料</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/favoriteProject"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  favorite
                </span>
                <span>收藏專案</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/orderRecords/orderRecordsAll"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  receipt_long
                </span>
                <span>訂單紀錄</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/favoriteVideo"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  movie
                </span>
                <span>收藏影音</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/viewRecords"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  subscriptions
                </span>
                <span>觀看紀錄</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/"
                className="btn btn-outline-light btn-main border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  exit_to_app
                </span>
                <span>返回首頁</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container d-lg-none py-3">
        <div className="d-flex justify-content-between align-item-center d-lg-none">
          <span className="fs-7 mb-0 align-bottom">會員中心</span>
          <button
            className="btn btn-outline-light btn-base border-0 rounded-3 fw-bolder dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="material-symbols-outlined fs-7 me-1">
              manage_accounts
            </span>
            <span>個人資料</span>
          </button>
          <ul className="dropdown-menu p-4">
            <li className="mb-3">
              <NavLink
                to="/personalCenter/profile"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  manage_accounts
                </span>
                <span>個人資料</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/favoriteProject"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  favorite
                </span>
                <span>收藏專案</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/orderRecords/orderRecordsAll"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  receipt_long
                </span>
                <span>訂單紀錄</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/favoriteVideo"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  movie
                </span>
                <span>收藏影音</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/personalCenter/viewRecords"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  subscriptions
                </span>
                <span>觀看紀錄</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/"
                className="btn btn-outline-light btn-base border-0 rounded-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined fs-7 me-3">
                  exit_to_app
                </span>
                <span>返回首頁</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
