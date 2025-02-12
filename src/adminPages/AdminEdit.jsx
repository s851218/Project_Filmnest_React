import { NavLink, Outlet } from "react-router";

export default function AdminEdit() {
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "black" : "transparent",
    color: isActive ? "white" : "black",
    borderBottom: "none",
  });
  return (
    <>
      <h2>專案編輯</h2>
      <div className="contaner">
        <ul className="nav nav-pills nav-fill mb-6">
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to="/admin/adminEdit/intro">
              專案資訊
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to="/admin/adminEdit/post">
              最新消息
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to="/admin/adminEdit/faq">
              常見問題
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={getActiveStyle} to="/admin/adminEdit/feedback">
              回饋項目
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}
