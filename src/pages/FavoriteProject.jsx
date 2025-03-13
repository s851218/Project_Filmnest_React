import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
const apiBase = import.meta.env.VITE_API_BASE;

export default function FavoriteProject() {
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const id = useSelector((state) => state.user.profile.userId);

  const getFavoriteProjects = async () => {
    try {
      const response = await axios.get(`${apiBase}/favorites?_expand=project&userId=${id}`);
      setFavoriteProjects(response.data.map((item) => item.project));
    } catch (error) {}
  };
  useEffect(() => {
    getFavoriteProjects();
  }, []);
  return (
    <div className="container container-lg">
      <div className="d-block d-lg-none w-100 mb-5 bg-primary-8">
        <PersonalCenterSidebar />
      </div>
      <div className="row row-lg">
        <h1 className="fs-6 mb-5">收藏專案</h1>
        <Card projects={favoriteProjects} isSwiper={false} />
      </div>
    </div>
  );
}
