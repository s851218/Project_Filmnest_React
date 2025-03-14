import { Outlet, useParams } from "react-router";
import ProjectIntroNav from "../components/ProjectIntroNav";
import ProjectIntroSwiper from "../components/ProjectIntroSwiper";
import ProjectIntroInfo from "../components/ProjectIntroInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntro() {
  const [projectInfo, setProjectInfo] = useState({});

  const { id } = useParams(); // xiang 2025/02/27 intro路由調整
  const [ params , setParams ] = useState({})
  
  //處理params
  useEffect(()=>{
    if (id) {
      const paramsArry = id.split("&")
      let paramsObj = {}
      paramsArry.forEach((param)=>{
        let [ key , value ] = param.split("=")
        paramsObj[key] = Number(value)
      })
      setParams(paramsObj)
    }
  },[id])

  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params.projectId) {
      const getProjectData = async (id) => {
        try {
          const res = await axios.get(`${API_BASE}/projects/${id}`); // xiang 2025/02/27 intro路由調整
          setProjectInfo(res.data);
        } catch (error) {
          console.log("取得專案資訊失敗：", error);
        }
      };
      getProjectData(params.projectId);
    }
  }, [params]);

  return (
    <>
      <section
        className="pt-0 pt-md-6 pb-8 pb-mb-10 bg-layer-blur position-relative"
        style={{ marginTop: 89 }}
      >
        <div className="container">
          <div className="row d-flex flex-column flex-md-row gap-8 gap-xxl-9 align-items-center">
            {/* 左半部劇照 Swiper */}
            <ProjectIntroSwiper projectInfo={projectInfo} />
            {/* 右半部專案資訊、提案人資訊 */}
            <ProjectIntroInfo projectInfo={projectInfo} />
          </div>
        </div>
      </section>

      {/* 專案介紹 Navbar */}
      <ProjectIntroNav projectId={projectInfo.id} />
      <Outlet context={projectInfo} />
    </>
  );
}
