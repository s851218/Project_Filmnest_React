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
  
  // 取得專案資料
  const getData = async(order) => {
    const { projectId , productId } = order
    try {
      const projectRes = await axios.get(`${API_BASE}/projects?projectId=${projectId}`)
      const productRes = await axios.get(`${API_BASE}/products?productId=${productId}`)
      setProjectData(projectRes.data[0])
      setProductData(productRes.data[0])
    } catch (error) {
      console.log("資料取得錯誤",error);
    }
  }

  useEffect(()=>{
    if (Object.keys(orderData).length !== 0) {
      getData(orderData)
    }
  },[orderData])

  const infoFromRef = useRef();
  const paymentFromRef = useRef();

  // 送出表單 => props傳遞給aside footer
  const handleFormsSubmit = async () => {
    await infoFromRef.current.submitForm();
    await paymentFromRef.current.submitForm();
  };
  const userProfile = useSelector((state) => state.user.profile);


  return (
    <>
      {(Object.keys(orderData).length !== 0) && (Object.keys(projectData).length !== 0) && (Object.keys(productData).length !== 0) ? (
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
    
              <PaymentAside
                handleFormsSubmit={handleFormsSubmit}
                orderData={orderData}
                projectData={projectData}
                productData={productData}
              />
            </div>
          </div>
    
          <PaymentMobileFooter handleFormsSubmit={handleFormsSubmit} />
        </>
      ) : (<div className="vh-100"></div>)}
    </>
  );
}
