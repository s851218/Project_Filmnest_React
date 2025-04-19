import { Link, ScrollRestoration, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function PaymentComplete() {
  const state = useLocation();
  const {
    projectTitle,
    productTitle,
    totalMoney,
    goalMoney,
    type,
    bankCode,
    accountNumber,
    paymentCode,
  } = state.state;

  let HelmetTitle;
  switch (type) {
    case 0:
      HelmetTitle = "完成付款";
      break;

    case 1:
    case 2:
      HelmetTitle = "完成訂單";
      break;

    default:
      break;
  }

  const goalPercent = (totalMoney / goalMoney).toFixed(2) * 100;

  // 處理截止日期 隔日23:59:59
  Date.prototype.clone = function () {
    return new Date(this.valueOf());
  };
  let newDateTime = new Date();

  const paymentDeadline = newDateTime.clone();
  paymentDeadline.setDate(paymentDeadline.getDate() + 1);
  paymentDeadline.setHours(23, 59, 59, 999);
  // 處理截止日期 隔日23:59:59

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>{HelmetTitle}</title>
      </Helmet>

      <div className="payment-success-banner" data-aos="zoom-in">
        <div className="container" data-aos="zoom-in" data-aos-delay="200">
          <div className="thanks-wrapper w-lg-50 w-md-75 w-100">
            <div className="thanks-content">
              {/* <!-- 確認方案 --> */}
              <h1
                className="bi bi-check-circle py-4"
                style={{ color: "lightgreen" }}
                data-aos="zoom-out-up"
                data-aos-delay="300"
              >
                {type === 0 ? "付款成功" : "訂單成立"}
              </h1>
              <div className="payment-success-title">
                <p className="mb-2">您贊助的方案為</p>
                <h4 className="w-75 mx-auto">{projectTitle}</h4>
                <h2>【 {productTitle} 】</h2>
              </div>

              {type === 0 && (
                <>
                  {/* <!-- 感謝區塊 --> */}
                  <section>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <span className="fs-7 fw-bold text-warning me-1">
                        感謝您
                      </span>
                      <p className="mb-0" style={{ lineHeight: "20px" }}>
                        的贊助！
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="fs-7 fw-bold text-warning">因為您</span>
                      <p className="mb-0" style={{ lineHeight: "20px" }}>
                        ，我們的目標前進了一大步！
                      </p>
                    </div>
                  </section>

                  {/* <!-- 進度條區塊 --> */}
                  <section className="thanks-progress-wrapper d-flex align-items-center w-md-75 w-100 mx-auto">
                    <div
                      className="progress bg-primary-8"
                      style={{ height: 8 }}
                    >
                      <div
                        className="progress-bar bg-white"
                        role="progressbar"
                        style={{ width: `${goalPercent}%`, borderRadius: 30 }}
                        aria-valuenow={goalPercent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="fs-7 mb-0">{`${goalPercent} %`}</p>
                  </section>
                </>
              )}

              {type !== 0 && (
                <>
                  {/* <!-- 感謝區塊 --> */}
                  <section>
                    <h4 className="fs-sm-7 fs-sm text-danger">
                      {type === 1 && "請於期限內使用ATM轉帳至以下帳戶"}
                      {type === 2 &&
                        "請於期限內至四大超商之多媒體機台(ibon、FamiPort、OK-go、Life-ET)列印繳費單至超商櫃台以現金繳費。"}
                    </h4>
                    <div className="row justify-content-center text-start">
                      <div className="col-xxl-6 col-xl-8 col-lg-10 col-sm-8 col-10 mb-2">
                        {type === 1 && (
                          <>
                            <p className="fs-md-6 fs-7 mb-0">
                              銀行代碼：{bankCode}
                            </p>
                            <p className="fs-md-6 fs-7 mb-0">
                              帳號：{accountNumber}
                            </p>
                          </>
                        )}
                        {type === 2 && (
                          <p className="fs-md-6 fs-7 mb-0">
                            繳費代碼：{paymentCode}
                          </p>
                        )}
                      </div>
                    </div>
                    <h4 className="fs-sm text-danger">
                      *繳費期限：{paymentDeadline.toLocaleString("sv")}
                    </h4>
                    {/* 時間格式轉換 yyyy-MM-mm HH:mm:ss https://blog.darkthread.net/blog/js-date-yyyymmdd-hhmmss/ */}
                  </section>

                  {/* <!-- 感謝區塊 --> */}
                  <section>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <span className="fs-7 fw-bold text-warning me-1">
                        感謝您
                      </span>
                      <p className="mb-0" style={{ lineHeight: "20px" }}>
                        的贊助！
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="fs-7 fw-bold text-warning">因為您</span>
                      <p className="mb-0" style={{ lineHeight: "20px" }}>
                        ，我們的目標前進了一大步！
                      </p>
                    </div>
                  </section>
                </>
              )}

              {/* <!-- 按鈕區塊 --> */}
              <section className="w-lg-50 w-md-75 w-100 mx-auto mt-auto">
                <Link to="/" className="btn btn-secondary btn-base w-100 mb-2">
                  回到首頁
                  <i className="bi bi-house-door ms-1" />
                </Link>
                <Link
                  to="/projectExplore"
                  className="btn btn-primary btn-base w-100 mb-4"
                >
                  繼續探索
                  <i className="bi bi-arrow-right-circle ms-1" />
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
