import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpanded } from "../slice/adminSidebarExpandSlice";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import LightScreenLoading from "../AdminComponents/LightScreenLoading";
import { Alert } from "../assets/js/costomSweetAlert";
import AdminSummary from "../AdminComponents/AdminSummary";
const apiBase = import.meta.env.VITE_API_BASE;

export default function AdminProjectsHome() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [favoritesCount, setFavoritesCount] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector((item) => item.user.profile.userId);
  const navigate = useNavigate();

  const getTime = (time) => {
    const newTime = new Date(time)
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-")
      .slice("0", "10");
    return newTime;
  };

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBase}/projects?userId=${userId}`);
      setProjects(response.data);
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "專案取得失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId]);
  const getComments = async (id) => {
    try {
      const response = await axios.get(`${apiBase}/comments?projectId=${id}`);
      setCommentsCount((prev) => ({ ...prev, [id]: response.data.length }));
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "留言取得失敗",
        });
      }
    }
  };

  const getFavorites = async (id) => {
    try {
      const response = await axios.get(`${apiBase}/favorites?projectId=${id}`);
      setFavoritesCount((prev) => ({ ...prev, [id]: response.data.length }));
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "收藏取得失敗",
        });
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  useEffect(() => {
    projects.forEach((project) => {
      getComments(project.id);
      getFavorites(project.id);
    });
  }, [projects]);
  return (
    <>
      <Helmet>
        <title>專案管理</title>
      </Helmet>
      
      <AdminSummary /> {/* 摘要區 */}

      <div className="container pb-5">
        <h2 className="fs-6 mb-5">專案總覽</h2>
        <div className="bg-white rounded-5 shadow p-4">
          {/* 舊版 */}
          {/* <div className="table-responsive">
            <table className="table align-middle border border-primary-9 mb-0  table-borderless">
              <thead className="nowrap-table">
                <tr>
                  <th scope="col">專案</th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col">專案狀態</th>
                  <th scope="col">發布日期</th>
                  <th scope="col">截止日期</th>
                  <th scope="col">瀏覽量</th>
                  <th scope="col">收藏量</th>
                  <th scope="col">留言數</th>
                </tr>
              </thead>
              <tbody style={{ lineHeight: "1.5" }}>
                {projects.map((project) => {
                  const endDate = new Date(project.endAt);
                  const nowDate = new Date();
                  const time = endDate - nowDate;
                  const remainDays = Math.ceil(time / (1000 * 60 * 60 * 24));

                  return (
                    <tr
                      key={project.id}
                      onClick={() => {
                        dispatch(setExpanded("project"));
                        navigate(`/admin/${project.id}/intro`);
                      }}
                    >
                      <td className="d-none d-lg-block">
                        <div className="row align-items-center">
                          <div className="col-4">
                            <img src={project.projectImage} className="rounded-2" alt="專案數量" />
                          </div>
                          <div className="col-8">
                            <h3 className="fs-6 fw-bolder">{project.projectTitle}</h3>
                            <p className="fs-base">{project.summary}</p>
                          </div>
                        </div>
                      </td>
                      <td colSpan="8" className="nowrap-table d-lg-none p-1">
                        <img src={project.projectImage} className="rounded-2" alt="專案數量" />
                      </td>
                      <td className="nowrap-table d-lg-none">
                        <h3 className="fs-7 fw-bolder">{project.projectTitle}</h3>
                        <p className="fs-sm">{project.summary}</p>
                      </td>
                      <td className="nowrap-table">{remainDays < 0 ? "進行中" : "已結案"}</td>
                      <td className="nowrap-table">{getTime(project.createdAt)}</td>
                      <td className="nowrap-table">{getTime(project.endAt)}</td>
                      <td className="nowrap-table">{project.viewNum}</td>
                      <td className="nowrap-table">{favoritesCount[project.id] || 0}</td>
                      <td className="nowrap-table">{commentsCount[project.id] || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
          {/* 新版 */}
          <div className="table-responsive">
            <table className="table align-middle mb-0 ">
              <thead className="nowrap-table">
                <tr>
                  <th scope="col">專案</th>
                  <th scope="col">專案狀態</th>
                  <th scope="col" className="d-none d-xl-table-cell">發布日期</th>
                  <th scope="col" className="d-none d-md-table-cell">截止日期</th>
                  <th scope="col">瀏覽量</th>
                  <th scope="col" className="d-none d-xl-table-cell">收藏量</th>
                  <th scope="col" className="d-none d-xl-table-cell">留言數</th>
                </tr>
              </thead>
              <tbody style={{ lineHeight: "1.5" }}>
                {projects.map((project) => {
                  const endDate = new Date(project.endAt);
                  const nowDate = new Date();
                  const time = endDate - nowDate;
                  const remainDays = Math.ceil(time / (1000 * 60 * 60 * 24));

                  return (
                    <tr
                      key={project.id}
                      onClick={() => {
                        dispatch(setExpanded("project"));
                        navigate(`/admin/${project.id}/intro`);
                      }}
                    >
                      <th scope="row">
                        <div className="row align-items-center">
                          <div className="col-md-4 col-5">
                            <img src={project.projectImage} className="rounded-2" alt={project.projectTitle} />
                          </div>
                          <div className="col-md-8 col-7 text-warp">
                            <h3 className="fs-xl-7 fs-base fw-bolder multiline-ellipsis mb-0 mb-md-2">{project.projectTitle}</h3>
                            <p className="fs-xl-sm fs-xs fw-normal multiline-ellipsis text-primary-6 mb-0 d-none d-md-block">{project.summary}</p>
                          </div>
                          <div className="col d-md-none mt-2">
                            <p className="fs-xl-sm fs-xs fw-normal multiline-ellipsis text-primary-6 mb-0">{project.summary}</p>
                          </div>
                        </div>
                      </th>
                      <td className="nowrap-table">{remainDays < 0 ? "進行中" : "已結案"}</td>
                      <td className="nowrap-table d-none d-xl-table-cell">{getTime(project.createdAt)}</td>
                      <td className="nowrap-table d-none d-md-table-cell">{getTime(project.endAt)}</td>
                      <td className="nowrap-table">{project.viewNum}</td>
                      <td className="nowrap-table d-none d-xl-table-cell">{favoritesCount[project.id] || 0}</td>
                      <td className="nowrap-table d-none d-xl-table-cell">{commentsCount[project.id] || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <LightScreenLoading isLoading={isLoading} />
    </>
  );
}
