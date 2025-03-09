import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import { setExpanded } from "../slice/adminSidebarExpandSlice";
import { useEffect } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const project = useSelector((item) => item.expanded.expanded.project);
  const media = useSelector((item) => item.expanded.expanded.media);
  const { id } = useParams();
  useEffect(() => {
    console.log(project);
  }, [project]);

  return (
    <>
      <div className="vh-100 p-3 d-none d-lg-block">
        <nav>
          <ul className="list-unstyled d-flex flex-column">
            <li className="mb-3">
              <NavLink to="/admin/adminProfile" className="nav-link text-decoration-none d-block py-2 px-3 rounded-3">
                個人資料管理
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/admin/adminProjectsHome" className="btn btn-white w-100 text-start border-0 shadow-none">
                專案管理
              </NavLink>
              {project && (
                <ul className="list-unstyled ps-3">
                  <li>
                    <NavLink to={`/admin/${id}/intro`} className="nav-link text-decoration-none d-block py-2 px-3">
                      專案編輯
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/admin/${id}/adminAnsComment`} className="nav-link text-decoration-none d-block py-2 px-3">
                      回覆留言
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/admin/${id}/adminChart`} className="nav-link text-decoration-none d-block py-2 px-3">
                      數據分析
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-3">
              <button className="btn btn-white w-100 text-start border-0 shadow-none" onClick={() => dispatch(setExpanded("media"))}>
                影音管理{media ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}
              </button>
              {media && (
                <ul className="list-unstyled ps-3">
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
              )}
            </li>
            <li className="mb-3">
              <NavLink to="/" className="nav-link text-decoration-none d-block py-2 px-3">
                離開工作室
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container d-flex justify-content-between align-item-center d-lg-none mb-3">
        <span className="fs-7 mb-0 align-bottom">提案工作室</span>
        <button className="btn btn-outline-light border-0 fw-bolder dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          個人資料管理
        </button>
        <ul className="dropdown-menu">
          <li>
          <NavLink to="/admin/adminProfile" className="nav-link text-decoration-none d-block py-2 px-3 rounded-3">
              個人資料管理
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink to="/admin/adminProjectsHome" className="dropdown-item btn btn-white w-100 text-start border-0 shadow-none">
              專案管理
            </NavLink>
            {project && (
              <ul className="list-unstyled ps-3">
                <li>
                  <NavLink to={`/admin/${id}/intro`} className="dropdown-item text-decoration-none d-block py-2 px-3">
                    專案編輯
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/admin/${id}/adminAnsComment`} className="dropdown-item text-decoration-none d-block py-2 px-3">
                    回覆留言
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/admin/${id}/adminChart`} className="dropdown-item text-decoration-none d-block py-2 px-3">
                    數據分析
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-3">
            <button className="dropdown-item btn btn-white w-100 text-start border-0 shadow-none" onClick={() => dispatch(setExpanded("media"))}>
              影音管理{media ? <i className="bi bi-chevron-up fs-sm fw-bolder ms-3"></i> : <i className="bi bi-chevron-down fs-sm fw-bolder ms-3"></i>}
            </button>
            {media && (
              <ul className="list-unstyled ps-3">
                <li>
                  <NavLink to="/admin/adminMedia" className="dropdown-item text-decoration-none d-block py-2 px-3">
                    影音庫
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/adminUpload" className="dropdown-item text-decoration-none d-block py-2 px-3">
                    上傳影音
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-3">
            <NavLink to="/" className="dropdown-item text-decoration-none d-block py-2 px-3">
              離開工作室
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
