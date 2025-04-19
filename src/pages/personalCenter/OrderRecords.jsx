import { Helmet } from "react-helmet-async";
import { NavLink, Outlet, ScrollRestoration, useLocation } from "react-router";
import PersonalCenterSidebar from "../../components/PersonalCenterSidebar";

export default function OrderRecords() {
  const location = useLocation();
  const onePageLayout = [
    "orderRecordsAll",
    "orderRecordsSuccess",
    "orderRecordsFailed",
    "orderRecordsUnpaid",
  ];
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  const shouldOnePageLayout = onePageLayout.includes(currentRoute);
  const activeStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "",
    borderRadius: "12px 12px 0 0",
  });

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>訂單紀錄</title>
      </Helmet>
      {shouldOnePageLayout ? (
        <>
          <div className="d-block d-lg-none w-100 mb-5 bg-primary-8">
            <PersonalCenterSidebar />
          </div>
          <div className="container">
            <h1 className="pb-5 border-bottom border-secondary fs-6">
              訂單紀錄
            </h1>
            <div className="border-bottom border-secondary">
              <ul className="list-unstyled row row-cols-4 text-center pt-5 mb-0">
                <li className="col pe-0">
                  <NavLink
                    className="w-100 d-block py-3 fs-md-base fs-sm-sm fs-xs"
                    to="orderRecordsAll"
                    style={activeStyle}
                  >
                    所有訂單紀錄
                  </NavLink>
                </li>
                <li className="col px-0">
                  <NavLink
                    className="w-100 d-block py-3 fs-md-base fs-sm-sm fs-xs"
                    to="orderRecordsSuccess"
                    style={activeStyle}
                  >
                    成功訂單紀錄
                  </NavLink>
                </li>
                <li className="col px-0">
                  <NavLink
                    className="w-100 d-block py-3 fs-md-base fs-sm-sm fs-xs"
                    to="orderRecordsFailed"
                    style={activeStyle}
                  >
                    退款/退貨紀錄
                  </NavLink>
                </li>
                <li className="col ps-0">
                  <NavLink
                    className="w-100 d-block py-3 fs-md-base fs-sm-sm fs-xs"
                    to="orderRecordsUnpaid"
                    style={activeStyle}
                  >
                    未付款紀錄
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
}
