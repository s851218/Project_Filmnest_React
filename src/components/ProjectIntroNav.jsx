import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Alert, Toast } from "../js/customSweetAlert";
import PropTypes from "prop-types";

// import Swiper core and required modules
import { FreeMode } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroNav({ projectId }) {
  const { userId, token } = useSelector((state) => state.user.profile);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 檢查收藏狀態
  useEffect(() => {
    if (!projectId || !userId) return;

    const getFavoritesData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/favorites?userId=${userId}&projectId=${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.length > 0) {
          setIsFavorited(true);
          setFavoriteId(res.data[0].id);
        }
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "取得收藏狀態失敗",
          });
        }
      }
    };
    getFavoritesData();
  }, [projectId, userId, token]);

  // 收藏與取消收藏
  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!isFavorited) {
      setIsLoading(true);
      try {
        const res = await axios.post(`${API_BASE}/favorites`, { userId, projectId }, { headers: { Authorization: `Bearer ${token}` } });
        setIsFavorited(true);
        setFavoriteId(res.data.id);
        Toast.fire({
          icon: "success",
          title: "專案已收藏！",
        });
      } catch (error) {
        if (error) {
          Toast.fire({
            icon: "error",
            title: "新增收藏失敗",
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        await axios.delete(`${API_BASE}/favorites/${favoriteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorited(false);
        setFavoriteId(null);
        Toast.fire({
          icon: "success",
          title: "專案已取消收藏！",
        });
      } catch (error) {
        if (error) {
          Toast.fire({
            icon: "error",
            title: "取消收藏失敗",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <section className="py-3 bg-primary-8 d-none d-lg-block" style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <div className="container d-flex justify-content-between">
          <ul className="list-unstyled mb-0 d-flex gap-8 align-items-center">
            <li>
              <NavLink to="" end className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                專案介紹
              </NavLink>
            </li>
            <li>
              <NavLink to="news" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                最新消息
              </NavLink>
            </li>
            <li>
              <NavLink to="supportFeedback" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                支持與回饋
              </NavLink>
            </li>
            <li>
              <NavLink to="QA" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                常見問題
              </NavLink>
            </li>
            <li>
              <NavLink to="comments" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                留言板
              </NavLink>
            </li>
            <li>
              <NavLink to="infoDisclosure" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                資訊揭露與承諾
              </NavLink>
            </li>
          </ul>
          <ul className="list-unstyled mb-0 d-flex gap-5 align-items-center">
            <li>
              <button className="p-3 border border-primary-4 rounded-circle heart-hover" onClick={toggleFavorite} disabled={isLoading}>
                <span
                  className="material-symbols-outlined text-white align-bottom"
                  style={{
                    fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </li>
            <li>
              <Link to={`/feedbackPage/projectId=${projectId}`} className="btn btn-primary py-3 fw-bolder" style={{ width: 188 }}>
                立即贊助
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 專案介紹頁導覽列-手機版 */}
      <section className="py-2 bg-primary-8 d-block d-lg-none" style={{ position: "sticky", top: "0", zIndex: "200" }}>
        <div className="container d-flex">
          <Swiper modules={[FreeMode]} slidesPerView="auto" spaceBetween={20} freeMode={true} watchOverflow={true} resistance={true} className="project-intro-nav-swiper">
            <SwiperSlide className="w-auto">
              <NavLink to="" end className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                專案介紹
              </NavLink>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <NavLink to="news" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                最新消息
              </NavLink>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <NavLink to="supportFeedback" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                支持與回饋
              </NavLink>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <NavLink to="QA" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                常見問題
              </NavLink>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <NavLink to="comments" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                留言板
              </NavLink>
            </SwiperSlide>
            <SwiperSlide className="w-auto">
              <NavLink to="infoDisclosure" className={({ isActive }) => `nav-link py-3 ${isActive ? "project-intro-nav-active" : ""}`}>
                資訊揭露與承諾
              </NavLink>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* 專案介紹頁導覽列-收藏和立即贊助-手機版 */}
      <section className="py-5 bg-collect-support w-100 d-block d-lg-none position-fixed bottom-0" style={{ zIndex: "200" }}>
        <div className="container">
          <ul className="list-unstyled mb-0 d-flex gap-3 align-items-center justify-content-center">
            <li>
              <button type="button" className="p-3 border border-primary-4 rounded-circle heart-hover" onClick={toggleFavorite} disabled={isLoading}>
                <span
                  className="material-symbols-outlined text-white align-bottom"
                  style={{
                    fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </li>
            <li>
              <Link to={`/feedbackPage/projectId=${projectId}`} className="btn btn-primary py-3 fw-bolder" style={{ width: 291 }}>
                立即贊助
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

ProjectIntroNav.propTypes = {
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
