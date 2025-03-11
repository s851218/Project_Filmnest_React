import { NavLink } from "react-router";

import { useState } from "react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState({
    project: false,
    media: false,
  });

  const handleIsExpand = (status) => {
    setExpanded((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  return (
    <div className="vh-100 p-3">
      <nav>
        <ul className="list-unstyled d-flex flex-column">
          <li className="mb-3">
            <NavLink
              to="/admin/adminProfile"
              className="nav-link text-decoration-none d-block py-2 px-3 rounded-3"
            >
              個人資料管理
            </NavLink>
          </li>
          <li className="mb-3">
            <button
              className="btn btn-white w-100 text-start border-0 shadow-none"
              onClick={() => handleIsExpand("project")}
            >
              專案管理
              {expanded.project ? (
                <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i>
              ) : (
                <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>
              )}
            </button>
            {expanded.project && (
              <ul className="list-unstyled ps-3">
                <li>
                  <NavLink
                    to="/admin/adminEdit/intro"
                    className="nav-link text-decoration-none d-block py-2 px-3"
                  >
                    專案編輯
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/adminAnsComment"
                    className="nav-link text-decoration-none d-block py-2 px-3"
                  >
                    回覆留言
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/adminChart"
                    className="nav-link text-decoration-none d-block py-2 px-3"
                  >
                    數據分析
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-3">
            <button
              className="btn btn-white w-100 text-start border-0 shadow-none"
              onClick={() => handleIsExpand("media")}
            >
              影音管理
              {expanded.media ? (
                <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i>
              ) : (
                <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>
              )}
            </button>
            {expanded.media && (
              <ul className="list-unstyled ps-3">
                <li>
                  <NavLink
                    to="/admin/adminMedia"
                    className="nav-link text-decoration-none d-block py-2 px-3"
                  >
                    影音庫
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/adminUpload"
                    className="nav-link text-decoration-none d-block py-2 px-3"
                  >
                    上傳影音
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-3">
            <NavLink
              to="/"
              className="nav-link text-decoration-none d-block py-2 px-3"
            >
              離開工作室
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
