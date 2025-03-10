import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
const API_BASE = import.meta.env.VITE_API_BASE;

function FeedbackSwiper() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);

  // 渲染時取得資料
  useEffect(() => {
    const getFeedbackData = async (id = 1) => {
      try {
        const response = await axios.get(
          `${API_BASE}/products?projectId=${id}`
        );
        setFeedbackData(response.data);
      } catch (error) {
        alert("回饋資料取得失敗：" + error.message);
      }
    };

    getFeedbackData();
  }, []);

  // 自定義導航和分頁的樣式
  const navigationStyles = {
    navigationContainer: {
      position: "absolute",
      width: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "103%",
      left: "50%",
      transform: "translate(-50%)",
      zIndex: 10,
      padding: "0 10px",
    },
    navigationButton: {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      color: "white",
      border: "none",
      outline: "none",
    },
  };

  // 自定義導航和分頁的引用
  const prevNavRef = useRef(null);
  const nextNavRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);

  // 用於更新導航和分頁的顯示狀態
  const updateNavigationVisibility = (swiper) => {
    if (!swiper) return;

    const shouldShowNavigation =
      swiper.slides.length > swiper.params.slidesPerView;
    setShowNavigation(shouldShowNavigation);

    // 如果應該顯示導航，確保所有元素都正確初始化
    if (shouldShowNavigation) {
      setTimeout(() => {
        // 確保元素存在再初始化
        if (prevNavRef.current && nextNavRef.current && paginationRef.current) {
          swiper.params.navigation.prevEl = prevNavRef.current;
          swiper.params.navigation.nextEl = nextNavRef.current;
          swiper.params.pagination.el = paginationRef.current;

          swiper.navigation.init();
          swiper.navigation.update();
          swiper.pagination.init();
          swiper.pagination.update();

          // 使分頁指示器可見
          const paginationContainer = paginationRef.current;
          if (paginationContainer) {
            paginationContainer.style.display = "flex";
          }
        }
      }, 0);
    }
  };

  return (
    <div className="container py-4 mb-6">
      <div className="row">
        <div className="col-12 position-relative">
          {/* 自定義導航按鈕 - 根據showNavigation狀態決定是否顯示 */}
          {showNavigation && (
            <div style={navigationStyles.navigationContainer}>
              <button
                ref={prevNavRef}
                style={navigationStyles.navigationButton}
                aria-label="上一張"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {/* 自定義分頁指示器 */}
              <div
                ref={paginationRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  margin: "0 16px",
                }}
                className="pagination-container"
              >
                {/* Swiper 會自動在這裡生成分頁指示器 */}
              </div>

              <button
                ref={nextNavRef}
                style={navigationStyles.navigationButton}
                aria-label="下一張"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}

          {/* Swiper 本體 */}
          {feedbackData.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 36,
                },
                992: {
                  slidesPerView: 3.5,
                  spaceBetween: 28,
                },
                768: {
                  slidesPerView: 2.1,
                  spaceBetween: 20,
                },
                576: {
                  slidesPerView: 2.1,
                  spaceBetween: 16,
                },
              }}
              slidesPerView={1}
              spaceBetween={12}
              loop={true}
              pagination={{
                el: ".pagination-container",
                clickable: true,
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
                renderBullet: function (index, className) {
                  return `<span class="${className}" style="display: block; width: 8px; height: 8px; border-radius: 50%; background-color: #ccc; margin: 0 4px; cursor: pointer;"></span>`;
                },
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
                disabledClass: "custom-nav-disabled",
              }}
              onSwiper={(swiper) => {
                // 保存 swiper 實例供後續使用
                swiperRef.current = swiper;

                // 在 swiper 初始化後，判斷是否應該顯示導航功能
                updateNavigationVisibility(swiper);

                // 監聽視窗大小變化，重新計算是否應該顯示導航
                window.addEventListener("resize", () => {
                  updateNavigationVisibility(swiperRef.current);
                });

                // 確保分頁元素正確引用
                setTimeout(() => {
                  if (paginationRef.current) {
                    paginationRef.current.className = "pagination-container";
                  }
                  if (prevNavRef.current) {
                    prevNavRef.current.className = "swiper-button-prev-custom";
                  }
                  if (nextNavRef.current) {
                    nextNavRef.current.className = "swiper-button-next-custom";
                  }

                  swiper.navigation.init();
                  swiper.navigation.update();
                  swiper.pagination.init();
                  swiper.pagination.update();
                }, 10);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);

                // 更新活動指示器的樣式
                const bullets = document.querySelectorAll(".custom-bullet");
                bullets.forEach((bullet, index) => {
                  if (index === activeIndex) {
                    bullet.style.backgroundColor = "#fff";
                  } else {
                    bullet.style.backgroundColor = "#ccc";
                  }
                });
              }}
              onBreakpoint={(swiper) => {
                // 在斷點變化時重新判斷是否應該顯示導航
                updateNavigationVisibility(swiper);
              }}
              className="position-relative"
            >
              {feedbackData.map((feedback) => (
                <SwiperSlide
                  key={feedback.id}
                  className="card rounded-2 bg-primary-9 border shadow overflow-hidden h-auto"
                  style={{ minWidth: "320px", borderColor: "#606060" }}
                >
                  <div className="h-100 d-flex flex-column">
                    <div className="position-relative">
                      <img
                        src={feedback.image}
                        alt={feedback.title}
                        className="card-img-top"
                      />
                    </div>

                    <div className="card-body p-5 d-flex flex-column h-100">
                      <h5 className="fw-bold fs-lg-7 mb-1">{feedback.title}</h5>
                      <h3 className="fw-bold fs-lg-6 fs-7 mb-lg-6 mb-3">{`NT${feedback.price.toLocaleString(
                        "zh-TW",
                        {
                          style: "currency",
                          currency: "TWD",
                          minimumFractionDigits: 0,
                        }
                      )}`}</h3>

                      <hr className="my-3" />
                      <div className="d-flex flex-column h-100">
                        <p className="mb-lg-2 mb-1">本方案包含：</p>
                        <ol className="mb-lg-6 mb-3 text-balance">
                          {feedback.contents.map((item, index) => (
                            <li key={index}>{item.item}</li>
                          ))}
                        </ol>

                        <div className="mb-0 mt-auto">
                          <button
                            type="button"
                            className="btn btn-primary py-2 fw-bold w-100"
                          >
                            選擇此方案
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* 導航按鈕 CSS */}
          <style>
            {`
              .custom-bullet {
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #ccc;
                margin: 0 4px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
              
              .custom-bullet-active {
                background-color: #fff !important;
              }
              
              .custom-nav-disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }
              
              .pagination-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4px;
                margin: 0 16px;
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSwiper;
