import axios from "axios";
import { useLayoutEffect, useState } from "react";
import FeedbackSwiper from "../components/FeedbackSwiper";
import { ScrollRestoration, useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { Toast } from "../assets/js/costomSweetAlert";
import GrayScreenLoading from "../components/GrayScreenLoading";
const API_BASE = import.meta.env.VITE_API_BASE;

function FeedbackPage() {
  const { id } = useParams();
  const [params, setParams] = useState({});
  const [projectData, setProjectData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //處理params
  useLayoutEffect(() => {
    if (id) {
      const paramsArry = id.split("&");
      let paramsObj = {};
      paramsArry.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      setParams(paramsObj);
    }
  }, [id]);

  const getProjectData = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/projects?_expand=studio&id=${id}`);
      setProjectData(response.data[0]);
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "success",
          title: "頁面資料取得失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 取得資料
  useLayoutEffect(() => {
    if (params.projectId) {
      getProjectData(params.projectId);
    }
  }, [params]);

  function getDateFormatted(date) {
    const dt = new Date(date);
    const formattedDate = dt.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  function getRemainingTime(deadline) {
    const end = new Date(deadline);
    const now = new Date();

    // 計算時間差（毫秒）
    const remainingTime = end - now;
    // 如果結束時間已過
    if (remainingTime <= 0) {
      return "募資時間已經結束";
    }

    // 計算天、小時
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `募資倒數 ${days} 天 ${hours} 小時`;
  }

  function calculatePercentage(numerator, denominator) {
    if (denominator === 0) return "分母為 0，無法計算";
    const ratio = numerator / denominator;
    const percentage = Math.round(ratio * 100);

    return percentage;
  }

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>贊助方案</title>
      </Helmet>
      <section>
        {/* 背景圖片 */}
        <div
          className="w-100 d-flex align-items-end"
          style={{
            height: "100vh",
            backgroundImage: `linear-gradient(0.18deg, #040404 0.18%,rgba(0, 0, 0, 0) 99.87%), url(${projectData.projectImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          {/* 主要內容 */}
          <div className="container d-flex flex-column justify-content-center h-auto">
            <div className="row justify-content-center text-center">
              <div className="col-md-10">
                <h1 className="fs-lg-xxl fs-6 mb-lg-3 text-primary-1 mb-2 text-balance">{projectData.projectTitle}</h1>
                <h3 className="fs-lg-6 fs-sm text-primary-2">{projectData.studio?.studioProfile?.groupName}</h3>

                <div className="my-5">
                  <p className="fs-lg-6 mb-4">{`募資期間 ${getDateFormatted(projectData.createdAt)} - ${getDateFormatted(projectData.endAt)}`}</p>

                  <div className="d-flex justify-content-between align-items-center  mb-4">
                    <p className="fs-lg-6 mb-0">
                      {`NT
                    ${projectData.totalMoney?.toLocaleString("zh-TW", {
                      style: "currency",
                      currency: "TWD",
                      minimumFractionDigits: 0,
                    })}`}
                      <span className="fs-lg-base fs-sm text-primary-4 ms-3 me-auto mb-0">
                        {`/ NT
                    ${projectData.goalMoney?.toLocaleString("zh-TW", {
                      style: "currency",
                      currency: "TWD",
                      minimumFractionDigits: 0,
                    })}`}
                      </span>
                    </p>

                    <p className="fs-lg-6 mb-0">{`${calculatePercentage(projectData.totalMoney, projectData.goalMoney)} %`}</p>
                  </div>

                  {/* 自訂進度條 */}
                  <div
                    className="progress progress-bg bg-primary-8"
                    style={{
                      height: "8px",
                      borderRadius: "50px",
                    }}
                  >
                    <div
                      className="progress-bar bg-white"
                      role="progressbar"
                      style={{
                        width: `${calculatePercentage(projectData.totalMoney, projectData.goalMoney)}%`,
                        borderRadius: "30px",
                      }}
                      aria-valuenow={calculatePercentage(projectData.totalMoney, projectData.goalMoney)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <div>
                      <i className="bi bi-person me-2"></i>
                      <span className="fs-lg-7 fs-sm">{projectData.supportNum}</span>
                    </div>
                    <div>
                      <i className="bi bi-clock me-2"></i>
                      <span className="fs-lg-7 fs-sm">{getRemainingTime(projectData.endAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeedbackSwiper />
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}

export default FeedbackPage;
