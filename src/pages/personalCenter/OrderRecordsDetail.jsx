import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import { Alert, CheckModal } from "../../js/customSweetAlert";
import { ScrollRestoration, useNavigate, useParams } from "react-router";
import getNewTime from "../../helpers/getNewTime";

const apiBase = import.meta.env.VITE_API_BASE;

export default function OrderRecordsDetail() {
  const [orderData, setOrdersData] = useState({ paymentMethod: {} });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getOrderData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiBase}/orders?_expand=project&_expand=product&id=${id}`
      );
      setOrdersData(response.data[0]);
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "取得訂單失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  // 取消訂單
  const handleCancelOrder = (orderData) => {
    CheckModal.fire({
      title: `是否要取消訂單`,
      showCancelButton: true,
      input: "textarea",
      inputLabel: "請輸入取消訂單原因",
      inputPlaceholder: "請描述您的取消訂單原因...",
      inputAttributes: {
        "aria-label": "請輸入取消訂單原因",
      },
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<hr><h1 class="fs-6 text-start">取消項目</h1>
        <div class="border p-3">
          <div class="row flex-column">
            <div class="col">
              <div class="row mb-3 pb-3 align-items-center border-bottom">
                <div class="col-7">
                  <img src=${orderData.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${
                    orderData.project?.projectTitle
                  }</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${orderData.product?.title}</p>
                <p>NT$ ${orderData.product?.price.toLocaleString()}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${orderData.product?.contents
                  ?.map((item) => `<li>${item.item}</li>`)
                  .join("")}
                </ol>
              </div>
            </div>
          </div>
          </div>`,
      preConfirm: (reason) => {
        if (!reason) {
          CheckModal.fire("請輸入取消訂單原因", "", "error");
          return false;
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value;
        try {
          await axios.patch(`${apiBase}/orders/${orderData.id}`, {
            canCancel: false,
            reason: reason,
            orderStatus: 2,
          });
          CheckModal.fire("取消申請成功", "我們將儘快處理您的申請", "success");
          getOrderData();
        } catch (error) {
          if (error) {
            CheckModal.fire("取消申請失敗", "請稍後再試", "error");
          }
        }
      }
    });
  };

  // 退貨modal
  const handleReturn = (orderData) => {
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
              <div class="row mb-3 pb-3 align-items-center border-bottom">
                <div class="col-7">
                  <img src=${orderData.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${
                    orderData.project?.projectTitle
                  }</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${orderData.product?.title}</p>
                <p>NT$ ${orderData.product?.price.toLocaleString()}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${orderData.product?.contents
                  ?.map((item) => `<li>${item.item}</li>`)
                  .join("")}
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
        const reason = result.value;
        try {
          await axios.patch(`${apiBase}/orders/${orderData.id}`, {
            canReturn: false,
            reason: reason,
            shippingStatus: 2,
          });
          CheckModal.fire("退貨申請成功", "我們將儘快處理您的申請", "success");
          getOrderData();
        } catch (error) {
          if (error) {
            CheckModal.fire("退貨申請失敗", "請稍後再試", "error");
          }
        }
      }
    });
  };

  // 退款modal
  const handleRefund = (orderData) => {
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
              <div class="row mb-3 pb-3 align-items-center border-bottom">
                <div class="col-7">
                  <img src=${orderData.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${
                    orderData.project?.projectTitle
                  }</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${orderData.product?.title}</p>
                <p>NT$ ${orderData.product?.price.toLocaleString()}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${orderData.product?.contents
                  ?.map((item) => `<li>${item.item}</li>`)
                  .join("")}
                </ol>
              </div>
            </div>
          </div>
          </div>`,
      preConfirm: (reason) => {
        if (!reason) {
          CheckModal.fire("請輸入退款原因", "", "error");
          return false;
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reason = result.value;
        try {
          await axios.patch(`${apiBase}/orders/${orderData.id}`, {
            canRefund: false,
            reason: reason,
            paymentStatus: 2,
          });
          CheckModal.fire("退款申請成功", "我們將儘快處理您的申請", "success");
          getOrderData();
        } catch (error) {
          if (error) {
            CheckModal.fire("退款申請失敗", "請稍後再試", "error");
          }
        }
      }
    });
  };

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>訂單內容</title>
      </Helmet>
      <div className="container">
        <div className="row flex-column">
          <div className="col-lg-6">
            <h1 className="pb-5 border-bottom border-secondary fs-6">
              訂單內容
              <span className="badge text-bg-danger fs-sm ms-2">
                {orderData.orderStatus === 2
                  ? "已取消"
                  : orderData.paymentStatus === 2
                  ? "已退款"
                  : orderData.shippingStatus === 2
                  ? "已退貨"
                  : ""}
              </span>
            </h1>
            <div className="row mb-3 align-items-center">
              <div className="col-lg-7">
                <img src={orderData.project?.projectImage} alt="" />
              </div>
              <div className="col-lg-5">
                <h2 className="fs-base text-balance">
                  {orderData.project?.projectTitle}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="mb-6">
              <p className="mb-1">方案 - {orderData.product?.title}</p>
              <p>
                NT${" "}
                {orderData.product?.price
                  ? orderData.product.price.toLocaleString()
                  : ""}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="fs-base">本方案包含：</h3>
              <ol>
                {orderData.product?.contents?.map((item, index) => (
                  <li key={index}>{item.item}</li>
                ))}
              </ol>
            </div>
            <p className="mb-3">
              額外加碼：{Number(orderData.bonus).toLocaleString()}
            </p>
            <p className="mb-3">
              訂單總額：{Number(orderData.totalPrice).toLocaleString()}
            </p>
            <p className="mb-3">
              訂單狀態：
              {orderData.orderStatus === 0
                ? "訂單建立"
                : orderData.orderStatus === 2
                ? "訂單取消"
                : "訂單成立"}
            </p>
            <p className="mb-3">
              訂單成立時間：{getNewTime(orderData.createdAt)}
            </p>
            {!orderData.paymentMethod ||
            Object.keys(orderData.paymentMethod).length === 0 ? (
              <p className="mb-3">付款方式：尚未選擇付款方式</p>
            ) : orderData.paymentMethod?.type === 0 ? (
              <p className="mb-3">付款方式：信用卡</p>
            ) : orderData.paymentMethod?.type === 1 ? (
              <>
                <p className="mb-3">付款方式：銀行轉帳</p>
                <p className="mb-3">
                  銀行名稱：{orderData.paymentMethod.bankName}
                </p>
                <p className="mb-3">
                  轉帳代碼：{orderData.paymentMethod.bankCode}
                </p>
                <p className="mb-3">
                  轉帳帳號：{orderData.paymentMethod.accountNumber}
                </p>
              </>
            ) : (
              <>
                <p className="mb-3">付款方式：超商付款</p>
                <p className="mb-3">
                  付款代碼：{orderData.paymentMethod.paymentCode}
                </p>
              </>
            )}
            <p className="mb-3">
              付款狀態：
              {orderData.paymentStatus === 0
                ? "未付款"
                : orderData.paymentStatus === 1
                ? "已付款"
                : "已退款"}
            </p>
            {orderData.paymentStatus === 1 && (
              <p className="mb-3">
                付款時間：{getNewTime(orderData.paymentTime)}
              </p>
            )}
            {orderData.paymentStatus === 1 && (
              <p className="mb-3">
                出貨狀態：
                {orderData.shippingStatus === 0
                  ? "未出貨"
                  : orderData.shippingStatus === 1
                  ? "已出貨"
                  : "已退貨"}
              </p>
            )}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-light btn-base w-100 w-lg-auto mb-2 mb-lg-0"
                onClick={() => navigate(-1)}
              >
                返回
              </button>
              {orderData.canCancel ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-base w-100 w-lg-auto mb-2 mb-lg-0"
                    onClick={() => handleCancelOrder(orderData)}
                  >
                    取消訂單
                  </button>
                  {orderData.orderStatus === 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-light btn-base w-100 w-lg-auto"
                      onClick={() =>
                        navigate(`/paymentInfo/${orderData.orderId}`)
                      }
                    >
                      前往付款
                    </button>
                  )}
                </>
              ) : orderData.canRefund ? (
                <button
                  type="button"
                  className="btn btn-outline-light btn-base w-100 w-lg-auto "
                  onClick={() => handleRefund(orderData)}
                >
                  申請退款
                </button>
              ) : orderData.canReturn ? (
                <button
                  type="button"
                  className="btn btn-outline-light btn-base w-100 w-lg-auto "
                  onClick={() => handleReturn(orderData)}
                >
                  申請退貨
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
