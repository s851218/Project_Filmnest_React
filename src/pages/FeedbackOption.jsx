import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { ScrollRestoration, useNavigate, useParams } from "react-router";
import BonusCalculator from "../components/BonusCalculator";
import ModalComponent from "../components/ModalComponent";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { CheckModal, Alert, Toast } from "../assets/js/costomSweetAlert";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function FeedbackOption() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({});
  const [feedbackData, setFeedbackData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [isName, setIsName] = useState(false);
  const [originPrice, setOriginPrice] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalType, setModalType] = useState(null);
  const userInfo = useSelector((state) => state.user.profile);
  const bonusCalculatorRef = useRef();

  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 處理modal開關
  useEffect(() => {
    setIsModalOpen(false);
  }, [id]);

  //處理params
  useLayoutEffect(() => {
    if (id) {
      const paramsArry = id.split("&");
      let paramsObj = {};
      paramsArry.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      setParams(paramsObj);
    }
  }, [id]);

  const getFeedbackData = async (params) => {
    setIsLoading(true);
    const { projectId, productId } = params;
    try {
      const res = await axios.get(`${API_BASE}/products?projectId=${projectId}&id=${productId}`);
      setFeedbackData(res.data[0]);
      setOriginPrice(res.data[0].price);
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "回饋資料取得失敗：",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectData = async (params) => {
    const { projectId } = params;
    try {
      const res = await axios.get(`${API_BASE}/projects?projectId=${projectId}`);
      setProjectData(res.data[0]);
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "專案資料取得失敗：",
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (Object.keys(params).length !== 0) {
      getFeedbackData(params);
      getProjectData(params);
    }
  }, [params]);
  //處理params

  // 處理總金額totalPrice
  useEffect(() => {
    setTotalPrice(originPrice + bonus);
  }, [originPrice, bonus]);

  // 處理訂單送出
  const onSubmit = async (data) => {
    const { messageToTeam } = data;

    // 建立order

    // 取得建立訂單時間
    const createdAt = new Date().toString();
    // 創建orderId
    const orderId = "WINDS" + new Date().getTime();

    // 組建orderData
    const orderData = {
      orderFile: {
        Recipient: "",
        phone: "",
        email: "",
        address: "",
      },
      orderStatus: 0,
      paymentStatus: 0,
      shippingStatus: 0,
      bonus: bonus,
      totalPrice: totalPrice,
      createdAt: createdAt,
      paymentTime: "付款時間",
      canCancel: true, // 可否取消訂單，已付款後false
      canRefund: false, // 已付款後啟用，可否取消付款
      canReturn: false, // 已出貨後啟用，可否退貨
      userId: userInfo.userId,
      projectId: params.projectId,
      productId: params.productId,
      orderId: orderId,
      message: messageToTeam,
      isIncognito: Boolean(watch.isAnonymous),
    };

    const createOrder = async () => {
      try {
        await axios.post(`${API_BASE}/orders`, orderData);
        navigate(`/paymentInfo/${orderId}`);
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "建立訂單失敗",
          });
        }
      }
    };

    // 發送api
    CheckModal.fire({
      title: "確認選擇",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<hr><p class="fs-7">${projectData.projectTitle}</p><p class="fs-4">【 ${feedbackData.title}】</p><p class="fs-7">總金額：$${totalPrice}</p>`,
    }).then((result) => {
      if (result.value) {
        createOrder();
      }
    });

    // if (messageToTeam.length !== 0) {
    //   console.log("有留言，打留言版api");
    // }
  };

  // 處理訂單送出

  // 處理開啟Modal
  const handleOpenModal = (type) => {
    setModalType(type);
    // 開啟modal
    setIsModalOpen(true);
  };

  // 監控是否匿名
  const watch = useWatch({ control });
  useEffect(() => {
    if (watch.isAnonymous === "false") {
      setIsName(true);
    } else {
      setIsName(false);
    }
  }, [watch.isAnonymous]);

  useEffect(() => {
    if (!isModalOpen) {
      setModalType(null);
    }
  }, [isModalOpen]);

  const handleBonusCheck = async () => {
    await bonusCalculatorRef.current.submit();
    setIsModalOpen(false);
  };

  const handleBonusReset = async () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ScrollRestoration />
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
                    <th scope="col" style={{ width: "30%" }}></th>
                    <th scope="col" className="text-start text-nowrap w-auto">
                      回饋項目
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {feedbackData?.contents?.map(({ item }, index) => (
                    <tr key={item}>
                      <th scope="row">{index + 1}</th>
                      <td className="text-start">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="btn btn-secondary btn-base align-self-end" onClick={() => handleOpenModal("change")}>
                更改方案
                <span className="material-symbols-outlined ms-1 align-bottom">undo</span>
              </button>
            </section>
            {/* 感謝名稱 */}
            <section>
              <h3 className="fs-lg-3 fw-bolder mb-3 required">感謝名稱</h3>
              <p>請留下您的大名或暱稱，我們會將您的名字置入電影片尾感謝名單。</p>
              <p>※如不願露出，選擇匿名即可</p>
              <form action="">
                <div className={`${errors?.isAnonymous ? "row fit-content py-3 border border-danger rounded-2" : ""}`}>
                  <div className="d-flex align-items-center mb-3">
                    <input
                      type="radio"
                      id="chooseInputName"
                      name="nameOption"
                      className="me-2"
                      value={false}
                      {...register("isAnonymous", {
                        required: {
                          value: true,
                          message: "請選擇感謝名稱類型",
                        },
                      })}
                    />
                    <input
                      type="text"
                      id="supporterNameInput"
                      className={`supporter-name-input w-sm-50 w-100 rounded-1 p-2 ${errors.supporterName && "is-invalid"}`}
                      placeholder="填入您希望的稱呼"
                      disabled={isName ? false : true}
                      {...register("supporterName", {
                        required: {
                          value: isName ? true : false,
                          message: isName && "*請填寫您希望的稱呼",
                        },
                      })}
                    />
                  </div>
                  {isName && errors?.supporterName && <div className="invalid-feedback d-block">{errors?.supporterName?.message}</div>}
                  <div>
                    <input
                      type="radio"
                      id="chooseHideName"
                      name="nameOption"
                      className="me-2"
                      value={true}
                      {...register("isAnonymous", {
                        required: {
                          value: true,
                          message: "*請選擇感謝名稱類型",
                        },
                      })}
                    />
                    <label htmlFor="chooseHideName">我想匿名</label>
                  </div>
                </div>
                {errors?.isAnonymous && <div className="invalid-feedback d-block">{errors?.isAnonymous?.message}</div>}

                <hr />
                <div className="d-flex flex-column">
                  <label htmlFor="messageToTeam" className="mb-3 fs-lg-6">
                    想跟團隊說的話
                  </label>
                  <textarea name="messageToTeam" id="messageToTeam" rows="6" cols="33" placeholder="您的留言會出現在留言板（選填）" className="rounded-1 p-2" style={{ resize: "none" }} {...register("messageToTeam")}></textarea>
                </div>
              </form>
            </section>
          </main>

          {/* 加碼功能 */}
          <aside className="col-4 feedback-confirmation-sidebar d-lg-block d-none">
            <div className="card bg-primary-9 p-3 border rounded-1 h-auto" style={{ border: "1px sold #606060" }}>
              <div className="card-body">
                <h3 className="card-title fs-5 fw-bolder mb-6">隨喜加碼</h3>
                <BonusCalculator bonus={bonus} setBonus={setBonus} type={"layout"} />
                <div className="bg-primary-8 p-3 rounded-1 mb-4">
                  <p className="mb-1">總計金額</p>
                  <h4 className="fs-6 fw-bolder mb-1">NT$ {totalPrice.toLocaleString()}</h4>
                </div>
                <button type="button" className="btn btn-primary btn-main ms-auto w-100 rounded-1 fw-bolder" onClick={handleSubmit(onSubmit)}>
                  下一步
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 手機版：加碼功能 */}
      <footer className="checkout-confirmation-footer d-lg-none d-block p-6 bg-primary-8 fixed-bottom">
        <div className="d-flex justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center">
            <p className="mb-0 d-sm-block d-none">總計：</p>
            <p className="total-amount fs-7 mb-0">NT$ {totalPrice.toLocaleString()}</p>
          </div>
          <div className="amount-confirm-mobile d-flex align-items-center gap-3">
            <button type="button" className="btn btn-secondary btn-base align-self-end" onClick={() => handleOpenModal("bonus")}>
              我要加碼
            </button>
            <button type="button" className="btn btn-primary btn-base ms-auto" onClick={handleSubmit(onSubmit)}>
              下一步
            </button>
          </div>
        </div>
      </footer>

      <ModalComponent modalType={modalType} modalRef={modalRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} totalPrice={totalPrice} handleBonusCheck={handleBonusCheck} handleBonusReset={handleBonusReset}>
        {modalType === "bonus" && <BonusCalculator reference={bonusCalculatorRef} bonus={bonus} setBonus={setBonus} type={"bouns"} />}
      </ModalComponent>

      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
