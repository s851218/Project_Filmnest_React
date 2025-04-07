export default function AdminSummary () {
  return(
    <div className="container mb-6 mb-lg-15">
      <div className="d-none d-lg-block">
        <h1 className="fs-6 mb-7">摘要</h1>
        <div className="row row-cols-3 gx-5 mb-5">
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-5">
              <div className="me-5">
                <img src="募資金額.png" className="bg-primary-5 rounded-2 p-3" alt="募資金額" />
              </div>
              <div>
                <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
                <p className="fs-2 fw-bolder mb-0">5,511,654</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-5">
              <div className="me-5">
                <img src="觀看次數.png" className="bg-primary-5 rounded-2 p-3" alt="觀看次數" />
              </div>
              <div>
                <h3 className="fs-base mb-0 text-primary-6">觀看次數</h3>
                <p className="fs-2 fw-bolder mb-0">5.3K</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-5">
              <div className="me-5">
                <img src="瀏覽量.png" className="bg-primary-5 rounded-2 p-3" alt="瀏覽量" />
              </div>
              <div>
                <h3 className="fs-base mb-0 text-primary-6">瀏覽量</h3>
                <p className="fs-2 fw-bolder mb-0">8.2K</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-5 gx-5">
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-4">
              <div className="me-5">
                <img src="專案數量.png" className="bg-primary-5 rounded-2 p-2" alt="專案數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
                <p className="fs-6 fw-bolder mb-0">4</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-4">
              <div className="me-5">
                <img src="影音數量.png" className="bg-primary-5 rounded-2 p-2" alt="影音數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
                <p className="fs-6 fw-bolder mb-0">4</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-4">
              <div className="me-5">
                <img src="收藏數量.png" className="bg-primary-5 rounded-2 p-2" alt="收藏數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">收藏數量</h3>
                <p className="fs-6 fw-bolder mb-0">672</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-4">
              <div className="me-5">
                <img src="觀看時間.png" className="bg-primary-5 rounded-2 p-2" alt="觀看時間" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
                <p className="fs-6 fw-bolder mb-0">368 hr</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center rounded-2 bg-white p-4">
              <div className="me-5">
                <img src="留言數.png" className="bg-primary-5 rounded-2 p-2" alt="留言數" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
                <p className="fs-6 fw-bolder mb-0">368</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block d-lg-none">
        <h1 className="fs-base mb-3">摘要</h1>
        <div className="row g-3 mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="募資金額.png" className="bg-primary-5 rounded-2 p-2" style={{ width: "40px" }} alt="募資金額" />
              </div>
              <div>
                <h3 className="fs-base mb-0 text-primary-6">募資金額</h3>
                <p className="fs-6 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="觀看次數.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="觀看次數" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">觀看次數</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="瀏覽量.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="瀏覽量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">瀏覽量</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="專案數量.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="專案數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">專案數量</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="影音數量.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="影音數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">影音數量</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="收藏數量.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="收藏數量" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">收藏數量</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="觀看時間.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="觀看時間" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">觀看時間</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center rounded-2 bg-white p-3">
              <div className="me-5">
                <img src="留言數.png" className="bg-primary-5 rounded-2 p-1" style={{ width: "28px" }} alt="留言數" />
              </div>
              <div>
                <h3 className="fs-sm mb-0 text-primary-6">留言數</h3>
                <p className="fs-7 fw-bolder mb-0">9999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}