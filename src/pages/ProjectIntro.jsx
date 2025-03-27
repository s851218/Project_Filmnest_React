import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useParams,
} from "react-router";
import ProjectIntroNav from "../components/ProjectIntroNav";
import ProjectIntroSwiper from "../components/ProjectIntroSwiper";
import ProjectIntroInfo from "../components/ProjectIntroInfo";
import {  useLayoutEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import ProjectIntroSimpleInfo from "../components/ProjectIntroSimpleInfo";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntro() {
  const [projectInfo, setProjectInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams(); // xiang 2025/02/27 intro路由調整
  const [params, setParams] = useState({});
  const location = useLocation();

  // 路徑判斷目前頁面是在哪一個子路由
  const currentPage = location.pathname;

  // 判斷是不是預設頁面(專案介紹內文)，路徑有 news, supportFeedback, QA...等，就回傳 true，前面再加 ! 代表不是預設頁面
  const isDefaultRoute =
    !/(news|supportFeedback|QA|comments|infoDisclosure)/.test(currentPage);

  // 判斷路由使否是提案人介紹頁面
  const isAboutStudioPage = location.pathname.includes("/aboutStudio");

  // 處理 params
  useLayoutEffect(() => {
    if (id) {
      const paramsArray = id.split("&");
      let paramsObj = {};
      paramsArray.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      setParams(paramsObj);
    }
  }, [id]);

  // 取得專案資訊
  useLayoutEffect(() => {
    if (params.projectId) {
      const getProjectData = async (id) => {
        setIsLoading(true);
        try {
          const res = await axios.get(`${API_BASE}/projects/${id}`); // xiang 2025/02/27 intro路由調整
          setProjectInfo(res.data);
        } catch (error) {
          console.log("取得專案資訊失敗：", error);
        } finally {
          setIsLoading(false);
        }
      };

      getProjectData(params.projectId);
    }
  }, [params]);

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>{projectInfo.projectTitle}</title>
      </Helmet>
      {!isAboutStudioPage ? (
        <>
          <section className="pt-0 pt-md-4 pt-lg-6 pb-5 pb-md-8 pb-lg-10 bg-layer-blur position-relative">
            {isDefaultRoute ? (
              <div className="container">
                <div className="row d-flex flex-column flex-md-row gap-8 gap-xxl-9 align-items-center">
                  {/* 左半部劇照 Swiper */}
                  <ProjectIntroSwiper projectInfo={projectInfo} />
                  {/* 右半部專案資訊、提案人資訊 */}
                  <ProjectIntroInfo projectInfo={projectInfo} />
                </div>
              </div>
            ) : (
              // 簡單專案資訊
              <ProjectIntroSimpleInfo
                projectInfo={projectInfo}
                studioId={projectInfo.studioId}
              />
            )}
          </section>

          {/* 專案介紹 Navbar */}
          <ProjectIntroNav projectId={projectInfo.id} />
          <Outlet context={projectInfo} />
        </>
      ) : (
        <div>
          <Outlet context={projectInfo} />
        </div>
      )}
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
