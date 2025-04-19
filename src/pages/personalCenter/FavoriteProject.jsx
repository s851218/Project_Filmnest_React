import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import PersonalCenterSidebar from "../../components/PersonalCenterSidebar";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import { Alert } from "../../js/customSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function FavoriteProject() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const id = useSelector((state) => state.user.profile.userId);

  const getFavoriteProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBase}/favorites?_expand=project&userId=${id}`);
      setFavoriteProjects(response.data.map((item) => item.project));
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "取得收藏專案失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getFavoriteProjects();
  }, [id, getFavoriteProjects]);
  return (
    <>
      <Helmet>
        <title>已收藏專案</title>
      </Helmet>

      <div className="container container-lg">
        <div className="d-block d-lg-none w-100 mb-5 bg-primary-8">
          <PersonalCenterSidebar />
        </div>
        <div className="row row-lg">
          <h1 className="fs-6 mb-5">收藏專案</h1>
          <Card projects={favoriteProjects} isSwiper={false} isDelete={true} getData={getFavoriteProjects} />
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
