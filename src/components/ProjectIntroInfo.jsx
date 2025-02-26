import ProjectIntroProposerInfo from "./ProjectIntroPropserInfo";

export default function ProjectIntroInfo() {
  return (
    <>
      <section className="mx-auto px-xxl-0 mt-xxl-1" style={{ maxWidth: 576 }}>
        <div className="mb-3">
          <a href="project-explore.html">
            <span className="py-1 px-2 bg-primary-8 rounded me-2 tag-hover-category">
              紀錄片
            </span>
          </a>
          <a href="project-explore.html">
            <span className="py-1 px-2 bg-primary-6 rounded tag-hover-status">
              進行中
            </span>
          </a>
        </div>
        <h2 className="fs-6 fs-md-3 fw-bolder mb-1 mb-md-3">
          《 追風者 》紀錄片募資計畫
        </h2>
        <p className="fs-md-7 text-primary-2">外送人員不為人知的辛勞</p>
        <div className="my-8 my-md-10">
          {/* 募資金額 */}
          <section className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
            <p className="fs-7 fs-md-6 mb-0">
              NT$ 2,250,000
              <span className="fs-sm fs-md-base text-primary-4 ms-2 ms-md-3">
                / NT$ 3,000,000
              </span>
            </p>
            <p className="mb-0">75%</p>
          </section>
          {/* 進度條 */}
          <section className="progress bg-primary-8" style={{ height: 8 }}>
            <div
              className="progress-bar bg-white"
              role="progressbar"
              style={{ width: "75%", borderRadius: 30 }}
              aria-valuenow={75}
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
              <span>100</span>
            </div>
            <div className="text-end">
              <p className="fs-md-7 mb-1 mb-md-2">募資倒數 15 天 3 小時</p>
              <p className="fs-sm fs-md-base text-primary-4 mb-0">
                募資期間 2024/8/3 - 2024/12/31
              </p>
            </div>
          </section>
        </div>
        {/* 提案人-info */}
        <ProjectIntroProposerInfo />
      </section>
    </>
  );
}
