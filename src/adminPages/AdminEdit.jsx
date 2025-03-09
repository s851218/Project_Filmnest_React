import { NavLink, Outlet } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export default function AdminEdit() {
  return (
    <>
      <section className="d-none d-sm-block">
        <h2 className="fs-7 fs-lg-6 mb-3 mb-md-5 mb-lg-7">專案編輯</h2>
        <ul className="nav nav-fill mb-4 mb-md-5 mb-lg-6">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/intro"
            >
              專案資訊
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/post"
            >
              最新消息
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/faq"
            >
              常見問題
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/feedback"
            >
              回饋項目
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </section>

      {/* 專案介紹頁導覽列-手機版 */}
      <section className="d-block d-sm-none">
        <h2 className="fs-7 fs-lg-6 mb-3 mb-md-5 mb-lg-7">專案編輯</h2>
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          watchOverflow={true}
          resistance={true}
          className="mb-4"
        >
          <SwiperSlide className="w-auto">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/intro"
            >
              專案資訊
            </NavLink>
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/post"
            >
              最新消息
            </NavLink>
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/faq"
            >
              常見問題
            </NavLink>
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <NavLink
              className={({ isActive }) =>
                `edit-nav-link fs-base fs-lg-7 ${
                  isActive ? "active-edit-nav-link" : ""
                }`
              }
              to="/admin/adminEdit/feedback"
            >
              回饋項目
            </NavLink>
          </SwiperSlide>
        </Swiper>
        <Outlet />
      </section>
    </>
  );
}
