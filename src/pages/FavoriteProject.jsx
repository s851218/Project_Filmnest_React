import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
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

  const getFavoriteProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiBase}/favorites?_expand=project&userId=${id}`
      );
      setFavoriteProjects(response.data.map((item) => item.project));
    } catch (error) {
      console.log("取得收藏專案失敗：", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFavoriteProjects();
  }, []);
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
          <Card projects={favoriteProjects} isSwiper={false} />
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
