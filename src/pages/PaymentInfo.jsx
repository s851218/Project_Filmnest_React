import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PaymentAside from "../components/PaymentAside";
import PaymentMobileFooter from "../components/PaymentMobileFooter";
import PaymentInfoFrom from "../components/PaymentInfoFrom";
import PaymentCollapseFrom from "../components/PaymentCollapseFrom";

export default function PaymentInfo() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const infoFromRef = useRef();
  const paymentFromRef = useRef();

  // 送出表單 => props傳遞給aside footer
  const handleFormsSubmit = async () => {
    await infoFromRef.current.submitForm();
    await paymentFromRef.current.submitForm();
  };
  const userProfile = useSelector((state) => state.user.profile);
  const selected = useSelector((state) => state.paymentInfo.selected);
  console.log("userId", userProfile, "selected", selected);
  return (
    <>
      <div className="container mb-20" style={{ marginTop: 88 }}>
        <div className="row">
          <main className="col-lg-8">
            {/* 付款資料 V */}
            <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款資料</h2>
            <PaymentInfoFrom reference={infoFromRef} />
            {/* 付款方式 V */}
            <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款方式</h2>
            <PaymentCollapseFrom reference={paymentFromRef} />
          </main>

          <PaymentAside handleFormsSubmit={handleFormsSubmit} />
        </div>
      </div>

      <PaymentMobileFooter handleFormsSubmit={handleFormsSubmit} />
    </>
  );
}
