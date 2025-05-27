import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, ScrollRestoration, useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import { Alert } from "../../js/customSweetAlert";

export default function AboutStudio() {
  const navItems = ["進行中", "已結案", "其他作品集"];

  const [projectsData, setProjectsData] = useState({
    projects: [],
    finProjects: [],
    length: 0,
    finLength: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  // 提案者資料
  const [studios, setStudios] = useState({});

  // 取得提案者資料
  useLayoutEffect(() => {
    const getStudioProfile = async () => {
      setIsLoading(true);
      let idArray = id.split("=");
      let idObj = { [idArray[0]]: Number(idArray[1]) };
      const { projectId } = idObj;
      try {
        const res = await axios.get(
          `${apiBase}/projects?_expand=studio&id=${projectId}`
        );
        setStudios(res.data[0].studio);
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "取得提案者專案失敗",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getStudioProfile();
  }, [id]);

  // 取得專案資料
  useLayoutEffect(() => {
    const getProjectData = async () => {
      if (!studios.userId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${apiBase}/projects?studioId=${studios.userId}`
        );
        const finFilterData = response.data.filter((item) => item.isFin);
        const filterData = response.data.filter((item) => !item.isFin);
        setProjectsData({
          projects: filterData,
          finProjects: finFilterData,
          length: filterData.length,
          finLength: finFilterData.length,
        });
      } catch (error) {
        console.log("取得專案資料失敗：", error);
        Alert.fire({
          icon: "error",
          title: "取得專案資料失敗",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProjectData();
  }, [studios.userId]);

  const { studioProfile } = studios;

  return (
    <>
      <ScrollRestoration />
      {studioProfile && (
        <Helmet>
          <title>{studioProfile.groupName}</title>
        </Helmet>
      )}
      {studioProfile && (
        <>
          <div className="container mt-0 mt-md-6 pb-15">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="border-bottom border-primary-4 pb-8 mb-8">
                  <div className="row flex-md-row flex-column">
                    <div className="col-md-5">
                      <img
                        src={studioProfile.studioImageUrl}
                        className="img-fluid object-fit-cover rounded-md w-100 h-100 mb-5 mb-md-0"
                        alt={studioProfile.groupName}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="d-flex flex-column h-100">
                        <h3 className="fs-6 fs-md-4 fs-lg-3 mb-3 text-nowrap">
                          {studioProfile.groupName}
                        </h3>
                        <p className="mb-5 mb-md-10">
                          <i className="bi bi-person fs-7 me-1" />
                          {studioProfile.personResponsible}
                        </p>
                        <div
                          id="connectUs"
                          className="rounded-1 p-4 mt-auto"
                          style={{
                            background: "#FFFFFF1A",
                            border: "1px solid #606060",
                          }}
                        >
                          <div className="d-flex justify-content-between mb-2 align-items-center">
                            <h3 className="fs-sm mb-0">聯絡我們</h3>
                            <ul className="list-unstyled d-flex align-self-end mb-0 gap-2">
                              <li>
                                <a href={studioProfile.studioFb}>
                                  <i className="bi bi-facebook fs-7 social-media-hover"></i>
                                </a>
                              </li>
                              <li className="mx-2">
                                <a href={studioProfile.studioIg}>
                                  <i className="bi bi-instagram fs-7 social-media-hover"></i>
                                </a>
                              </li>
                              <li>
                                <a href={studioProfile.studioLine}>
                                  <i className="bi bi-line fs-7 social-media-hover"></i>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div className="d-flex justify-content-between">
                            <ul className="list-unstyled mb-0">
                              <li className="mb-1">
                                <a href={`tel:${studioProfile.phone}`}>
                                  <i className="bi bi-telephone fs-7 me-1" />{" "}
                                  {studioProfile.phone}
                                </a>
                              </li>
                              <li className="mb-1">
                                <a href={studioProfile.email}>
                                  <i className="bi bi-envelope fs-7 me-1" />{" "}
                                  {studioProfile.email}
                                </a>
                              </li>
                              <li>
                                <i className="bi bi-clock fs-7 me-1" />{" "}
                                {studioProfile.startTime}~
                                {studioProfile.endTime}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="teamIntro">
                  <h3 className="fs-7 mb-3 d-flex align-items-center">
                    <span className="aboutStudio-title--decoration me-3"></span>
                    {studioProfile.personResponsible}
                    <span className="fs-sm fw-normal ms-2">導演/攝影</span>
                  </h3>
                  <p className="mb-0">{studioProfile.teamIntro}</p>
                </div>
              </div>
            </div>
          </div>
          <nav>
            <ul className="nav bg-primary-8 py-3 justify-content-center gap-6 gap-md-8">
              {navItems.map((item, index) => (
                <li className="nav-item border-0" key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link--aboutStudio text-center ${
                        isActive ? "nav-link-aboutStudio--active" : ""
                      }`
                    }
                    to={`${
                      item === "進行中"
                        ? ""
                        : item === "已結案"
                        ? "aboutStudioFinished"
                        : "aboutStudioOthers"
                    }`}
                    end={item === "進行中"}
                  >
                    {item + " "}
                    {item === "進行中"
                      ? `(${projectsData.length})`
                      : item === "已結案"
                      ? `(${projectsData.finLength})`
                      : ""}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
      <Outlet context={{ isLoading, projectsData }} />
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
