import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import PaymentAside from "../components/PaymentAside";
import PaymentMobileFooter from "../components/PaymentMobileFooter";
import PaymentInfoFrom from "../components/PaymentInfoFrom";
import PaymentCollapseFrom from "../components/PaymentCollapseFrom";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { CheckModal , Alert } from "../assets/js/costomSweetAlert";

const API_BASE = import.meta.env.VITE_API_BASE;

const banksData = [
  {
    bankCode: "700",
    bankName: "中華郵政",
    accountNumber: "7003956781285716",
  },
  {
    bankCode: "004",
    bankName: "台灣銀行",
    accountNumber: "329817460195",
  },
  {
    bankCode: "812",
    bankName: "台新銀行",
    accountNumber: "18452693071834",
  },
  {
    bankCode: "013",
    bankName: "國泰世華銀行",
    accountNumber: "581023764895",
  }
]

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
  const [showError , setShowError] = useState(false)
  const accordionIndex = useSelector((state)=>state.paymentInfo.accordion.index)

  // 初始化
  const init = () => {
    setOrderData({})
    setProjectData({})
    setProductData({})
  }
  // 取得訂單資料
  useEffect(() => {
    init()
    const getOrder = async (id) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/orders?orderId=${id}`);
        if (res.data.length !== 0) {
          setOrderData(res.data[0]);
        } else {
          Alert.fire({
            icon: "error",
            title: "訂單不存在",
          },setTimeout(() => {
            navigate("/");
          }, 1500))
        }
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
    if (Object.keys(orderData).length !== 0) {
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
        setShowError(false)
        handlePayment(orderData.id);
      } else {
        setShowError(true)
      }
    } catch (error) {
      console.log("驗證失敗", error);
    }
  };

  // 驗證成功後送出付款資料
  const handlePayment = async (id) => {
    const { recipientInfo, address , paymentOption } = paymentInfoSlice;

    // 重組地址字串
    const newAddress =
      address.zipcode + address.county + address.district + address.address;
    
    // 重組收件人資料
    const newOrderFile = {
      Recipient: recipientInfo.recipientName,
      phone: recipientInfo.recipientPhone,
      email: recipientInfo.recipientEmail,
      address: newAddress, // 寫入重組後的地址字串
    };
    
    let paymentStatu // 付款狀態
    let paymentMethod // 付款別
    let createdPaymentTime // 取得付款時間
    
    switch (accordionIndex) {
      case 0: // 信用卡付款
        paymentStatu = 1 // 已付款
        paymentMethod = {
          type: accordionIndex,
          cardType: paymentOption.cardType,
          method: paymentOption.payMethod,
        }
        createdPaymentTime = new Date().toString(); // 取得付款時間
        break;

      case 1: // ATM轉帳
        const bankSelect = banksData.filter((bank)=> (bank.bankCode === paymentOption.bankSelect))
        paymentStatu = 0 // 未付款
        paymentMethod = {
          type: accordionIndex,
          ...bankSelect[0]
        }
        break;

      case 2: // 信用卡付款
        paymentStatu = 0 // 未付款
        paymentMethod = {
          type: accordionIndex,
          paymentCode: "FNEC942335764",
        }
        break;
    
      default:
        break;
    }

    const newOrderData = {
      ...orderData, // 展開原訂單內容
      orderFile: newOrderFile, // 寫入收件人資料
      orderStatus: 1, // 訂單狀態修改為"成立"
      paymentStatus: paymentStatu, // 付款狀態修改
      paymentMethod, // 付款別
      paymentTime: accordionIndex === 0 ? createdPaymentTime : "付款時間", // 寫入付款時間
      canCancel: accordionIndex === 0 ? false : true
    };

    console.log("NEW", newOrderData);
    try {
      await axios.put(`${API_BASE}/orders/${id}`, newOrderData);
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
                <PaymentInfoFrom reference={infoFromRef} userData={userData} showError={showError} />
                {/* 付款方式 V */}
                <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款方式</h2>
                <PaymentCollapseFrom reference={paymentFromRef} showError={showError} banksData={banksData} />
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
