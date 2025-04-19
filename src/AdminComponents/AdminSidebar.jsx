import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import { setExpanded } from "../slice/adminSidebarExpandSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const userImage = useSelector((item) => item.user.profile.imageUrl);
  const project = useSelector((item) => item.expanded.expanded.project);
  const media = useSelector((item) => item.expanded.expanded.media);
  const { id } = useParams();

  return (
    <>
    <div className="row mb-3">
      <div className="col bg-white rounded-2 shadow">
        <nav className="d-none d-lg-block">
          <div className="d-flex justify-content-center mb-8 mt-10">
            <img src={userImage} className="rounded-circle object-fit-cover " style={{ width: "120px", height: "120px" }} alt="" />
          </div>
          <ul className="list-unstyled d-flex flex-column">
            <li className="mb-3">
              <NavLink to="/admin/adminProfile" className="btn btn-primary btn-base rounded-2 border-0 d-flex align-items-center admin-sidebar">
                <span className="material-symbols-outlined fs-7 ms-3 me-3">manage_accounts</span>
                <span>個人資料管理</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/admin/adminProjectsHome" className="btn btn-primary btn-base rounded-2 border-0 d-flex align-items-center admin-sidebar">
                <span className="material-symbols-outlined fs-7 ms-3 me-3">folder_managed</span>
                <span>
                  專案管理
                  {project ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}  
                </span>
              </NavLink>
              {project && (
                <>
                  <div className="d-flex">
                    <div className="border-end border-primary-1 ms-6"></div>
                    <ul className="list-unstyled ps-6">
                      <li className="py-1">
                        <NavLink to={`/admin/${id}/intro`} className="btn btn-primary btn-base border-0 rounded-2 admin-sidebar">
                          專案編輯
                        </NavLink>
                      </li>
                      <li className="py-1">
                        <NavLink to={`/admin/${id}/adminAnsComment`} className="btn btn-primary btn-base border-0 rounded-2 admin-sidebar">
                          回覆留言
                        </NavLink>
                      </li>
                      <li className="py-1">
                        <NavLink to={`/admin/${id}/adminChart`} className="btn btn-primary btn-base border-0 rounded-2 admin-sidebar">
                          數據分析
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </li>
            {/* <li className="mb-3">
              <button className="btn btn-white w-100 text-start border-0 shadow-none d-flex align-items-center" onClick={() => dispatch(setExpanded("media"))}>
                <span className="material-symbols-outlined fs-7 me-3">subscriptions</span>
                <span>
                  影音管理
                  {media ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}
                </span>
              </button>
              {media && (
                <div className="d-flex">
                  <div className="border-end border-primary-1 ms-6"></div>
                  <ul className="list-unstyled ps-6">
                    <li>
                      <NavLink to="/admin/adminMedia" className="nav-link text-decoration-none d-block py-2 px-3">
                        影音庫
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/adminUpload" className="nav-link text-decoration-none d-block py-2 px-3">
                        上傳影音
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li> */}
            <li className="mb-0">
              <NavLink to="/" className="btn btn-primary btn-base rounded-2 border-0 d-flex align-items-center">
                <span className="material-symbols-outlined fs-7 ms-3 me-3">exit_to_app</span>
                <span>離開工作室</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="container d-flex justify-content-between align-item-center d-lg-none p-2">
          <span className="fs-7 mb-0 align-bottom">提案工作室</span>
          <button className="btn btn-primary btn-base rounded-3 fw-bolder dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            個人資料管理
          </button>
          <ul className="dropdown-menu">
            <li>
              <NavLink to="/admin/adminProfile" className="btn btn-outline-light btn-base border-0 d-flex align-items-center">
                <span className="material-symbols-outlined fs-7 me-3">manage_accounts</span>
                <span>個人資料管理</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/admin/adminProjectsHome" className="btn btn-outline-light btn-base border-0 d-flex align-items-center">
                <span className="material-symbols-outlined fs-7 me-3">folder_managed</span>
                <span>
                  專案管理
                  {project ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}
                </span>
              </NavLink>
              {project && (
                <div className="d-flex">
                  <div className="border-end border-primary-1 ms-6 me-2"></div>
                  <ul className="list-unstyled w-100 me-6">
                    <li className="py-1">
                      <NavLink to={`/admin/${id}/intro`} className="btn btn-outline-light btn-base border-0 w-100 text-start">
                        專案編輯
                      </NavLink>
                    </li>
                    <li className="py-1">
                      <NavLink to={`/admin/${id}/adminAnsComment`} className="btn btn-outline-light btn-base border-0 w-100 text-start">
                        回覆留言
                      </NavLink>
                    </li>
                    <li className="py-1">
                      <NavLink to={`/admin/${id}/adminChart`} className="btn btn-outline-light btn-base border-0 w-100 text-start">
                        數據分析
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="mb-3">
              <button className="btn btn-outline-light btn-base border-0 d-flex align-items-center w-100" onClick={() => dispatch(setExpanded("media"))}>
                影音管理
                {media ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}
              </button>
              {media && (
                <div className="d-flex">
                  <div className="border-end border-primary-1 ms-6 me-2"></div>
                  <ul className="list-unstyled w-100 me-6">
                    <li>
                      <NavLink to="/admin/adminMedia" className="btn btn-outline-light btn-base border-0 w-100 text-start">
                        影音庫
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/admin/adminUpload" className="btn btn-outline-light btn-base border-0 w-100 text-start">
                        上傳影音
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/" className="btn btn-outline-light btn-base border-0 d-flex align-items-center">
                <span className="material-symbols-outlined fs-7 me-3">exit_to_app</span>
                <span>離開工作室</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
