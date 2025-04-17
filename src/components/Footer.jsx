import { Link, useLocation } from "react-router";
export default function Footer() {
  const location = useLocation();
  const pathName = location.pathname.split("/").at(1);

  return (
    <>
      {pathName !== "admin" ? (
        <footer className="footer-bg py-8 pt-md-20 pb-md-10">
          <div className="container">
            <ul className="list-unstyled d-md-flex">
              <li className="w-md-50 mb-10 mb-md-0">
                <ul className="list-unstyled d-flex flex-md-column justify-content-between h-100">
                  <li>
                    <Link>
                      <img src="https://s851218.github.io/Project-FilmNest/assets/logo-lg-d75594b8.png" alt="" />
                    </Link>
                  </li>
                  <li className="d-flex me-4" style={{ gap: "12px" }}>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter-x"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-youtube"></i>
                    <i className="bi bi-line"></i>
                  </li>
                </ul>
              </li>
              <li className="w-md-50">
                <ul className="list-unstyled d-flex justify-content-between">
                  <li className="d-flex flex-column gap-3">
                    <Link to="/">精選專案</Link>
                    <Link to="/">專案瀏覽</Link>
                  </li>
                  <li className="d-flex flex-column gap-3">
                    <Link to="/">我想贊助</Link>
                    <Link to="/">我要提案</Link>
                    <Link to="/">會員中心</Link>
                  </li>
                  <li className="d-flex flex-column gap-3">
                    <Link to="/">線上影院</Link>
                  </li>
                  <li className="d-flex flex-column gap-3">
                    <Link to="/">關於影巢</Link>
                    <Link to="/">常見問題</Link>
                    <Link to="/">服務條款</Link>
                    <Link to="/" className="me-4">
                      隱私權政策
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <p className="text-end mt-10 mt-md-20 mb-0 fs-copyright">Copyright ©2024 by 影巢影視募資平台小組 僅供作品集使用</p>
          </div>
        </footer>
      ) : (
        <footer className="footer-bg py-8">
          <div className="container">
            <p className="text-center fs-copyright">Copyright ©2024 by 影巢影視募資平台小組 僅供作品集使用</p>
          </div>
        </footer>
      )}
    </>
  );
}
