import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpanded } from "../slice/adminSidebarExpandSlice";
import { useLocation, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import LightScreenLoading from "../AdminComponents/LightScreenLoading";
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
      .slice("0","10")
    return newTime;
  };

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBase}/projects?userId=${userId}`);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getComments = async (id) => {
    try {
      const response = await axios.get(`${apiBase}/comments?projectId=${id}`);
      setCommentsCount((prev) => ({ ...prev, [id]: response.data.length }));
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async (id) => {
    try {
      const response = await axios.get(`${apiBase}/favorites?projectId=${id}`);
      setFavoritesCount((prev) => ({ ...prev, [id]: response.data.length }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    projects.forEach((project) => {
      getComments(project.id);
      getFavorites(project.id);
    });
  }, [projects]);
  return (
    <>
      <Helmet>
        <title>提案者工作室</title>
      </Helmet>
      <div className="container mb-6 mb-lg-15">
        <div className="d-none d-lg-block">
          <h1 className="fs-6 mb-7">摘要</h1>
          <div className="row row-cols-3 gx-5 mb-5">
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-5">
                <div className="me-5">
                  <img
                    src="募資金額.png"
                    className="bg-primary-5 rounded-2 p-3"
                    alt="募資金額"
                  />
                </div>
                <div>
                  <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
                  <p className="fs-2 fw-bolder mb-0">5,511,654</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-5">
                <div className="me-5">
                  <img
                    src="觀看次數.png"
                    className="bg-primary-5 rounded-2 p-3"
                    alt="觀看次數"
                  />
                </div>
                <div>
                  <h3 className="fs-base mb-0 text-primary-6">觀看次數</h3>
                  <p className="fs-2 fw-bolder mb-0">5.3K</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-5">
                <div className="me-5">
                  <img
                    src="瀏覽量.png"
                    className="bg-primary-5 rounded-2 p-3"
                    alt="瀏覽量"
                  />
                </div>
                <div>
                  <h3 className="fs-base mb-0 text-primary-6">瀏覽量</h3>
                  <p className="fs-2 fw-bolder mb-0">8.2K</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-5 gx-5">
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-4">
                <div className="me-5">
                  <img
                    src="專案數量.png"
                    className="bg-primary-5 rounded-2 p-2"
                    alt="專案數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
                  <p className="fs-6 fw-bolder mb-0">4</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-4">
                <div className="me-5">
                  <img
                    src="影音數量.png"
                    className="bg-primary-5 rounded-2 p-2"
                    alt="影音數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
                  <p className="fs-6 fw-bolder mb-0">4</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-4">
                <div className="me-5">
                  <img
                    src="收藏數量.png"
                    className="bg-primary-5 rounded-2 p-2"
                    alt="收藏數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">收藏數量</h3>
                  <p className="fs-6 fw-bolder mb-0">672</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-4">
                <div className="me-5">
                  <img
                    src="觀看時間.png"
                    className="bg-primary-5 rounded-2 p-2"
                    alt="觀看時間"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
                  <p className="fs-6 fw-bolder mb-0">368 hr</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center rounded-2 bg-white p-4">
                <div className="me-5">
                  <img
                    src="留言數.png"
                    className="bg-primary-5 rounded-2 p-2"
                    alt="留言數"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
                  <p className="fs-6 fw-bolder mb-0">368</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-lg-none">
          <h1 className="fs-base mb-3">摘要</h1>
          <div className="row g-3 mb-5">
            <div className="col-12">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="募資金額.png"
                    className="bg-primary-5 rounded-2 p-2"
                    style={{ width: "40px" }}
                    alt="募資金額"
                  />
                </div>
                <div>
                  <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
                  <p className="fs-6 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="觀看次數.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="觀看次數"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">觀看次數</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="瀏覽量.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="瀏覽量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">瀏覽量</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="專案數量.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="專案數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="影音數量.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="影音數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="收藏數量.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="收藏數量"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">收藏數量</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="觀看時間.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="觀看時間"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center rounded-2 bg-white p-3">
                <div className="me-5">
                  <img
                    src="留言數.png"
                    className="bg-primary-5 rounded-2 p-1"
                    style={{ width: "28px" }}
                    alt="留言數"
                  />
                </div>
                <div>
                  <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
                  <p className="fs-7 fw-bolder mb-0">9999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <h2 className="fs-6 mb-5">專案總覽</h2>
        <div className="table-responsive">
          <table className="table align-middle border border-primary-9 bg-white mb-0">
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
                          <img
                            src={project.projectImage}
                            className="rounded-2"
                            alt="專案數量"
                          />
                        </div>
                        <div className="col-8">
                          <h3 className="fs-6 fw-bolder">
                            {project.projectTitle}
                          </h3>
                          <p className="fs-base">{project.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td colSpan="8" className="nowrap-table d-lg-none p-1">
                      <img
                        src={project.projectImage}
                        className="rounded-2"
                        alt="專案數量"
                      />
                    </td>
                    <td className="nowrap-table d-lg-none">
                      <h3 className="fs-7 fw-bolder">{project.projectTitle}</h3>
                      <p className="fs-sm">{project.summary}</p>
                    </td>
                    <td className="nowrap-table">
                      {remainDays < 0 ? "進行中" : "已結案"}
                    </td>
                    <td className="nowrap-table">
                      {getTime(project.createdAt)}
                    </td>
                    <td className="nowrap-table">
                      {getTime(project.endAt)}
                    </td>
                    <td className="nowrap-table">{project.viewNum}</td>
                    <td className="nowrap-table">
                      {favoritesCount[project.id] || 0}
                    </td>
                    <td className="nowrap-table">
                      {commentsCount[project.id] || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <LightScreenLoading isLoading={isLoading} />
    </>
  );
}
