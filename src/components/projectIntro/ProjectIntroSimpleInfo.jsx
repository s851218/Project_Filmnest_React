import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { Alert } from "../../assets/js/costomSweetAlert";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroSimpleInfo({ projectInfo, studioId }) {
  const [countDown, setCountDown] = useState({
    days: 0,
  });
  const [proposerData, setProposerData] = useState({});

  // 取得提案人資料
  useEffect(() => {
    if (!studioId) return;
    const getProposerData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/studios/${studioId}`);
        setProposerData(res.data.studioProfile);
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "取得提案人資料失敗",
          });
        }
      }
    };
    getProposerData();
  }, [studioId]);

  // 募資倒數時間(募資狀態標籤用)
  useEffect(() => {
    if (!projectInfo.endAt) return;

    const updateCountDown = () => {
      const now = new Date();
      const end = new Date(projectInfo.endAt);
      const diff = end - now;

      if (diff <= 0) {
        setCountDown({
          days: 0,
        });
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setCountDown({ days });
    };

    updateCountDown();
  }, [projectInfo.endAt]);

  return (
    <>
      <div className="container">
        <section className="d-flex flex-column flex-xl-row gap-3 gap-md-6">
          <div className="project-image-container">
            <img
              src={projectInfo.projectImage}
              alt={`${projectInfo.projectTitle}封面劇照`}
              className="img-fluid object-fit-cover rounded"
            />
          </div>
          <div className="py-0 py-xl-2">
            <div className="mb-3">
              <Link to="/projectExplore">
                <span className="py-1 px-2 bg-primary-8 rounded me-2 tag-hover-category fs-xs fs-md-base">
                  {projectInfo.category}
                </span>
              </Link>
              <Link to="/projectExplore">
                <span className="py-1 px-2 bg-primary-6 rounded tag-hover-status fs-xs fs-md-base">
                  {countDown.days < 7 && countDown.days > 0
                    ? "即將結束"
                    : "進行中"}
                </span>
              </Link>
            </div>
            <h2 className="fs-base fs-sm-7 fs-md-6">
              {projectInfo.projectTitle}
            </h2>
            <h3 className="fs-xs fs-md-base">
              <span>
                提案人{" "}
                <Link
                  to="aboutStudio"
                  className="text-primary-3 text-decoration-underline"
                >
                  {proposerData.groupName}
                </Link>
              </span>
            </h3>
          </div>
        </section>
      </div>
    </>
  );
}

ProjectIntroSimpleInfo.propTypes = {
  projectInfo: PropTypes.shape({
    projectTitle: PropTypes.string,
    projectImage: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    endAt: PropTypes.string,
  }),
  studioId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
