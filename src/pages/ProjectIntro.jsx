import { Outlet } from "react-router";
import ProjectIntroNav from "../components/ProjectIntroNav";
import ProjectIntroSwiper from "../components/ProjectIntroSwiper";
import ProjectIntroInfo from "../components/ProjectIntroInfo";

export default function ProjectIntro() {
  return (
    <>
      <section
        className="pt-0 pt-md-6 pb-8 pb-mb-10 bg-layer-blur position-relative"
        style={{ marginTop: 89 }}
      >
        <div className="container">
          <div className="row d-flex flex-column flex-md-row gap-8 gap-xxl-9 align-items-stretch">
            {/* 左半部劇照 Swiper */}
            <ProjectIntroSwiper />
            {/* 右半部專案資訊、提案人資訊 */}
            <ProjectIntroInfo />
          </div>
        </div>
      </section>

      {/* 專案介紹 Navbar */}
      <ProjectIntroNav />
      <Outlet />
    </>
  );
}
