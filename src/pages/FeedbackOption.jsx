import axios from "axios";
import { useEffect , useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router"

const API_BASE = import.meta.env.VITE_API_BASE;

export default function FeedbackOption () {
  const { register , handleSubmit , reset , control , formState:{errors}} = useForm()
  const { id } = useParams()
  const [ params , setParams ] = useState({})
  const [ feedbackData, setFeedbackData ] = useState([]);
  const [ projectData , setProjectData ] = useState([]);
  const [ isName , setIsName ] = useState(false)
  const userInfo = useSelector((state) => state.user.profile)

  //處理params
  useEffect(()=>{
    if (id) {
      const paramsArry = id.split("&")
      let paramsObj = {}
      paramsArry.forEach((param)=>{
        let [ key , value ] = param.split("=")
        paramsObj[key] = Number(value)
      })
      setParams(paramsObj)
    }
  },[id])

  const getFeedbackData = async(params) => {
    const { projectId , productId } = params
    try {
      const res = await axios.get(`${API_BASE}/products?projectId=${projectId}&id=${productId}`)
      setFeedbackData(res.data[0]);
    } catch (error) {
      alert("回饋資料取得失敗：" + error.message);
    }
  }

  const getProjectData = async(params) => {
    const { projectId } = params
    try {
      const res = await axios.get(`${API_BASE}/projects?projectId=${projectId}`)
      setProjectData(res.data[0]);
    } catch (error) {
      alert("回饋資料取得失敗：" + error.message);
    }
  }

  useEffect(()=> {
    if (Object.keys(params).length !== 0) {
      getFeedbackData(params)
      getProjectData(params)
    }
  },[params])

  const onSubmit = async(data) => {
    const { messageToTeam } = data
    console.log("驗證成功",data);
    
    // 建立order

    // 取得建立訂單時間
    const createdAt = new Date().toString()
    // 創建orderId
    const orderId = "WINDS" + new Date().getTime()
    // 組建orderData
    const orderData = {
      "orderFile": {
        "Recipient": "",
        "phone": "",
        "email": "",
        "address": ""
      },
      "orderStatus": "建立訂單",
      "paymentStatus": "未付款",
      "shippingStatus": "未出貨",
      "bonus": "額外加碼",
      "totalPrice": "總價格(包含加碼)",
      "createdAt": createdAt,
      "paymentTime": "",
      "canCancel": false,
      "canRefund": false,
      "canReturn": false,
      "userId": userInfo.userId,
      "projectId": params.projectId,
      "productId": params.productId,
      "orderId": orderId,
      "message": messageToTeam,
    }
    
    console.log(orderData);

    // 發送api
    try {
      const res = await axios.post("")
      console.log(res.data);
    } catch (error) {
      console.log("建立訂單失敗",error);
    }

    if (messageToTeam.length !== 0) {
      console.log("有留言，打留言版api");
    }
  }

  const handleChangeOption = () => {
    console.log("更改方案");
    
  }

  const watch = useWatch({control})
  // 表單監控
  useEffect(()=> {
    console.log(watch);
  },[watch])
  // 錯誤監控
  useEffect(()=>{
    console.log(errors);
  },[errors])

  // 監控是否匿名
  useEffect(()=>{
    if (watch.isAnonymous === "false") {
      setIsName(true)
    } else {
      setIsName(false)
    }
  },[watch.isAnonymous])
  
  return (
    <>
      <header className="mt-20 mb-12">
        <div className="container-md">
          <div className="row align-items-center">
            {/* <!-- 左半部（圖片） --> */}
            <div className="col-lg-8 col-md-7">
              <img className="img-fluid w-100 object-fit-cover rounded-lg-1" src={feedbackData.image} alt={feedbackData.title} />
            </div>
            {/* <!-- 右半部（標題） --> */}
            <div className="col-lg-4 col-md-5 d-flex flex-column justify-content-center align-items-md-start align-items-center p-4">
              <h2 className="fs-lg-6 fs-md-7 fs-sm text-primary-2">{projectData.projectTitle}</h2>
              <h1 className="fs-lg-4 fs-md-3 fs-2 mb-lg-3 mb-1">{`【 ${feedbackData.title}】`}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row justify-content-between mb-8">
          <main className="col-lg-8">
            {/* 方案資訊 */}
            <section className="d-flex flex-column mb-8">
              <h3 className="fs-lg-3 fw-bolder">方案資訊</h3>
              <table className="table table-dark table-hover text-center my-6">
                <thead>
                  <tr className="fs-7 fw-bolder">
                    <th scope="col" style={{width: "30%"}}></th>
                    <th scope="col" className="text-start text-nowrap w-auto">回饋項目</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {feedbackData?.contents?.map(({item},index) => (
                    <tr key={item}>
                      <th scope="row">{index+1}</th>
                      <td className="text-start">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-secondary align-self-end"
                onClick={() => handleChangeOption()}>
                更改方案
                <span className="material-symbols-outlined ms-1 align-bottom">undo</span>
              </button>
            </section>
            {/* 感謝名稱 */}
            <section>
              <button type="button" onClick={handleSubmit(onSubmit)}>測試</button>
              <h3 className="fs-lg-3 fw-bolder mb-3 required">感謝名稱</h3>
              <p>請留下您的大名或暱稱，我們會將您的名字置入電影片尾感謝名單。</p>
              <p>※如不願露出，選擇匿名即可</p>
              <form action="">
                <div className={`${errors?.isAnonymous ? "row fit-content py-3 border border-danger rounded-2" : ""}`}>
                  <div className="d-flex align-items-center mb-3">
                    <input
                      type="radio" id="chooseInputName" name="nameOption" className="me-2"
                      value={false}
                      {...register("isAnonymous",{
                        required: {
                          value: true,
                          message: "請選擇感謝名稱類型"
                        }
                      })}
                    />
                    <input type="text" id="supporterNameInput" className={`supporter-name-input rounded-1 p-2 ${errors.supporterName && "is-invalid"}`} placeholder="填入您希望的稱呼"
                      disabled={ (isName) ? false : true }
                      {...register("supporterName",{
                        required: {
                          value: isName ? true : false ,
                          message: isName && "*請填寫您希望的稱呼"
                        }
                      })}
                    />
                  </div>
                    { isName && errors?.supporterName && <div className="invalid-feedback d-block">{errors?.supporterName?.message}</div>}
                  <div>
                    <input type="radio" id="chooseHideName" name="nameOption" className="me-2"
                      value={true}
                      {...register("isAnonymous",{
                        required: {
                          value: true,
                          message: "*請選擇感謝名稱類型"
                        }
                      })}
                    />
                    <label htmlFor="chooseHideName">我想匿名</label>
                  </div>
                </div>
                { errors?.isAnonymous && <div className="invalid-feedback d-block">{errors?.isAnonymous?.message}</div>}

                <hr />
                <div className="d-flex flex-column">
                  <label htmlFor="messageToTeam" className="mb-3 fs-lg-6">想跟團隊說的話</label>
                  <textarea name="messageToTeam" id="messageToTeam" rows="6" cols="33" placeholder="您的留言會出現在留言板（選填）" className="rounded-1 p-2" style={{resize: "none"}}
                    {...register("messageToTeam")}
                  ></textarea>
                </div>
              </form>
            </section>
          </main>
          <aside className="col-4 feedback-confirmation-sidebar d-lg-block d-none" >
            {/* <%- include('./layout/extra-amount-calculator'); -%> */}
            {/* <div className="card bg-primary-9 p-3  border rounded-1 h-auto" style="border: 1px sold #606060;">
              <div className="card-body">
                <h3 className="card-title fs-5 fw-bolder mb-6">隨喜加碼</h3>
                <div className="btn-group w-100 mb-4">
                  <button className="btn btn-secondary w-100 add-amount rounded-start-1" data-amount="100">+100</button>
                  <button className="btn btn-secondary w-100 add-amount" data-amount="500">+500</button>
                  <button className="btn btn-secondary w-100 add-amount rounded-end-1" data-amount="1000">+1,000</button>
                </div>
                <div className="input-group mb-4">
                  <input type="number" name="" id="customAmount" placeholder="自訂金額" min="0" className="form-control rounded-start-1">
                  <button type="button" className="btn btn-primary" id="addCustomAmount">加碼</button>
                  <button type="button" className="btn btn-secondary rounded-end-1" id="resetCustomAmount">重設</button>
                </div>
                <div className="bg-primary-8 p-3 rounded-1 mb-4">
                  <p className="mb-1">總計金額</p>
                  <h4 className="fs-6 fw-bolder mb-1">NT$ 2,000</h4>
                </div>
                <a href="checkout-info.html">
                  <button type="submit" className="btn btn-primary w-100 rounded-1" id="nextStep">下一步</button>
                </a>
              </div>
            </div> */}
          </aside>
        </div>
      </div>

      {/* <!-- #feedbackModal 內容 --> */}
      <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down ">
          <div className="modal-content border rounded-1" style={{borderColor: "#606060"}}>
            <div className="modal-header">
              <button type="button" className="material-symbols-outlined border-0 ms-auto opacity-0" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: "transparent"}} disabled>close</button>
              <h1 className="modal-title fs-5" id="feedbackModalLabel">方案選擇</h1>
              <button type="button" className="material-symbols-outlined text-white border-0 ms-auto" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: "transparent"}}>close</button>
            </div>
            <div className="modal-body">
              {/* <%- include('./layout/feedback-swiper'); -%> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}