import axios from "axios";
import { useEffect, useState , useRef } from "react";
import { useParams } from "react-router"
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

  const { id } = useParams()
  const [ orderData , setOrderData ] = useState({})
  const [ projectData , setProjectData ] = useState({})
  const [ productData , setProductData ] = useState({})
  const [ userData , setUserData ] = useState({})

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
  useEffect(()=>{
    const getData = async(order) => {
      const { projectId , productId , userId } = order
      try {
        const projectRes = await axios.get(`${API_BASE}/projects?projectId=${projectId}`)
        const productRes = await axios.get(`${API_BASE}/products?productId=${productId}`)
        const userRes = await axios.get(`${API_BASE}/users?userId=${userId}`)
        setProjectData(projectRes.data[0])
        setProductData(productRes.data[0])
        setUserData(userRes.data[0])
      } catch (error) {
        console.log("資料取得錯誤",error);
      }
    }
    if (Object.keys(orderData).length !== 0) {
      getData(orderData)
    }
  },[orderData])

  const paymentInfoSlice = useSelector((state) => state.paymentInfo)


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

  useEffect(()=>{
    const {paymentInfo , paymentType} = paymentInfoSlice.requried

    console.log(paymentInfoSlice.address);
    
    if ((paymentInfo === true) && (paymentType === true)) {
      console.log("驗證成功");
      console.log(orderData);
      const { recipientInfo , address } = paymentInfoSlice

      const newAddress = address.zipcode + address.county +  address.district + address.address

      // 取得建立訂單時間
    const createdPaymentTime = new Date().toString()
      
      const newOrderFile = {
        "Recipient": recipientInfo.recipientName,
        "phone": recipientInfo.recipientPhone,
        "email": recipientInfo.recipientEmail,
        "address": newAddress
      }
      console.log(newOrderFile);
      
      const newOrderData = {
        ...orderData,
        "orderFile": newOrderFile,
        "orderStatus": "訂單成立",
        "paymentStatus": "已付款",
        "paymentTime": createdPaymentTime,
      }
      
      const handlePayment = async() => {
        console.log("NEW",newOrderData);
        try {
          const res = await axios.put(`${API_BASE}/orders?orderId=${id}`, newOrderData) // 更新功能有問題
          console.log(res.data);
          
        } catch (error) {
          console.log(error);
        }
      }

      handlePayment()
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
