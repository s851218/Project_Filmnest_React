import { NavLink, Outlet, useLocation, useParams } from "react-router";

export default function AdminEdit() {
  const { id } = useParams();
  const location = useLocation();

  const isOnePageRoute = ["adminAnsComment", "adminChart"];

  const pathSegments = location.pathname.split("/"); // 用split將路由拆為陣列
  const currentRoute = pathSegments[pathSegments.length - 1]; // 取得最後一個

  const shouldOnePageLayout = isOnePageRoute.includes(currentRoute);

  return (
    <>
      {shouldOnePageLayout ? (
        <Outlet />
      ) : (
        <>
          <h2 className="fs-7 fs-lg-6 mb-3 mb-md-5 mb-lg-7">專案編輯</h2>

          <ul className="mb-4 list-unstyled d-flex">
            <li className="w-100">
              <NavLink
                className={({ isActive }) =>
                  `edit-nav-link fs-base fs-lg-7 ${
                    isActive ? "active-edit-nav-link" : ""
                  }`
                }
                to={`/admin/${id}/intro`}
              >
                專案資訊
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                className={({ isActive }) =>
                  `edit-nav-link fs-base fs-lg-7 ${
                    isActive ? "active-edit-nav-link" : ""
                  }`
                }
                to={`/admin/${id}/post`}
              >
                最新消息
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                className={({ isActive }) =>
                  `edit-nav-link fs-base fs-lg-7 ${
                    isActive ? "active-edit-nav-link" : ""
                  }`
                }
                to={`/admin/${id}/faq`}
              >
                常見問題
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                className={({ isActive }) =>
                  `edit-nav-link fs-base fs-lg-7 ${
                    isActive ? "active-edit-nav-link" : ""
                  }`
                }
                to={`/admin/${id}/feedback`}
              >
                回饋項目
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </>
      )}
    </>
  );
}
