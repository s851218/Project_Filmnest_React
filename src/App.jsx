import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "./slice/userSlice";
import axios from "axios";
import { useCallback, useEffect } from "react";
const apiBase = import.meta.env.VITE_API_BASE;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // 不顯示Header和Footer頁面
  const layoutHiddenRoutes = ["/headerSm", "/headerSmSec", "/headerSmSearch", "/adminHeaderSm"];

  const shouldHideLayout = layoutHiddenRoutes.includes(location.pathname);

  useEffect(() => {
    // 阻止滾動到頂部
    window.history.scrollRestoration = "manual"; 

    // 判斷是否是子路由，不滾動到頂部
    const isChildRoute = location.pathname.startsWith("/projects");
    if (!isChildRoute) {
      window.scrollTo(0, 0); // 只有在非子路由時才滾動到頂部
    }
  }, [location.pathname]);

  const checkLogin = useCallback( async (token) => {
    try {
      const response = await axios.get(`${apiBase}/users?token=${token}`);
      const userData = response.data[0];
      dispatch(
        setLogin({
          token: userData.token,
          userId: userData.id,
          userName: userData.userProfile.userName,
          imageUrl: userData.userProfile.userImageUrl,
          hasStudio: userData.hasStudio,
        })
      );
    } catch (error) {
      console.log(error.data);
    }
  },[dispatch])

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (token) {
      checkLogin(token);
    }
  }, [checkLogin]);
  return (
    <>
      {!shouldHideLayout && <Header />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
