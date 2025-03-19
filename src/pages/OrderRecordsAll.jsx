import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CheckModal } from "../assets/js/costomSweetAlert";
import GrayScreenLoading from "../components/GrayScreenLoading";

const apiBase = import.meta.env.VITE_API_BASE;

export default function OrderRecordsAll() {
  const [ordersData, setOrdersData] = useState([]);
  const [ sortOrderData, setSortOrderData ] = useState(false)
  const [ isLoading ,setIsLoading] = useState(false);
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
      .replace(/\//g, "-")
      .slice("0", "10");
    return newTime;
  };
  // 取得訂單
  const getOrderData = async () => {
    setIsLoading(true)
    console.log(sortOrderData);
    
    try {
      const response = await axios.get(`${apiBase}/orders?_expand=project&userId=${userId}`);
      if(sortOrderData){
        const OrderData = response.data.sort((a,b)=> getSortTime(a.createdAt) - getSortTime(b.createdAt))
        setOrdersData(OrderData);
        
      }else{
        const OrderData = response.data.sort((a,b)=> getSortTime(b.createdAt) - getSortTime(a.createdAt))
        setOrdersData(OrderData);
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getOrderData();
  }, [sortOrderData]);


  // 刪除訂單
  const handleDeleteOrder = (id,title)=>{
    CheckModal.fire({
      title:`是否要刪除訂單`,
      showCancelButton:true,
      confirmButtonText:"確認",
      cancelButtonText:"取消",
      html:`<hr><p class="text-danger">${title}</p>`
    }).then(async(result)=>{
      if(result.value){ 
        await axios.delete(`${apiBase}/orders/${id}`)
        getOrderData();
      }
      if (result.isConfirmed) {
        CheckModal.fire("刪除訂單成功", "", "success");
      } 
    })
  }


  return (
    <>
    <div className="d-flex justify-content-end mt-5"><button className="btn btn-light" onClick={()=> setSortOrderData((prev)=> !prev)}>{sortOrderData ? 
    (<><i className="bi bi-sort-up"></i><span>由舊到新</span></>): <><i className="bi bi-sort-down"></i>由新到舊</>}</button></div>
      <div className="table-responsive bg-primary-8">
        <table className="table align-middle border border-primary-9 mb-0">
          <thead className="nowrap-table">
            <tr>
              <th scope="col" className="text-white">
                訂單項目
              </th>
              <th scope="col" className="d-lg-none"></th>
              <th scope="col" className="text-white">
                訂單成立時間
              </th>
              <th scope="col" className="text-white">
                付款時間
              </th>
              <th scope="col" className="text-white">
                付款方式
              </th>
              <th scope="col" className="text-white">
                實付金額
              </th>
              <th scope="col" className="text-white"></th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td className="d-none d-lg-table-cell text-white">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <img src={order.project.projectImage} className="rounded-2" alt="專案數量" />
                    </div>
                    <div className="col-8">
                      <h3 className="fs-6 fw-bolder text-truncate" title={order.project.projectTitle}>{order.project.projectTitle}</h3>
                      <p className="fs-base">{order.project.summary}</p>
                    </div>
                  </div>
                </td>
                <td className="nowrap-table d-lg-none p-1 text-white">
                  <img src={order.project.projectImage} className="rounded-2" alt="專案數量" />
                </td>
                <td className="nowrap-table d-lg-none text-white">
                  <h3 className="fs-7 fw-bolder text-truncate" title={order.project.projectTitle}>{order.project.projectTitle}</h3>
                  <p className="fs-sm">{order.project.summary}</p>
                </td>
                <td className="nowrap-table text-white">{getTime(order.createdAt)}</td>
                <td className="nowrap-table text-white">{order.paymentStatus === "未付款" ? "未付款" : getTime(order.paymentTime)}</td>
                <td className="nowrap-table text-white">{order.paymentStatus === "未付款" ? "未付款" : "信用卡"}</td>
                <td className="nowrap-table text-white">{order.totalPrice}</td>
                <td className="nowrap-table text-white">
                  <div className="d-flex flex-column">
                    {order.canCancel && <button type="button" className="btn btn-danger mb-2"  onClick={()=>handleDeleteOrder(order.id,order.project.projectTitle)}>
                      刪除訂單
                    </button>}
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
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
