import { useDispatch } from "react-redux";
import AdminHeader from "./AdminComponents/AdminHeader";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { setExpanded } from "./slice/adminSidebarExpandSlice";
import { setLogin } from "./slice/userSlice";
import { useCallback, useEffect } from "react";
import { ScrollRestoration } from "react-router";
import axios from "axios";
import { Alert } from "./assets/js/costomSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;
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
  }, [location.pathname, dispatch]);

  const checkLogin = useCallback(
    async (token) => {
      try {
        const response = await axios.get(`${apiBase}/users?token=${token}`);
        const userData = response.data[0];
        dispatch(
          setLogin({
            token: userData.token,
            userId: userData.id,
            userName: userData.userProfile.userName,
            imageUrl: userData.userProfile.userImageUrl,
          })
        );
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "驗證失敗",
          });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (token) {
      checkLogin(token);
    }
  }, [checkLogin]);
  return (
    <>
      <ScrollRestoration />
      <AdminHeader />
      <div className="admin">
        <div className="container mt-14 mt-lg-20">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Admin;
