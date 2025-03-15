import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PaymentAside from "../components/PaymentAside";
import PaymentMobileFooter from "../components/PaymentMobileFooter";
import PaymentInfoFrom from "../components/PaymentInfoFrom";
import PaymentCollapseFrom from "../components/PaymentCollapseFrom";
import { setRequried } from "../slice/paymentInfoSlice";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { CheckModal , Alert } from "../assets/js/costomSweetAlert";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function PaymentInfo() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [productData, setProductData] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const paymentInfoSlice = useSelector((state) => state.paymentInfo);
  const dispatch = useDispatch();

  // 取得訂單資料
  useEffect(() => {
    const getOrder = async (id) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/orders?orderId=${id}`);
        setOrderData(res.data[0]);
      } catch (error) {
        console.log("訂單資料取得錯誤", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      getOrder(id);
    }
  }, [id]);

  // 取得資料
  const getData = async (order) => {
    const { projectId, productId, userId } = order;
    try {
      const projectRes = await axios.get(`${API_BASE}/projects/${projectId}`);
      const productRes = await axios.get(`${API_BASE}/products/${productId}`);
      const userRes = await axios.get(`${API_BASE}/users/${userId}`);
      setProjectData(projectRes.data);
      setProductData(productRes.data);
      setUserData(userRes.data);
    } catch (error) {
      console.log("資料取得錯誤", error);
    }
  };

  // 判斷訂單是否付款
  useEffect(() => {
    if (orderData) {
      if (orderData.paymentStatus === "已付款") {
        Alert.fire({
          icon: "error",
          title: "訂單已付款",
        },setTimeout(() => {
          navigate("/");
        }, 1500))
      } else {
        getData(orderData);
      }
    } else {
      Alert.fire({
        icon: "error",
        title: "訂單不存在",
      },setTimeout(() => {
        navigate("/");
      }, 1500))
    }
  }, [orderData]);

  // 送出表單 => props傳遞給aside footer
  // 建立ref
  const infoFromRef = useRef();
  const paymentFromRef = useRef();
  // 建立submit function
  const handleFormsSubmit = async () => {
    try {
      await infoFromRef.current.submitForm();
      await paymentFromRef.current.submitForm();
      if (paymentFromRef.current.isValid && infoFromRef.current.isValid) {
        console.log("驗證成功打API");
        handlePayment(orderData.id);
      }
    } catch (error) {
      console.log("驗證失敗", error);
    }
  };

  // 驗證成功後送出付款資料
  const handlePayment = async (id) => {
    console.log("執行api");

    const { recipientInfo, address } = paymentInfoSlice;

    // 重組地址字串
    const newAddress =
      address.zipcode + address.county + address.district + address.address;

    // 取得付款時間
    const createdPaymentTime = new Date().toString();
    // 重組收件人資料
    const newOrderFile = {
      Recipient: recipientInfo.recipientName,
      phone: recipientInfo.recipientPhone,
      email: recipientInfo.recipientEmail,
      address: newAddress, // 寫入重組後的地址字串
    };
    console.log(newOrderFile);

    const newOrderData = {
      ...orderData, // 展開原訂單內容
      orderFile: newOrderFile, // 寫入收件人資料
      orderStatus: "訂單成立", // 訂單狀態修改為"成立"
      paymentStatus: "已付款", // 付款狀態修改為"已付款"
      paymentTime: createdPaymentTime, // 寫入付款時間
    };

    console.log("NEW", newOrderData);
    try {
      await axios.put(`${API_BASE}/orders/${id}`, newOrderData);
      dispatch(setRequried({ name: "paymentInfo", value: false }));
      dispatch(setRequried({ name: "paymentType", value: false }));
      Alert.fire({
        icon: "success",
        title: "付款成功",
      },
      setTimeout(() => {
        navigate("/") // 重新導向 暫定首頁 => 之後改付款完成頁面
      }, 1500));
    } catch (error) {
      console.log(error);
      Alert.fire({
        icon: "error",
        title: "付款失敗",
      })
    }
  };

  // 點擊確認付款
  const handleConfirmPayment = () => {
    CheckModal.fire({
      title: "確認付款",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<hr><p class="fs-7">${projectData.projectTitle}</p><p class="fs-4">【 ${productData.title}】</p><p class="fs-7">總金額：$${orderData.totalPrice}</p>`,
    }).then((result)=>{
      console.log(result)
      if (result.value) {
        handleFormsSubmit()
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>付款資料</title>
      </Helmet>
      {Object.keys(orderData).length !== 0 &&
      Object.keys(projectData).length !== 0 &&
      Object.keys(productData).length !== 0 &&
      Object.keys(userData).length !== 0 ? (
        <>
          <div className="container mb-20" style={{ marginTop: 88 }}>
            <div className="row">
              <main className="col-lg-8">
                {/* 付款資料 V */}
                <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款資料</h2>
                <PaymentInfoFrom reference={infoFromRef} userData={userData} />
                {/* 付款方式 V */}
                <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款方式</h2>
                <PaymentCollapseFrom reference={paymentFromRef} />
              </main>

              <PaymentAside
                handleFormsSubmit={handleConfirmPayment}
                orderData={orderData}
                projectData={projectData}
                productData={productData}
              />
            </div>
          </div>

          <PaymentMobileFooter
            handleFormsSubmit={handleConfirmPayment}
            orderData={orderData}
            projectData={projectData}
            productData={productData}
          />
        </>
      ) : (
        <div className="vh-100"></div>
      )}
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
