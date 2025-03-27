import { useEffect, useState } from "react";
import ProjectIntroProposerInfo from "./ProjectIntroProposerInfo";
import { Link } from "react-router";
import PropTypes from "prop-types"; // prop validation

export default function ProjectIntroInfo({ projectInfo }) {
  const [currentMoneyPercentage, setCurrentMoneyPercentage] = useState(0);

  // 計算募資進度
  useEffect(() => {
    const calcMoneyPercentage = () => {
      if (projectInfo.totalMoney && projectInfo.goalMoney) {
        const result = Math.floor(
          Number(projectInfo.totalMoney / projectInfo.goalMoney) * 100
        ); // 向下取整數，捨去小數點

        setCurrentMoneyPercentage(result);
      } else {
        setCurrentMoneyPercentage(0);
      }
    };
    calcMoneyPercentage();
  }, [projectInfo]);

  // 募資倒數時間
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!projectInfo.endAt) return;

    const updateCountDown = () => {
      const now = new Date();
      const end = new Date(projectInfo.endAt);
      const diff = end - now;

      if (diff <= 0) {
        setCountDown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountDown({ days, hours, minutes, seconds });
    };

    updateCountDown();

    const timer = setInterval(updateCountDown, 1000);
    return () => clearInterval(timer);
  }, [projectInfo.endAt]);

  // 募資起始至結束日期
  const startDate = new Date(projectInfo.createdAt);
  const endDate = new Date(projectInfo.endAt);
  const formattedStartDate = startDate.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <>
      <section className="mx-auto px-xxl-0 mt-xxl-1" style={{ maxWidth: 576 }}>
        <div className="mb-3">
          <Link to="/projectExplore">
            <span className="py-1 px-2 bg-primary-8 rounded me-2 tag-hover-category fs-sm fs-md-base">
              {projectInfo.category}
            </span>
          </Link>
          <Link to="/projectExplore">
            <span className="py-1 px-2 bg-primary-6 rounded tag-hover-status fs-sm fs-md-base">
              {countDown.days < 7 && countDown.days > 0 ? "即將結束" : "進行中"}
            </span>
          </Link>
        </div>
        <h2 className="fs-7 fs-md-6 fs-lg-3 fw-bolder mb-1 mb-md-3">
          {projectInfo.projectTitle}
        </h2>
        <p className="fs-sm fs-md-base fs-lg-7 text-primary-2">
          {projectInfo.summary}
        </p>
        <div className="my-6 my-md-8 my-lg-10">
          {/* 募資金額 */}
          <section className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
            <p className="fs-7 fs-md-6 mb-0">
              {`NT$ ${Number(projectInfo.totalMoney)?.toLocaleString()}`}
              <span className="fs-sm fs-md-base text-primary-4 ms-2 ms-md-3">{`/ NT$ ${Number(
                projectInfo.goalMoney
              )?.toLocaleString()}`}</span>
            </p>
            <p className="mb-0">{`${currentMoneyPercentage} %`}</p>
          </section>
          {/* 進度條 */}
          <section className="progress bg-primary-8" style={{ height: 8 }}>
            <div
              className="progress-bar bg-white"
              role="progressbar"
              style={{ width: `${currentMoneyPercentage}%`, borderRadius: 30 }}
              aria-valuenow={currentMoneyPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </section>
          {/* 募資人數 & 募資時間 */}
          <section className="d-flex justify-content-between align-items-start mt-3 mt-md-4">
            <div className="d-flex align-items-center gap-1">
              <span className="material-symbols-outlined text-primary-5">
                person
              </span>
              <span>{projectInfo.supportNum}</span>
            </div>
            <div className="text-end">
              <p className="fs-md-7 mb-1 mb-md-2">
                {`募資倒數 ${countDown.days} 天 ${countDown.hours} 小時 ${countDown.minutes} 分 ${countDown.seconds} 秒`}
              </p>
              <p className="fs-sm fs-md-base text-primary-4 mb-0">
                {`募資期間 ${formattedStartDate} - ${formattedEndDate} `}
              </p>
            </div>
          </section>
        </div>
        {/* 提案人-info */}
        <ProjectIntroProposerInfo studioId={projectInfo.studioId} />
      </section>
    </>
  );
}

ProjectIntroInfo.propTypes = {
  projectInfo: PropTypes.shape({
    studioId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    projectTitle: PropTypes.string,
    summary: PropTypes.string,
    category: PropTypes.string,
    supportNum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalMoney: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    goalMoney: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    createdAt: PropTypes.string,
    endAt: PropTypes.string,
  }),
};
