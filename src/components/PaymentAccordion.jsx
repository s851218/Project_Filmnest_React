import { Collapse } from 'bootstrap';
import { useEffect, useRef } from 'react';
import { setAccordionIndex } from "../slice/paymentInfoSlice"
import { useDispatch, useSelector } from "react-redux"

const paymentMessage = {
  paymentType: [
    {
      type: "creditCard",
      text: {
        title: "線上刷卡",
        warningMessage: [
          "1. 信用卡授權成功後，本系統不會留存該刷卡人信用卡相關資料，只會保存刷卡成功之授權碼。",
          "2. 國外交易需綁定 3D 驗證。",
        ],
      }
    },
    {
      type: "ATM",
      text: {
        title: "ATM 轉帳",
        warningMessage: [
          "1. 選擇 ATM 轉帳需於期限內完成付款，超過時限則會取消交易。",
          "2. 由於 ATM 單筆轉帳金額上限為 50,000 元，若您有高額贊助需求，請聯繫平台客服人員。",
        ],
        message: "確認付款送出後，您將獲得所選擇的金融機構匯款帳號。您可以使用任意台灣金融機構所發行之金融卡來進行 ATM 轉帳，若持有該金融機構所發行之金融卡，將可享有轉帳免手續費。",
      }
    },
    { 
      type: "paymentCode",
      text: {
        title: "超商代碼付款",
        warningMessage: [
          "1. 選擇超商付款需於期限內完成付款，超過時限則會取消交易。",
          "2. 超商付款需增加 30 元手續費，在金額超過 20,000 元時無法選擇此付款方式。",
        ],
        message: "確認付款送出後，您將取得超商繳費代碼。您也可以至全台 7-11、全家、OK、萊爾富超商的多媒體機台（即 ibon、FamiPort、OK-go、Life-ET）列印繳費單，並於期限內至櫃檯繳費。",
      }
    },
  ],
  required: [
    "我已再次確認「訂單資訊」及「付款資訊」，付款完成後藍新金流將發送通知信至付款人電子信箱",
    "我已同意藍新金流付款方使用條款及隱私權保護政策",
  ],
}

export default function PaymentAccordion ({children}) {

  const dispatch = useDispatch()
  const { accordion : accordionSlice} = useSelector((state)=>state.paymentInfo)

  const collapseRefs = useRef([])

  // 切換手風琴 (OK)
  const toggleCollapse = async(index) => {
    const bsCollapse = new Collapse(collapseRefs.current[index], { toggle: false });
    bsCollapse.show(); // 顯示所選的項目
    collapseRefs.current.forEach((collapse, i) => {
      if (i !== index) {
        const bsCollapse = new Collapse(collapse, { toggle: false });
        bsCollapse.hide(); // 摺疊其他的項目
      }
    });
  }

  const handleToggleCollapse = (index) => {
    toggleCollapse(index) // 執行切換手風琴 promises
    dispatch(setAccordionIndex(index))
  }

  // 手風琴初始化
  useEffect(()=>{
    toggleCollapse(0) // OK
  },[])

  return (
    <div className="accordion" id="paymentOption">
      {
        paymentMessage.paymentType.map(({type,text},index)=>(
          <div key={type} className="accordion-item">
            <h2 className="accordion-header" >
              <button
                type="button"
                className={`accordion-button ${(accordionSlice.index===index) ? ("collapse show") : ("collapsed") }`}
              >
                <div className="form-check w-100">
                  <input
                    id={`${type}Radio`}
                    type="radio"
                    name="paymentMethod"
                    className="form-check-input"
                    onChange={() => handleToggleCollapse(index)}
                    checked={ accordionSlice.index === index }
                    disabled={ accordionSlice.isChange }
                  />
                  <label
                    htmlFor={`${type}Radio`}
                    className="form-check-label w-100 d-inline-block align-middle"
                  >
                    {text.title}
                  </label>
                </div>
              </button>
            </h2>
            
            <div
              id={type}
              ref={(el)=>collapseRefs.current[index] = el}
              className={`accordion-collapse collapse`}
            >
              <div className="accordion-body">
                {/* 付款方式介紹 */}
                <small>
                  <ol className="list-unstyled text-warning">
                    {text.warningMessage.map((message)=>(
                      <li key={message}>
                        {message}
                      </li>
                    ))}
                  </ol>
                </small>
                {/* 手風琴內容 */}
                {children}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

