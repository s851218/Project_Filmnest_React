import { useLocation, useOutletContext } from "react-router";
import Card from "../../components/Card";
import GrayScreenLoading from "../../components/GrayScreenLoading";

export default function AboutContent() {
  const { projectsData, isLoading } = useOutletContext();
  const location = useLocation();
  const pathName = location.pathname.split("/").at(-1);

  return (
    <>
      {pathName === "aboutStudioFin" ? (
        <>
          <div className="container py-5 py-lg-20">
            {projectsData.finLength !== 0 ? (
              <div className="row">
                <Card projects={projectsData.finProjects} isSwiper={false} />
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-8 bg-primary-6 rounded-3">
                  <div className="d-flex justify-content-center py-15">
                    <h2 className="fs-base fs-lg-6">尚未有已結案專案</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
          <GrayScreenLoading isLoading={isLoading} />
        </>
      ) : pathName === "aboutStudioOngoing" ? (
        <>
          <div className="container py-5 py-lg-20">
            {projectsData.length !== 0 ? (
              <div className="row">
                <Card projects={projectsData.projects} isSwiper={false} />
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-8 bg-primary-6 rounded-3">
                  <div className="d-flex justify-content-center py-15">
                    <h2 className="fs-base fs-lg-6">尚未有進行中專案</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
          <GrayScreenLoading isLoading={isLoading} />
        </>
      ) : (
        <div className="container py-5 py-lg-20">
          <div className="row justify-content-center">
            <div className="col-8 bg-primary-6 rounded-3">
              <div className="d-flex justify-content-center py-15">
                <h2 className="fs-base fs-lg-6">尚未有其他作品集</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
