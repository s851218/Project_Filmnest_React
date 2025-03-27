// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Thumbs } from "swiper/modules";

import { useEffect, useRef, useState } from "react";
// prop validation
import PropTypes from "prop-types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

export default function ProjectIntroSwiper({ projectInfo }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [otherImages, setOtherImages] = useState([]);

  const swiperRef = useRef();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // 將專案封面圖加進 otherImages 後，產生一個新的圖片陣列
  useEffect(() => {
    if (projectInfo && projectInfo.projectImage) {
      const addMainImage = [
        {
          id: `${new Date().getTime()}`,
          imageUrl: projectInfo.projectImage,
        },
        ...(Array.isArray(projectInfo.otherImages)
          ? projectInfo.otherImages
          : []),
      ];
      setOtherImages(addMainImage);
    }
  }, [projectInfo]);

  // 把 otherImages 當成依賴，能確保在圖片陣列更新後，Swiper 的內部狀態也跟著更新，第一張圖片的縮圖才正確顯示 active 狀態。
  useEffect(() => {
    if (thumbsSwiper && swiperRef.current) {
      swiperRef.current.update();
    }
  }, [otherImages]);

  // 手機版 Navigation
  const handlePrevSlide = () => {
    swiperRef.current.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current.slideNext();
  };

  return (
    <>
      <main className="mx-auto px-xxl-0" style={{ maxWidth: 660 }}>
        {/* 上方大圖的 Swiper */}
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{
            swiper: thumbsSwiper,
          }}
          spaceBetween={24}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="rounded overflow-hidden mb-0 mb-md-1 mb-lg-2 mb-xxl-3 project-intro-swiper"
        >
          {otherImages.map((image) => (
            <SwiperSlide
              key={image.id}
              className="project-intro-main-swiper-slide"
            >
              <img className="rounded" src={image.imageUrl} alt="外送員" />
            </SwiperSlide>
          ))}
          <button
            type="button"
            className={`project-intro-unstyled-btn swiper-button-prev projectIntroSwiper-button-prev d-flex d-md-none 
                ${isBeginning ? "hidden-btn" : ""}`}
            onClick={handlePrevSlide}
          ></button>
          <button
            type="button"
            className={`project-intro-unstyled-btn swiper-button-next projectIntroSwiper-button-next d-flex d-md-none 
                ${isEnd ? "hidden-btn" : ""}`}
            onClick={handleNextSlide}
          ></button>
        </Swiper>

        {/* 下方圖片的 Swiper */}
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={3}
          spaceBetween={24}
          className="projectIntroSwiper d-none d-md-block"
          style={{ cursor: "pointer" }}
        >
          {otherImages.map((image) => (
            <SwiperSlide key={image.id} className="swiper-slide">
              <img
                className="rounded small-slide-image"
                src={image.imageUrl}
                alt="外送員"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </>
  );
}

ProjectIntroSwiper.propTypes = {
  projectInfo: PropTypes.shape({
    projectImage: PropTypes.string.isRequired,
    otherImages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired
    ),
  }),
};
