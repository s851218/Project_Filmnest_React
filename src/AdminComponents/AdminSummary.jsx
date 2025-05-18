export default function AdminSummary() {
  return (
    <div className="container mb-6 mb-lg-15">
      <h1 className="fs-6 mb-3 mb-sm-7">摘要</h1>
      <div className="summary">
        <div className="item shadow ">
          <img
            src="fundsRaisedIcon.png"
            className="bg-primary-5"
            alt="fundsRaisedIcon"
          />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
            <p className="fs-md-3 fs-7 fw-bolder mb-0">5,511,654</p>
          </div>
        </div>
        <div className="item shadow">
          <img
            src="watchNumIcon.png"
            className="bg-primary-5"
            alt="watchNumIcon"
          />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">觀看次數</h3>
            <p className="fs-md-3 fs-7 fw-bolder mb-0">5.3K</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="viewsIcon.png" className="bg-primary-5" alt="viewsIcon" />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">瀏覽量</h3>
            <p className="fs-xl-3 fs-md-6 fs-7 fw-bolder mb-0">8.2K</p>
          </div>
        </div>
        <div className="item shadow">
          <img
            src="projectsNumIcon.png"
            className="bg-primary-5"
            alt="projectsNumIcon"
          />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">4</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="videosNum.png" className="bg-primary-5" alt="videosNum" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">4</p>
          </div>
        </div>
        <div className="item shadow">
          <img
            src="collectNumIcon.png"
            className="bg-primary-5"
            alt="collectNumIcon"
          />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">專案收藏數</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">672</p>
          </div>
        </div>
        <div className="item shadow">
          <img
            src="watchTimeIcon.png"
            className="bg-primary-5"
            alt="watchTimeIcon"
          />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">
              368
              <span className="fs-base ms-2">hr</span>
            </p>
          </div>
        </div>
        <div className="item shadow">
          <img
            src="commitNumIcon.png"
            className="bg-primary-5"
            alt="commitNumIcon"
          />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">368</p>
          </div>
        </div>
      </div>
    </div>
  );
}
