import { useDispatch } from "react-redux";
import AdminHeader from "./AdminComponents/AdminHeader";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { setExpanded } from "./slice/adminSidebarExpandSlice";
import { useEffect } from "react";
function Admin() {
  const location = useLocation();
  const dispatch = useDispatch();

  // 監控路由變化，如果離開 /admin/{id}，就將 expanded.project 設置為 false
  useEffect(() => {
    const isDynamicRoute = /^\/admin\/\d+\//.test(location.pathname);

    if (!isDynamicRoute) {
      // 如果當前路由不是動態路由，則將expanded.project設為false
      dispatch(setExpanded("reset"));
    }
  }, [location]);
  return (
    <>
      
      <AdminHeader />
      <div className="admin">
        <div className="container mt-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
