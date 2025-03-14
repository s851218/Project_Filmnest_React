import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const data = {
  bannerImageUrl:
    "https://s851218.github.io/Project-FilmNest/assets/image48-d6d8f560.png",
  slogan: "有好想法，卻沒辦法嗎？",
  totalFundsRaised: 4837261,
  sponsors: 2947,
  step: {
    title: "募資三部曲",
    steps: [
      {
        id: "01",
        stepName: "準備與計畫",
        content: "定義項目目標和預算，選擇募資平台並設計募資策略。",
        image:
          "https://s851218.github.io/Project-FilmNest/assets/image53-4f27863e.png",
      },
      {
        id: "02",
        name: "發布與推廣",
        content: "在平台上發布項目，並進行推廣以吸引支持者。",
        image:
          "https://s851218.github.io/Project-FilmNest/assets/image54-efbe69a5.png",
      },
      {
        id: "03",
        name: "實施與回報",
        content: "監控募資進度，執行項目並向支持者提供回報。",
        image:
          "https://s851218.github.io/Project-FilmNest/assets/image55-b70e3ee9.png",
      },
    ],
  },
};

const { bannerImageUrl, slogan, totalFundsRaised, sponsors, step } = data;

export default function AboutProposal() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>提案 | 影巢 FilmNest</title>
      </Helmet>
      <div
        className="banner-bg-mask"
        style={{
          background: `url(${bannerImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 0",
        }}
      >
        <div className="aboutProposal-banner-wrap container position-relative z-3">
          <h1 className="text-center slogn-position mb-0">{slogan}</h1>
          <div className="aboutProposal-slogan-card-position container px-md-0">
            <div className="position-relative">
              <ul className="list-unstyled d-flex justify-content-center mb-0 w-100 w-md-75 w-xl-50 mx-auto banner-deco">
                <li className="slogan-card-bg text-center w-50 py-3 py-md-5 me-3 me-md-10">
                  <p className="fs-sm fs-md-base mb-2">累積金額</p>
                  <h2 className="fs-6 fs-md-1 lh-base mb-0">
                    {totalFundsRaised.toLocaleString()}
                  </h2>
                </li>
                <li className="slogan-card-bg text-center w-50 py-3 py-md-5">
                  <p className="fs-sm fs-md-base mb-2">贊助人數</p>
                  <h2 className="fs-6 fs-md-1 lh-base mb-0">
                    {sponsors.toLocaleString()}
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="process-wrap pb-18 pb-md-30">
        <div className="process container py-0 py-md-20 text-center">
          <h2 className="mb-8 mb-md-20">{step.title}</h2>
          <ul className="list-unstyled text-start row row-cols-1 row-cols-lg-3 mb-8 mb-lg-20">
            {step.steps.map(({ id, name, content, image }, index) => (
              <li key={index} className="col mb-lg-0">
                <div
                  className="process-card-mask mb-5 border border-white-1"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                >
                  <div className="process-card position-relative z-2 p-3 p-lg-10 d-flex flex-column">
                    <h3 className="fs-base fs-lg-7 d-flex flex-column">
                      <span className="fs-3 fs-lg-1 lh-base mb-1">{id}</span>
                      {name}
                    </h3>
                    <p className="mt-auto mb-0">{content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/termsOfUse"
            className="btn btn-primary fw-bolder py-3 px-5 w-100 w-md-auto"
          >
            我要提案
          </Link>
        </div>
      </div>
    </>
  );
}
