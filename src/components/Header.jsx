import { NavLink } from "react-router";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark py-5">
        <div className="container">
          <NavLink className="p-0 me-12" to="/">
            首頁
          </NavLink>
          <NavLink className="p-0 me-12" to="/projectExplore">
            探索
          </NavLink>
          <div className="ms-auto">
            <NavLink to="/login" className="btn btn-outline-light fw-bolder py-3 px-5 me-3">
              登入 / 註冊
            </NavLink>
            <NavLink to="/aboutProposal" className="btn btn-outline-light fw-bolder py-3 px-5 ms-8">
              我要提案
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
