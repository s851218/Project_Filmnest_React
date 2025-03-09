import { NavLink, Outlet, useLocation, useParams } from "react-router";

export default function AdminEdit() {
  const { id } = useParams();
  const location = useLocation();
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "black" : "transparent",
    color: isActive ? "white" : "black",
    borderBottom: "none",
  });
  const isOnePageRoute = ["adminAnsComment", "adminChart"];

  const pathSegments = location.pathname.split("/"); // 用split將路由拆為陣列
  const currentRoute = pathSegments[pathSegments.length - 1]; // 取得最後一個
  
  const shouldOnePageLayout = isOnePageRoute.includes(currentRoute);

  

  return (
    <>
    {shouldOnePageLayout ? (<div className="contaner">
        <Outlet />
      </div>) : (<><h2>專案編輯</h2>
      <div className="contaner">
        <ul className="nav nav-pills nav-fill mb-6">
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to={`/admin/${id}/intro`}>
              專案資訊
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to={`/admin/${id}/post`}>
              最新消息
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to={`/admin/${id}/faq`}>
              常見問題
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to={`/admin/${id}/feedback`}>
              回饋項目
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div></>)}
    </>
  );
}
