import { Link } from "react-router";
export default function Card({ projects, isSwiper }) {
  return projects?.map((project) => {
    const endDate = new Date(project.endAt); // 設定結束日期
    const nowDate = new Date(); // 取得今天的日期

    // 計算剩餘天數
    const time = endDate - nowDate; // 取得毫秒差
    const remainDays = Math.ceil(time / (1000 * 60 * 60 * 24)); // 轉換為天數，並用 Math.ceil取整數
    return isSwiper ? (
      <div className="swiper-slide h-auto" key={project.id}>
        <div className="card index-card rounded-0 h-100">
          <img
            src={project.projectImage}
            className="card-img-top rounded-0 mb-3"
            alt=""
          />
          <div className="card-body p-3 d-flex flex-column">
            <Link
              to={`/projects/${project.id}`}
              className="link-light stretched-link"
            >
              <h3 className="fs-sm fs-lg-base mb-4">{project.projectTitle}</h3>
            </Link>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-auto">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined text-white fs-7">
                  person
                </span>
                <p className="text-white mb-0 fs-sm fs-lg-base">
                  {project.supportNum}
                </p>
              </div>
              <p className="text-white mb-0 fs-sm fs-lg-base">
                倒數<span className="fw-bolder">{remainDays}</span>天
              </p>
            </div>
            <div
              className="progress index-progress mb-4 bg-primary-8"
              role="progressbar"
              aria-label="Example 1px high"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "4px" }}
            >
              <div
                className="progress-bar index-progress-bar bg-white bg-white"
                style={{ width: "90%" }}
              ></div>
            </div>
            <h4 className="fs-7 fs-lg-6 text-white mb-0">
              NT${project.totalMoney.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    ) : (
      <div className="col g-5 h-auto" key={project.id}>
        <div className="card index-card rounded-0 h-100">
          <img
            src={project.projectImage}
            className="card-img-top rounded-0 mb-3"
            alt=""
          />
          <div className="card-body p-3 d-flex flex-column">
            <Link
              to={`/projects/${project.id}`}
              className="link-light stretched-link"
            >
              <h3 className="fs-sm fs-lg-base mb-4">{project.projectTitle}</h3>
            </Link>
            <div className="d-flex justify-content-between align-items-center mb-4 mt-auto">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined text-white fs-7">
                  person
                </span>
                <p className="text-white mb-0 fs-sm fs-lg-base">
                  {project.supportNum}
                </p>
              </div>
              <p className="text-white mb-0 fs-sm fs-lg-base">
                倒數<span className="fw-bolder">{remainDays}</span>天
              </p>
            </div>
            <div
              className="progress index-progress mb-4 bg-primary-8"
              role="progressbar"
              aria-label="Example 1px high"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ height: "4px" }}
            >
              <div
                className="progress-bar index-progress-bar bg-white bg-white"
                style={{ width: "90%" }}
              ></div>
            </div>
            <h4 className="fs-7 fs-lg-6 text-white mb-0">
              NT${project.totalMoney.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    );
  });
}
