import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CheckModal } from "../assets/js/costomSweetAlert";
import GrayScreenLoading from "../components/GrayScreenLoading";

const apiBase = import.meta.env.VITE_API_BASE;

export default function OrderRecordsSuccess() {
  const [ordersData, setOrdersData] = useState([]);
  const [sortOrderData, setSortOrderData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.profile.userId);

  const getSortTime = (time) => new Date(time).getTime();

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
  // 取得訂單
  const getOrderData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${apiBase}/orders?_expand=project&_expand=product&userId=${userId}`);
      if (sortOrderData) {
        const orderData = response.data.filter((item) => item.paymentStatus === 1 && (item.canReturn || item.canRefund));
        orderData.sort((a, b) => getSortTime(a.createdAt) - getSortTime(b.createdAt));
        setOrdersData(orderData);
      } else {
        const orderData = response.data.filter((item) => item.paymentStatus === 1 && (item.canReturn || item.canRefund));
        orderData.sort((a, b) => getSortTime(b.createdAt) - getSortTime(a.createdAt));
        setOrdersData(orderData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, [sortOrderData]);

  // 取消訂單
  const handleCancelOrder = (order) => {
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
              <div class="row pb-3 mb-3 align-items-center border-bottom">
                <div class="col-7">
                  <img src=${order.project?.projectImage} alt="" />
                </div>
                <div class="col-5">
                  <h2 class="fs-base text-balance">${order.project?.projectTitle}</h2>
                </div>
            </div>
          
            <div class="col-6 mx-auto">
              <div class="mb-6">
                <p class="mb-1">方案 - ${order.product?.title}</p>
                <p>NT$ ${order.product?.price.toLocaleString()}</p>
              </div>
              <div class="mb-6">
                <h3 class="fs-base">本方案包含：</h3>
                <ol>
                ${order.product?.contents?.map((item) => `<li>${item.item}</li>`).join("")}
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
          await axios.patch(`${apiBase}/orders/${order.id}`, { canCancel: false, reason: reason, orderStatus: 2 });
          CheckModal.fire("取消申請成功", "我們將儘快處理您的申請", "success");
          getOrderData();
        } catch (error) {
          console.error(error);
          CheckModal.fire("取消申請失敗", "請稍後再試", "error");
        }
      }
    });
  };

  return (
    <>
      {ordersData.length !== 0 ? (
        <>
          <div className="d-flex justify-content-end mt-5">
            <button className="btn btn-light" onClick={() => setSortOrderData((prev) => !prev)}>
              {sortOrderData ? (
                <>
                  <i className="bi bi-sort-up"></i>
                  <span>由舊到新</span>
                </>
              ) : (
                <>
                  <i className="bi bi-sort-down"></i>由新到舊
                </>
              )}
            </button>
          </div>
          <div className="table-responsive bg-primary-8">
            <table className="table align-middle border border-primary-9 mb-0">
              <thead className="nowrap-table">
                <tr>
                  <th scope="col" className="text-white">
                    訂單項目
                  </th>
                  <th scope="col" className="d-lg-none"></th>
                  <th scope="col" className="text-white"></th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order) => (
                  <tr key={order.id}>
                    <td className="text-white">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <img src={order.project.projectImage} className="rounded-2" alt="專案數量" />
                        </div>
                        <div className="col-8">
                          <span className="badge text-bg-danger mb-1">{order.orderStatus === 2 ? "已取消" : order.paymentStatus === 2 ? "已退款" : order.shippingStatus === 2 ? "已退貨" : ""}</span>
                          <p className="fs-sm fs-lg-base text-secondary">訂單建立時間：{getTime(order.createdAt)}</p>
                          <h3 className="fs-base fs-lg-6 fw-bolder text-truncate" title={order.project.projectTitle}>
                            {order.project.projectTitle}
                          </h3>
                          <p className="fs-sm fs-lg-base">購買回饋方案項目：{order.product.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="nowrap-table text-white">
                      <div className="d-flex flex-column">
                        {order.canCancel && (
                          <button type="button" className="btn btn-danger mb-2" onClick={() => handleCancelOrder(order)}>
                            訂單取消
                          </button>
                        )}
                        <button type="button" className="btn btn-primary" onClick={() => navigate(`/personalCenter/orderRecords/${order.id}`)}>
                          訂單詳細
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="row justify-content-center">
          <div className="col-8 bg-primary-6 rounded-3 mt-15">
            <div className="d-flex justify-content-center py-15">
              <h2 className="fs-base fs-lg-6">尚未有成功付款紀錄</h2>
            </div>
          </div>
        </div>
      )}
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
