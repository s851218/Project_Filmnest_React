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
      top: "105%",
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
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: "20px",
      width: "100%",
      zIndex: 10,
    },
    paginationDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#ccc",
      margin: "0 4px",
      cursor: "pointer",
    },
    activeDot: {
      backgroundColor: "#fff",
    },
  };

  // 自定義導航和分頁的引用
  const prevNavRef = useRef(null);
  const nextNavRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 position-relative">
          {/* 自定義導航按鈕 */}
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

          {feedbackData.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 36,
                },
                768: {
                  slidesPerView: 3.5,
                  spaceBetween: 28,
                },
                640: {
                  slidesPerView: 2.1,
                  spaceBetween: 20,
                },
              }}
              slidesPerView={1}
              spaceBetween={12}
              pagination={{
                el: paginationRef.current,
                clickable: true,
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
                renderBullet: function (index, className) {
                  return `<span class="${className}" style="display: block; width: 8px; height: 8px; border-radius: 50%; background-color: #ccc; margin: 0 4px; cursor: pointer;"></span>`;
                },
              }}
              navigation={{
                prevEl: prevNavRef.current,
                nextEl: nextNavRef.current,
                disabledClass: "custom-nav-disabled",
              }}
              onSwiper={(swiper) => {
                // 在 swiper 初始化後，更新導航和分頁元素引用
                setTimeout(() => {
                  // 更新 swiper 參數
                  swiper.params.navigation.prevEl = prevNavRef.current;
                  swiper.params.navigation.nextEl = nextNavRef.current;
                  swiper.params.pagination.el = paginationRef.current;

                  // 重新初始化導航和分頁
                  swiper.navigation.init();
                  swiper.navigation.update();
                  swiper.pagination.init();
                  swiper.pagination.update();

                  // 添加自定義樣式到已生成的分頁指示器
                  const bullets = document.querySelectorAll(".custom-bullet");
                  bullets.forEach((bullet) => {
                    bullet.style.opacity = "1";
                  });

                  // 修改活動指示器的樣式
                  const activeBullet = document.querySelector(
                    ".custom-bullet-active"
                  );
                  if (activeBullet) {
                    activeBullet.style.backgroundColor = "#fff";
                  }
                }, 0);
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
              className="position-relative"
            >
              {feedbackData.map((feedback) => (
                <SwiperSlide
                  key={feedback.id}
                  className="card rounded-2 bg-primary-9 border shadow overflow-hidden h-100 d-flex flex-column"
                  style={{ maxWidth: "350px", borderColor: "#606060" }}
                >
                  <div className="position-relative">
                    <img
                      src={feedback.image}
                      alt={feedback.title}
                      className="card-img-top"
                    />
                  </div>

                  <div className="card-body p-5">
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
                      <ol className="list-unstyled mb-g-6 mb-3 ms-2">
                        {feedback.contents.map((item, index) => (
                          <li key={index}>{`${index + 1}、${item.item}`}</li>
                        ))}
                      </ol>

                      <div className="mt-4 mb-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg py-2 fw-bold w-100 mt-auto"
                        >
                          選擇此方案
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* 為了確保導航樣式正確應用，添加額外的 CSS */}
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
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSwiper;
