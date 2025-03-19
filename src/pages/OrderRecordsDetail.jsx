import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { CheckModal } from "../assets/js/costomSweetAlert";
import { useNavigate, useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;

export default function OrderRecordsDetail() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const [orderData, setOrdersData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getTime = (time) => {
    const newTime = new Date(time)
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-");
    return newTime;
  };

  const getOrderData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBase}/orders?_expand=project&_expand=product&id=${id}`);
      setOrdersData(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);

  const handleToPayment = () => {};

  // 退貨modal
  const handleRefund = (orderData) => {
    CheckModal.fire({
      title: `申請退貨`,
      input: "textarea",
      inputLabel: "請輸入退貨原因",
      inputPlaceholder: "請描述您的退貨原因...",
      inputAttributes: {
        "aria-label": "請輸入退貨原因",
      },
      showCancelButton: true,
      confirmButtonText: "確認申請",
      cancelButtonText: "取消",
      html: `<hr><h1 class="fs-6 text-start">退貨項目</h1>
        <div class="border p-3">
          <div class="row flex-column">
            <div class="col">
              <div class="row mb-5 align-items-center">
                <div class="col-7">
                  <img src=${orderData.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${orderData.project?.projectTitle}</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${orderData.product?.title}</p>
                <p>NT$ ${String(orderData.product?.price)}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${orderData.product?.contents?.map((item) => `<li>${item.item}</li>`).join("")}
                </ol>
              </div>
            </div>
          </div>
          </div>`,
      preConfirm: (reason) => {
        if (!reason) {
          CheckModal.fire("請輸入退貨原因", "", "error");
          return false;
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value
        try {

          console.log(reason);
          
          CheckModal.fire("退貨申請成功", "我們將儘快處理您的申請", "success");
        } catch (error) {
          console.error(error);
          CheckModal.fire("退貨申請失敗", "請稍後再試", "error");
        }
        // await axios.delete(`${apiBase}/orders/${id}`)
        // getOrderData();
      }
    });
  };


  // 退款modal
  const handleReturn = (orderData) => {
    CheckModal.fire({
      title: `申請退款`,
      input: "textarea",
      inputLabel: "請輸入退款原因",
      inputPlaceholder: "請描述您的退款原因...",
      inputAttributes: {
        "aria-label": "請輸入退款原因",
      },
      showCancelButton: true,
      confirmButtonText: "確認申請",
      cancelButtonText: "取消",
      html: `<hr><h1 class="fs-6 text-start">退款項目</h1>
        <div class="border p-3">
          <div class="row flex-column">
            <div class="col">
              <div class="row mb-5 align-items-center">
                <div class="col-7">
                  <img src=${orderData.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${orderData.project?.projectTitle}</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${orderData.product?.title}</p>
                <p>NT$ ${String(orderData.product?.price)}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${orderData.product?.contents?.map((item) => `<li>${item.item}</li>`).join("")}
                </ol>
              </div>
            </div>
          </div>
          </div>`,
      preConfirm: (reason) => {
        if (!reason) {
          CheckModal.fire("請輸入退貨原因", "", "error");
          return false;
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value
        try {

          console.log(reason);
          CheckModal.fire("退款申請成功", "我們將儘快處理您的申請", "success");
        } catch (error) {
          console.error(error);
          CheckModal.fire("退款申請失敗", "請稍後再試", "error");
        }
        // await axios.delete(`${apiBase}/orders/${id}`)
        // getOrderData();
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>訂單內容</title>
      </Helmet>
      <div className="container">
        <div className="row flex-column">
          <div className="col-lg-6">
            <h1 className="pb-5 border-bottom border-secondary fs-6">訂單內容</h1>
            <div className="row mb-3 align-items-center">
              <div className="col-lg-7">
                <img src={orderData.project?.projectImage} alt="" />
              </div>
              <div className="col-lg-5">
                <h2 className="fs-base text-balance">{orderData.project?.projectTitle}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-6">
              <p className="mb-1">方案 - {orderData.product?.title}</p>
              <p>NT$ {String(orderData.product?.price)}</p>
            </div>
            <div className="mb-6">
              <h3 className="fs-base">本方案包含：</h3>
              <ol>
                {orderData.product?.contents?.map((item, index) => (
                  <>
                    <li key={index}>{item.item}</li>
                  </>
                ))}
              </ol>
            </div>
            <p className="mb-3">額外加碼：{String(orderData.bonus)}</p>
            <p className="mb-3">付款方式：{orderData.paymentStatus === "未付款" ? "未付款" : "信用卡"}</p>
            <p className="mb-3">訂單成立時間：{getTime(orderData.createdAt)}</p>
            <p className="mb-3">付款時間：{orderData.paymentStatus === "未付款" ? "未付款" : getTime(orderData.paymentTime)}</p>
            <p className="mb-3">訂單狀態：{orderData.paymentStatus}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button type="button" className="btn btn-outline-light w-50 me-2" onClick={() => navigate(-1)}>
                返回
              </button>
              {orderData.canCancel ? (
                <button type="button" className="btn btn-outline-light w-50" onClick={handleToPayment}>
                  前往付款
                </button>
              ) : orderData.canRefund ? (
                <button type="button" className="btn btn-outline-light w-50" onClick={() => handleRefund(orderData)}>
                  申請退款
                </button>
              ) : (
                <button type="button" className="btn btn-outline-light w-50" onClick={() => handleReturn(orderData)}>
                  申請退貨
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
