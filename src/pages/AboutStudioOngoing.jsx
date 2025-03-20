import { useOutletContext } from "react-router";
import Card from "../components/Card";
import GrayScreenLoading from "../components/GrayScreenLoading";

export default function AboutStudioOngoing() {
  const { projects, isLoading } = useOutletContext();
  return (
    <>
      <div className="container py-5 py-lg-20">
        {projects.length !== 0 ? (
          <div className="row">
            <Card projects={projects} isSwiper={false} />
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-8 bg-primary-6 rounded-3">
              <div className="d-flex justify-content-center py-15">
                <h2>尚未有進行中專案</h2>
              </div>
            </div>
          </div>
        )}
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
