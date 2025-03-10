import { NavLink, Outlet, useLocation, useParams } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export default function AdminEdit() {
  const { id } = useParams();
  const location = useLocation();

  const isOnePageRoute = ["adminAnsComment", "adminChart"];

  const pathSegments = location.pathname.split("/"); // 用split將路由拆為陣列
  const currentRoute = pathSegments[pathSegments.length - 1]; // 取得最後一個

  const shouldOnePageLayout = isOnePageRoute.includes(currentRoute);

  return (
    <>
      {shouldOnePageLayout ? (
        <Outlet />
      ) : (
        <>
          <h2 className="fs-7 fs-lg-6 mb-3 mb-md-5 mb-lg-7">專案編輯</h2>
          <section className="d-flex">
            <Swiper
              modules={[FreeMode]}
              slidesPerView="auto"
              spaceBetween={10}
              freeMode={true}
              watchOverflow={true}
              resistance={true}
              className="mb-4 edit-nav-swiper"
            >
              <SwiperSlide className="w-auto edit-nav-slide">
                <NavLink
                  className={({ isActive }) =>
                    `edit-nav-link fs-base fs-lg-7 ${
                      isActive ? "active-edit-nav-link" : ""
                    }`
                  }
                  to={`/admin/adminEdit/${id}/intro`}
                >
                  專案資訊
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="w-auto edit-nav-slide">
                <NavLink
                  className={({ isActive }) =>
                    `edit-nav-link fs-base fs-lg-7 ${
                      isActive ? "active-edit-nav-link" : ""
                    }`
                  }
                  to={`/admin/adminEdit/${id}/post`}
                >
                  最新消息
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="w-auto edit-nav-slide">
                <NavLink
                  className={({ isActive }) =>
                    `edit-nav-link fs-base fs-lg-7 ${
                      isActive ? "active-edit-nav-link" : ""
                    }`
                  }
                  to={`/admin/adminEdit/${id}/faq`}
                >
                  常見問題
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="w-auto edit-nav-slide">
                <NavLink
                  className={({ isActive }) =>
                    `edit-nav-link fs-base fs-lg-7 ${
                      isActive ? "active-edit-nav-link" : ""
                    }`
                  }
                  to={`/admin/adminEdit/${id}/feedback`}
                >
                  回饋項目
                </NavLink>
              </SwiperSlide>
            </Swiper>
          </section>
          <Outlet />
        </>
      )}
    </>
  );
}
