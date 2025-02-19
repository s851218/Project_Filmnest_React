import axios from "axios";
import Swiper from "swiper/bundle";
import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { Link } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [sortProjects, setSortProjects] = useState([]);
  const swiperRef = useRef(null);
  const swiper2Ref = useRef(null);

  const getProjectsData = async () => {
    try {
      const response = await axios.get(`${apiBase}/projects`);
      setProjects(response.data);
      setSortProjects(response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.log("取得產品失敗");
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  useEffect(() => {
    new Swiper(swiperRef.current, {
      slidesPerView: 1.1, // 每次顯示的幻燈片數量
      spaceBetween: 24, // 兩張圖片之間的間距
      navigation: {
        // 啟用左右箭頭
        nextEl: ".indexcard-button-next",
        prevEl: ".indexcard-button-prev",
      },
      pagination: {
        // 啟用下方的點點導航
        el: ".indexcard-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3.1,
        },
        576: {
          slidesPerView: 2.1,
        },
      },
    });
    new Swiper(swiper2Ref.current, {
      slidesPerView: 1.1, // 每次顯示的幻燈片數量
      spaceBetween: 24, // 兩張圖片之間的間距
      navigation: {
        // 啟用左右箭頭
        nextEl: ".indexcard2-button-next",
        prevEl: ".indexcard2-button-prev",
      },
      pagination: {
        // 啟用下方的點點導航
        el: ".indexcard2-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3.1,
        },
        576: {
          slidesPerView: 2.1,
        },
      },
    });
  }, []);
  return (
    <>
      <section className="index-projectcard position-relative">
        <div className="container pt-18 pb-11 py-lg-20">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-7 fs-lg-6 mb-0 text-white">精選專案</h2>
              <div className="d-flex align-items-center">
                <div>
                  <div className="swiper-button-prev indexcard-button-prev custom-style-prev d-none d-md-flex"></div>
                </div>
                <div className="swiper-pagination indexcard-pagination custom-style-pagination d-none d-md-flex"></div>
                <div>
                  <div className="swiper-button-next indexcard-button-next custom-style-next d-none d-md-flex"></div>
                </div>
                <Link to="/projectExplore" className="fs-sm fs-lg-base d-block mb-0 text-nowrap ms-5 link-light">
                  查看更多
                </Link>
              </div>
            </div>
            <div ref={swiperRef} className="swiper indexcard pb-16 pb-lg-20 pt-7 ps-3" style={{ marginLeft: "-12px", overflow: "hidden" }}>
              <div className="swiper-wrapper">
                <Card projects={projects} />
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="fs-7 fs-lg-6 mb-0 text-white">最新專案</h2>
              <div className="d-flex align-items-center">
                <div>
                  <div className="swiper-button-prev indexcard2-button-prev custom-style-prev d-none d-md-flex"></div>
                </div>
                <div className="swiper-pagination indexcard2-pagination custom-style-pagination d-none d-md-flex"></div>
                <div>
                  <div className="swiper-button-next indexcard2-button-next custom-style-next d-none d-md-flex"></div>
                </div>
                <Link to="/projectExplore" className="fs-sm fs-lg-base d-block mb-0 text-nowrap ms-5 link-light">
                  查看更多
                </Link>
              </div>
            </div>
            <div ref={swiper2Ref} className="swiper indexcard2 pb-16 pb-lg-20 pt-7 ps-3" style={{ marginLeft: "-12px", overflow: "hidden" }}>
              <div className="swiper-wrapper">
                <Card projects={sortProjects} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
