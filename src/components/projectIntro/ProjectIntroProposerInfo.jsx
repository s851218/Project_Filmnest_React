import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types"; // prop validation
import { Alert } from "../../js/customSweetAlert";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroProposerInfo({ studioId }) {
  const [proposerData, setProposerData] = useState({});

  const [projectCount, setProjectCount] = useState(0);

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

  // 取得所有專案中有多少該 studioId 的專案
  useEffect(() => {
    if (!studioId) return;
    const fetchProjectCount = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/projects?studioId=${studioId}`
        );
        setProjectCount(res.data.length);
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "取得專案數量失敗",
          });
        }
      }
    };
    fetchProjectCount();
  }, [studioId]);

  return (
    <>
      <div className="d-flex p-3 p-md-5 bg-primary-9-transparent rounded-1 rounded-md-2">
        <img
          className="object-fit-cover rounded rounded-md-1 img-director"
          src={proposerData.studioImageUrl}
          alt={`${proposerData.personResponsible}-提案人照片`}
        />
        <div
          className="ms-3 ms-md-7 d-flex flex-column justify-content-between"
          style={{ width: 552 }}
        >
          <div>
            <h3 className="fs-base fs-md-7 mb-2">
              <Link to="aboutStudio" className="text-white title-hover">
                {proposerData.groupName}
              </Link>
            </h3>
            <section className="d-flex gap-4">
              <Link
                to="aboutStudio"
                className="fs-sm fs-md-base icon-text-hover"
              >
                <span className="material-symbols-outlined align-bottom text-primary-5 me-0 me-md-1">
                  star
                </span>
                {`${projectCount} 個專案`}
              </Link>
              <Link
                to="aboutStudio"
                className="fs-sm fs-md-base icon-text-hover"
              >
                <span className="material-symbols-outlined align-bottom text-primary-5 me-0 me-md-1">
                  person
                </span>
                {`提案者-${proposerData.personResponsible}`}
              </Link>
            </section>
          </div>
          <section className="d-flex align-items-center">
            <ul className="list-unstyled mb-0 d-flex gap-3">
              <li>
                <a href={proposerData.studioFb} target="_blank">
                  <i className="bi bi-facebook fs-6 social-media-hover" />
                </a>
              </li>
              <li>
                <a href={proposerData.studioIg} target="_blank">
                  <i className="bi bi-instagram fs-6 social-media-hover" />
                </a>
              </li>
              <li>
                <a href={proposerData.studioLine} target="_blank">
                  <i className="bi bi-line fs-6 social-media-hover" />
                </a>
              </li>
            </ul>
            <Link to="aboutStudio" className="btn btn-secondary fs-sm ms-auto">
              聯絡我們
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

ProjectIntroProposerInfo.propTypes = {
  studioId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
