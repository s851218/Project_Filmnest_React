export default function AdminSummary () {
  return(
    <div className="container mb-6 mb-lg-15">
      <h1 className="fs-6 mb-3 mb-sm-7">摘要</h1>
      <div className="summary">
        <div className="item shadow ">
          <img src="募資金額.png" className="bg-primary-5" alt="募資金額" />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
            <p className="fs-md-3 fs-7 fw-bolder mb-0">5,511,654</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="觀看次數.png" className="bg-primary-5" alt="觀看次數" />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">觀看次數</h3>
            <p className="fs-md-3 fs-7 fw-bolder mb-0">5.3K</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="瀏覽量.png" className="bg-primary-5" alt="瀏覽量" />
          <div>
            <h3 className="fs-base mb-0 text-primary-6">瀏覽量</h3>
            <p className="fs-xl-3 fs-md-6 fs-7 fw-bolder mb-0">8.2K</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="專案數量.png" className="bg-primary-5" alt="專案數量" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">4</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="影音數量.png" className="bg-primary-5" alt="影音數量" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">4</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="收藏數量.png" className="bg-primary-5" alt="收藏數量" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">收藏數量</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">672</p>
          </div>
        </div>
        <div className="item shadow">
          <img src="觀看時間.png" className="bg-primary-5" alt="觀看時間" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">368
              <span className="fs-base ms-2">hr</span>
            </p>
          </div>
        </div>
        <div className="item shadow">
          <img src="留言數.png" className="bg-primary-5" alt="留言數" />
          <div>
            <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
            <p className="fs-md-6 fs-7 fw-bolder mb-0">368</p>
          </div>
        </div>
      </div>
    </div>
  )
}