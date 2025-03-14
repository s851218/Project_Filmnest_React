import axios from "axios";
import { useEffect, useState , useRef } from "react";
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux";
import PaymentAside from "../components/PaymentAside";
import PaymentMobileFooter from "../components/PaymentMobileFooter";
import PaymentInfoFrom from "../components/PaymentInfoFrom";
import PaymentCollapseFrom from "../components/PaymentCollapseFrom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function PaymentInfo() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate()
  const { id } = useParams()
  const [ orderData , setOrderData ] = useState({})
  const [ projectData , setProjectData ] = useState({})
  const [ productData , setProductData ] = useState({})
  const [ userData , setUserData ] = useState({})
  const paymentInfoSlice = useSelector((state) => state.paymentInfo)

  // 取得訂單資料
  useEffect(()=>{
    const getOrder = async (id) => {
      try {
        const res = await axios.get(`${API_BASE}/orders?orderId=${id}`)
        setOrderData(res.data[0])
      } catch (error) {
        console.log("訂單資料取得錯誤",error);
      }
    }
    if (id) {
      getOrder(id)
    }
  },[id])
  
  // 取得資料
  const getData = async(order) => {
    const { projectId , productId , userId } = order
    try {
      const projectRes = await axios.get(`${API_BASE}/projects/${projectId}`)
      const productRes = await axios.get(`${API_BASE}/products/${productId}`)
      const userRes = await axios.get(`${API_BASE}/users/${userId}`)
      setProjectData(projectRes.data)
      setProductData(productRes.data)
      setUserData(userRes.data)
    } catch (error) {
      console.log("資料取得錯誤",error);
    }
  }  

  // 判斷訂單是否付款
  useEffect(()=>{
    if (orderData) {
      if (orderData.paymentStatus === "已付款") {
        alert("訂單已付款")
        navigate("/")
      } else {
        getData(orderData)
      }
    } else {
      alert("訂單不存在")
      navigate("/")
    }
  },[orderData])

  // 送出表單 => props傳遞給aside footer
  // 建立ref
  const infoFromRef = useRef();
  const paymentFromRef = useRef();
  // 建立submit function
  const handleFormsSubmit = async () => {
    try {
      await infoFromRef.current.submitForm();
      await paymentFromRef.current.submitForm();
    } catch (error) {
      console.log("驗證失敗",error);
    }
  };

  // 驗證成功後送出付款資料
  useEffect(()=>{
    const {paymentInfo , paymentType} = paymentInfoSlice.requried

    if ((paymentInfo === true) && (paymentType === true)) {
      const { recipientInfo , address } = paymentInfoSlice

      // 重組地址字串
      const newAddress = address.zipcode + address.county +  address.district + address.address

      // 取得付款時間
      const createdPaymentTime = new Date().toString()
      // 重組收件人資料
      const newOrderFile = {
        "Recipient": recipientInfo.recipientName,
        "phone": recipientInfo.recipientPhone,
        "email": recipientInfo.recipientEmail,
        "address": newAddress       // 寫入重組後的地址字串
      }
      console.log(newOrderFile);
      
      const newOrderData = {
        ...orderData,               // 展開原訂單內容
        "orderFile": newOrderFile, // 寫入收件人資料
        "orderStatus": "訂單成立", // 訂單狀態修改為"成立"
        "paymentStatus": "已付款", // 付款狀態修改為"已付款"
        "paymentTime": createdPaymentTime, // 寫入付款時間
      }
      
      const handlePayment = async(id) => {
        console.log("NEW",newOrderData);
        try {
          await axios.put(`${API_BASE}/orders/${id}`, newOrderData)
          alert("付款成功")
          navigate("/") // 重新導向 暫定首頁 => 之後改付款完成頁面
        } catch (error) {
          console.log(error);
        }
      }

      handlePayment(orderData.id)
    }
    
  },[paymentInfoSlice.requried])
  // 送出表單

  return (
    <>
      {(Object.keys(orderData).length !== 0) && (Object.keys(projectData).length !== 0) && (Object.keys(productData).length !== 0) && (Object.keys(userData).length !== 0) ? (
        <>
          <div className="container mb-20" style={{ marginTop: 88 }}>
            <div className="row">
              <main className="col-lg-8">
                {/* 付款資料 V */}
                <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款資料</h2>
                <PaymentInfoFrom
                  reference={infoFromRef}
                  userData={userData}
                />
                {/* 付款方式 V */}
                <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款方式</h2>
                <PaymentCollapseFrom reference={paymentFromRef} />
              </main>

              <PaymentAside
                handleFormsSubmit={handleFormsSubmit}
                orderData={orderData}
                projectData={projectData}
                productData={productData}
              />
            </div>
          </div>

          <PaymentMobileFooter
            handleFormsSubmit={handleFormsSubmit}
            orderData={orderData}
            projectData={projectData}
            productData={productData}
          />
        </>
      ) : (<div className="vh-100"></div>)}
    </>
  );
}