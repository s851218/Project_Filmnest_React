import { NavLink } from "react-router";

export default function ProjectIntroNav() {
  return (
    <>
      <section className="py-3 bg-primary-8 d-none d-lg-block">
        <div className="container d-flex justify-content-between">
          <ul className="list-unstyled mb-0 d-flex gap-8 align-items-center">
            <li>
              <NavLink
                to="/projectIntro"
                className="nav-link py-3 <%= page === 'project-intro' ? 'border-white ' : '' %>"
              >
                專案介紹
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projectIntro/news"
                className="nav-link py-3 <%= page === 'project-breaking-news' ? 'border-white ' : '' %>"
              >
                最新消息
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projectIntro/supportFeedback"
                className="nav-link py-3 <%= page === 'project-support-feedback' ? 'border-white ' : '' %>"
              >
                支持與回饋
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projectIntro/QA"
                className="nav-link py-3 <%= page === 'project-QA' ? 'border-white ' : '' %>"
              >
                常見問題
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projectIntro/comments"
                className="nav-link py-3 <%= page === 'project-comments' ? 'border-white ' : '' %>"
              >
                留言板
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projectIntro/infoDisclosure"
                className="nav-link py-3 <%= page === 'project-information-disclosure' ? 'border-white ' : '' %>"
                href="project-information-disclosure.html"
              >
                資訊揭露與承諾
              </NavLink>
            </li>
          </ul>
          <ul className="list-unstyled mb-0 d-flex gap-5 align-items-center">
            <li>
              <a
                className="p-3 border border-primary-4 rounded-circle heart-hover"
                href="#"
              >
                <span className="material-symbols-outlined text-white align-bottom">
                  favorite
                </span>
              </a>
            </li>
            <li>
              <a
                className="btn btn-primary py-3 fw-bolder"
                style={{ width: 188 }}
                href="feedback-choice.html"
              >
                立即贊助
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* 專案介紹頁導覽列-手機版 */}
      <section className="py-2 bg-primary-8 d-block d-lg-none">
        <div className="container d-flex">
          <div className="swiper project-intro-nav-swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-intro' ? 'border-white ' : '' %>"
                  href="project-intro.html"
                >
                  專案介紹
                </a>
              </div>
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-breaking-news' ? 'border-white ' : '' %>"
                  href="project-breaking-news.html"
                >
                  最新消息
                </a>
              </div>
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-support-feedback' ? 'border-white ' : '' %>"
                  href="project-support-feedback.html"
                >
                  支持與回饋
                </a>
              </div>
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-QA' ? 'border-white ' : '' %>"
                  href="project-QA.html"
                >
                  常見問題
                </a>
              </div>
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-comments' ? 'border-white ' : '' %>"
                  href="project-comments.html"
                >
                  留言板
                </a>
              </div>
              <div className="swiper-slide w-auto">
                <a
                  className="nav-link py-3 <%= page === 'project-information-disclosure' ? 'border-white ' : '' %>"
                  href="project-information-disclosure.html"
                >
                  資訊揭露與承諾
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 專案介紹頁導覽列-收藏和立即贊助-手機版 */}
      <section className="py-5 bg-collect-support w-100 d-block d-lg-none position-fixed bottom-0 z-2">
        <div className="container">
          <ul className="list-unstyled mb-0 d-flex gap-3 align-items-center justify-content-center">
            <li>
              <a
                className="p-3 border border-primary-4 rounded-circle heart-hover"
                href="#"
              >
                <span className="material-symbols-outlined text-white align-bottom">
                  favorite
                </span>
              </a>
            </li>
            <li>
              <a
                className="btn btn-primary py-3 fw-bolder"
                style={{ width: 291 }}
                href="feedback-choice.html"
              >
                立即贊助
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
