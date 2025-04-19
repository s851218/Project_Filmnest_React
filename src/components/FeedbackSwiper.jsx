import axios from "axios";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link, useParams } from "react-router";
import GrayScreenLoading from "./GrayScreenLoading";
import { Alert } from "../js/customSweetAlert";
const API_BASE = import.meta.env.VITE_API_BASE;

function FeedbackSwiper() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const { id } = useParams();
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef(null);

  //處理params
  useEffect(() => {
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

  const getFeedbackData = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/products?projectId=${id}`);
      setFeedbackData(response.data);
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "回饋資料取得失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 渲染時取得資料
  useLayoutEffect(() => {
    if (params.projectId) {
      getFeedbackData(params.projectId);
    }
  }, [params]);

  // 用於更新導航可見性
  const updateNavigationVisibility = (swiper) => {
    if (!swiper) return;
    const shouldShowNavigation =
      swiper.slides.length > swiper.params.slidesPerView;
    setShowNavigation(shouldShowNavigation);
  };

  return (
    <>
      <div className="container py-4 my-10">
        <div className="row">
          <div className="col-12 position-relative">
            {/* Swiper 本體 */}
            {feedbackData.length > 0 && (
              <>
                <Swiper
                  modules={[Navigation, Pagination]}
                  breakpoints={{
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 8,
                    },
                  }}
                  slidesPerView={1}
                  spaceBetween={4}
                  pagination={false} // 以自定義方式控制，因此取消內建
                  navigation={false} // 與上同理
                  onSwiper={(swiper) => {
                    // 保存 swiper 實例供後續使用
                    swiperRef.current = swiper;
                    updateNavigationVisibility(swiper);

                    // 監聽視窗大小變化
                    window.addEventListener("resize", () => {
                      updateNavigationVisibility(swiperRef.current);
                    });
                  }}
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                  }}
                  onBreakpoint={(swiper) => {
                    updateNavigationVisibility(swiper);
                  }}
                  className="position-relative p-5"
                >
                  {feedbackData.map((feedback) => (
                    <SwiperSlide
                      key={feedback.id}
                      className="card feedbackSlide rounded-2 bg-primary-9 border overflow-hidden h-auto"
                      style={{ borderColor: "#606060", minWidth: "250px" }}
                    >
                      <div className="h-100 d-flex flex-column">
                        <div
                          className="position-relative card-img-top overflow-hidden"
                          style={{ height: "230px" }}
                        >
                          <img
                            src={feedback.image}
                            alt={feedback.title}
                            className="feedback-image object-fit-cover w-100 h-100"
                            style={{
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </div>

                        <div className="card-body p-5 d-flex flex-column h-100">
                          <div>
                            <h5 className="fw-bold fs-lg-6 mb-1">
                              {feedback.title}
                            </h5>
                            <p className="fw-bold fs-lg-5 fs-7 mb-lg-2 mb-1">{`NT$ ${feedback.price.toLocaleString(
                              "zh-TW"
                              // {
                              //   style: "currency",
                              //   currency: "TWD",
                              //   minimumFractionDigits: 0,
                              // }
                            )}`}</p>

                            <hr className="my-3" />
                            <div className="d-flex flex-column">
                              <p className="mb-lg-2 mb-1">本方案包含：</p>
                              <ol className="mb-lg-6 mb-3 text-balance">
                                {feedback.contents.map((item, index) => (
                                  <li key={index}>{item.item}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                          <div className="mb-0 mt-auto">
                            <Link
                              to={`/feedbackOption/projectId=${params.projectId}&productId=${feedback.id}`}
                              className={`btn btn-primary btn-main fw-bold w-100 ${
                                params.productId === feedback.id
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              選擇此方案
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* 自定義導航和分頁 */}
                {showNavigation && (
                  <div className="custom-controls-container">
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      {/* 導航按鈕 */}
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="custom-nav-button me-3"
                        aria-label="上一張"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>

                      {/* 分頁指示器 */}
                      <div className="custom-pagination">
                        {Array.from({ length: feedbackData.length }).map(
                          (_, index) => (
                            <span
                              key={index}
                              className={`custom-bullet ${
                                index === activeIndex
                                  ? "custom-bullet-active"
                                  : ""
                              }`}
                              onClick={() => swiperRef.current?.slideTo(index)}
                            ></span>
                          )
                        )}
                      </div>

                      {/* 導航按鈕 */}
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="custom-nav-button ms-3"
                        aria-label="下一張"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 樣式設定 */}
            <style>
              {`
              .custom-controls-container {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
              }
              
              .custom-nav-button {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .custom-nav-button:hover {
                background-color: rgba(0, 0, 0, 0.9);
              }
              
              .custom-pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
              }
              
              .custom-bullet {
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #ccc;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .custom-bullet-active {
                background-color: #fff !important;
                transform: scale(1.2);
              }

              .feedbackSlide {
                transition: box-shadow 0.3s ease;
              }

              .feedbackSlide:hover {
                box-shadow: 0 0 20px 8px rgba(96, 96, 96, 0.7); 
              }

              .feedbackSlide:hover .feedback-image{
                transform: scale(1.1);
              }
            `}
            </style>
          </div>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}

export default FeedbackSwiper;
