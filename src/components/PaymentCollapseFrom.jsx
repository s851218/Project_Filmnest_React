import { Fragment , useEffect, useImperativeHandle, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setPaymentOption , setRequried} from "../slice/paymentInfoSlice"
import PaymentAccordion from "./PaymentAccordion" // 手風琴元件

const requiredChecked = [
  "我已再次確認「訂單資訊」及「付款資訊」，付款完成後藍新金流將發送通知信至付款人電子信箱",
  "我已同意藍新金流付款方使用條款及隱私權保護政策"
]

const creditCardFormContent = {
  "cardTypes": {
    "creditCard": "信用卡",
    "unionPay": "銀聯卡",
  },
  "methods": {
    "oneTime": "一次付清",
    "installments": "分期付款",
  },
  "required": {
    "expiryDate": "有效年月",
    "cvv": "背面末三碼",
  },
}

export default function PaymentCollapseFrom ({reference}) {
  
  const { register , control , setValue , formState:{errors} , reset , handleSubmit } = useForm({
    shouldUnregister:true, // 不寫入未被渲染的表單內容
    mode: "onTouched"
  })

  console.log(errors);
  

  useImperativeHandle(reference,() => ({
    async submitForm() {
      btnSubmit()
      // // 執行卡號驗證
      const res = handleCardCodeRequired()
      console.log("卡號驗證:",res)
      // 執行表單驗證
      await handleSubmit(onSubmit)()

      if (res) {
        handleSubmit(onSubmit(res))()
      }
    }
  }))

  const btnSubmit = async() => {
    const res = handleCardCodeRequired()
    await handleSubmit(onSubmit)()
    
      console.log("卡號驗證:",res)
  }

  const onSubmit = (codeRequiredRes) => {
    console.log("有執行submit")
    if (codeRequiredRes) {
      dispatch(setRequried({name:"paymentType",value:true}))
    }
  }

  const dispatch = useDispatch()
  const accordionIndex = useSelector((state)=>state.paymentInfo.accordion.index)

  const [ enabledCardType, setEnabledCardType ] = useState(null) // 當前啟用的卡別
  const [ enabledPayMethod, setEnabledPayMethod ] = useState(null) // 當前啟用的付款方式
  const [ cardCodeIndex , setCardCodeIndex ] = useState(0) // 當前的input位置
  const [ isPasswordVisibility , setIsPasswordVisibility ] = useState(false) // 密碼是否可視
  const [ cardCodeRequired , setCardCodeRequired ] = useState(null) // 卡號驗證狀態

  const watch = useWatch({control})
  // 監控表單
  useEffect(()=>{
    dispatch(setPaymentOption(watch))
  },[watch])

  // 執行卡號驗證
  const handleCardCodeRequired = () => {
    let cardCodeArr
    let combinedCardCode
    let cardRequired
    switch (watch.cardType) {
      case "creditCard":
        cardCodeArr = [ watch.cardNum1, watch.cardNum2 , watch.cardNum3 , watch.cardNum3 ]
        combinedCardCode = cardCodeArr.join("")

        if (combinedCardCode.length === 16) {
          cardRequired = true
          setCardCodeRequired(true)
        } else {
          cardRequired = false
          setCardCodeRequired(false)
        }
        break;

      case "unionPay":
        cardCodeArr = [ watch.unionNum1, watch.unionNum2 , watch.unionNum3 ]
        combinedCardCode = cardCodeArr.join("")

        if (combinedCardCode.length === 19) {
          cardRequired = true
          setCardCodeRequired(true)
        } else {
          cardRequired = false
          setCardCodeRequired(false)
        }
        break;
    
      default:
        break;
    }

    if (cardRequired) {
      console.log("paymentOption:",paymentOption)
      return true
    } else {
      console.log("驗證失敗")
      return false
    }
  }  

  // 手風琴切換，重設表單reset (OK)
  useEffect(()=>{
    if (accordionIndex !== 0) {
      reset()
    }
  },[accordionIndex])

  // labelb 點擊 => focus 當前啟用 input (OK)
  const handleCardNumInptLabelClick = (cardType) => {
    let endabledId // 宣告當前啟用的 input id
    
    switch (cardType) {
      case "creditCard":
        endabledId = `cardNum${cardCodeIndex+1}`
        break;
      case "unionPay":
        endabledId = `unionNum${cardCodeIndex+1}`
        break;
    
      default:
        break;
    }
    
    // 聚焦到當前啟用的 input
    const enabledInput = document.getElementById(endabledId)
    if (enabledInput) {
      enabledInput.focus();
    }
  };

  // 初始化設定 (卡別.付款方式)
  useEffect(()=>{
    setEnabledCardType("creditCard")
    setEnabledPayMethod("oneTime")
  },[])

  // radio改變=>切換卡別 (OK)
  const handleCardTypeChange = (e) => {
    const newCardType = e.target.value

    if (newCardType !== enabledCardType) {
      setEnabledCardType(newCardType)
    }
  }

  useEffect(()=>{
    if (enabledCardType) {
      if (watch.cardType !== enabledCardType) {
        setValue("cardType",enabledCardType)
      }
    }
  },[enabledCardType])
  

  // radio改變=>切換付款方式 (OK)
  const handlePayMethodChange = (e) => {
    const newPayMethod = e.target.value

    if (newPayMethod !== enabledPayMethod) {
      console.log("進行切換");
      setEnabledPayMethod(newPayMethod)
    }
  }

  useEffect(()=>{
    if (enabledPayMethod) {
      if (watch.payMethod !== enabledPayMethod) {
        setValue("payMethod",enabledPayMethod)
      }
    }
  },[enabledPayMethod])

  // 處理卡號輸入 (OK)
  const handleCardNumInputChange = (e , index , cardType) => {
    const { id: thisId , value } = e.target

    setValue( thisId ,value )
    
    let maxIndex //宣告：當前input max index

    switch (cardType) {
      case "creditCard":
        maxIndex = 3 // 最多 4 欄位
        break;

      case "unionPay":
        maxIndex = 2 // 最多 3 欄位
        break;
    
      default:
        break;
    }
    
    // moveToNext 處理欄位移動 (OK)
    const thisInput = document.getElementById(thisId)
    if ((thisInput.value.length === thisInput.maxLength) && (index < maxIndex)) {
      // 當前input填滿
      setCardCodeIndex(index+1) // 設定下一個input index
    } else if ((thisInput.value.length === 0) && (index > 0)) {
      // 當前input清空
      setCardCodeIndex(index-1) // 設定上一個input index
    }

    // 重製卡號驗證的錯誤提示
    if ((thisInput.value.length === thisInput.maxLength) && (index === maxIndex)) {
      setCardCodeRequired(null)
    }
  }
  // moveToNext 處理欄位移動 (OK)
  useEffect(()=>{
    let nextInputId
    switch (enabledCardType) {
      case "creditCard":
        nextInputId = `cardNum${cardCodeIndex+1}`
        break;
      case "unionPay":
        nextInputId = `unionNum${cardCodeIndex+1}`
        break;
    
      default:
        break;
    }
    const nextInput = document.getElementById(nextInputId)
    if (nextInput) {
      nextInput.focus()
    }
  },[cardCodeIndex])
  // 處理卡號輸入 (OK)

  // 處理長按事件
  // 參考文章：https://blog.csdn.net/sinat_31057219/article/details/60965045；https://ithelp.ithome.com.tw/articles/10196430
  // 長按事件 => 卡號顯示 (OK)
  const handleMouseDown = () => {
    setIsPasswordVisibility(true)
  }
  const handleMouseIp = () => {
    setIsPasswordVisibility(false)
  }
  //長按事件 => 卡號顯示 (OK)

  return (
    <PaymentAccordion>
      <form>
        { (accordionIndex === 0) && (
          <>
          <div className="row">
            {/* 卡片種類 */}
            <fieldset className="mb-4 col-md-6">
              <legend className="d-inline-block required">選擇卡片種類</legend>
              { Object.keys(creditCardFormContent.cardTypes).map((cardType) => {
                  const value = creditCardFormContent.cardTypes[cardType]
                  return (
                    <div key={cardType} className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="cardType"
                        className="form-check-input"
                        id={cardType}
                        value={cardType}
                        onClick={(e) => handleCardTypeChange(e)}
                        {...register("cardType")}
                      />
                      <label className="form-check-label" htmlFor={cardType}>{value}</label>
                    </div>
                  )
                }) }
            </fieldset>

            {/* 付款方式 */}
            <fieldset className="mb-4 col-md-6">
              <legend className="d-inline-block required">選擇付款方式</legend>
              { Object.keys(creditCardFormContent.methods).map((method) => {
                  const value = creditCardFormContent.methods[method]
                  return (
                    <div key={method} className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="form-check-input"
                        id={method}
                        value={method}
                        onClick={(e) => handlePayMethodChange(e)}
                        {...register("payMethod")}
                      />
                      <label className="form-check-label" htmlFor={method}>{value}</label>
                    </div>
                  )
                }) }
            </fieldset>
          </div>

          <hr />

          <fieldset>
            {/* 信用卡 */}
            { (enabledCardType === "creditCard") && (
              <div id="creditCardForm" className="credit-card-form">
                <div className="input-group d-flex align-items-center gap-1 mb-4">
                  <label onClick={()=>handleCardNumInptLabelClick("creditCard")} className="form-label mb-0 required">
                    輸入卡號
                  </label>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-1"></div>
                    { Array.from({length: 4 }).map(( _ , index) => {
                      return (
                        <Fragment key={`cardNum${index+1}`}>
                          <input
                            id={`cardNum${index+1}`}
                            type={`${((index === 0) || (index === 3)) ? "text" : ( isPasswordVisibility ? "text" : "password")}`}
                            className={`card-number-input form-control text-center ${(cardCodeIndex !== index) ? "bg-dark text-primary-3" : ""}`}
                            style={{
                              width: 80,
                              borderColor: cardCodeRequired === false && "red",
                            }}
                            inputMode="numeric"
                            placeholder="- - - -"
                            pattern="^\d{4}$"
                            maxLength="4"
                            disabled={cardCodeIndex !== index}
                            onChange={(e) => handleCardNumInputChange(e ,index, "creditCard")}
                          />
                          { (index !== 3) ? (<span>-</span>) : (<button type="button" className="btn ms-1" onMouseDown={handleMouseDown} onMouseUp={handleMouseIp}><i className="fa-solid fa-eye"/></button>) }
                        </Fragment>
                      )
                    }) }
                  </div>
                  { cardCodeRequired === false && <div className="invalid-feedback d-block">*卡號格式錯誤</div> }
                  <ul className="checkout-card-list list-unstyled mb-0">
                    <li><i className="fa-brands fa-cc-visa" /></li>
                    <li><i className="fa-brands fa-cc-mastercard" /></li>
                    <li><i className="fa-brands fa-cc-jcb" /></li>
                  </ul>
                </div>

                <div className={`input-group d-flex align-items-center gap-7 ${(errors.expiryDate || errors.cvv) ? "" : "mb-4"}`}>
                  { Object.keys(creditCardFormContent.required).map((id,index) => {
                      const value = creditCardFormContent.required[id]
                      return (
                        <div key={`creditCard-${id}`} className="col-lg-3 fit-content mb-4">
                          <div className="d-flex align-items-center">
                            <label htmlFor={id} className="form-label text-nowrap mb-0 required">{value}</label>
                            <input
                              id={id}
                              type="text"
                              className={`form-control text-center ms-2 ${(id==="cvv") ? "gap-2" : ""}`}
                              style={{
                                width: (index === 0 && 80) || (index === 1 && 60),
                                borderColor: errors[id] && "red",
                              }}
                              inputMode="numeric"
                              placeholder={`${(id==="cvv") ? "CVV" : "MM/YY"}`}
                              pattern={`${(id==="cvv") ? "^\d{3}$" : "^\d{4}$"}`}
                              maxLength={`${(id==="cvv") ? "3" : "4"}`}
                              {...register(`${id}`,{
                                required: {
                                  value: true,
                                  message: "*必填欄位",
                                },
                                pattern: {
                                  value: id === "cvv" ? /^\d{3}$/ : /^\d{4}$/,
                                  message: id === "cvv" ? "必須是三位數字" : "日期格式不正確",
                                },
                              })}
                              />
                              { id==="cvv" && <i className="fa-regular fa-credit-card" /> }
                          </div>
                          { errors[id] && <div className="invalid-feedback d-block">{errors[id]?.message}</div> }
                          { errors.expiryDate && !errors.cvv && id === "cvv" && <div className="d-block">　</div> }
                          { errors.cvv && !errors.expiryDate && id === "expiryDate" && <div className="d-block">　</div> }
                        </div>
                      )
                    }) }
                </div>
              </div>
            )}
            {/* 銀聯卡 */}
            { (enabledCardType === "unionPay") && (
              <div id="unionPayForm" className="union-pay-form">
                <div className="input-group d-flex align-items-center gap-1 mb-4">
                  <label onClick={()=>handleCardNumInptLabelClick("unionPay")} className="form-label mb-0 required">
                    輸入卡號
                  </label>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-1"></div>
                    { Array.from({length: 3 }).map(( _ , index) => {
                      const inputWidth = [ 80 , 160 , 140 ]
                      const placeholder = (index === 0 && "- - - -") || (index === 1 && "- - - - - - - -") || (index === 2 && "- - - - - - -")
                      // const pattern = (index === 0 && "^\d{4}$") || (index === 1 && "^\d{8}$") || (index === 2 && "^\d{7}$")
                      const maxLength = [ 4 ,8 ,7 ]
                      return (
                        <Fragment key={`unionNum${index+1}`}>
                          <input
                            id={`unionNum${index+1}`}
                            type={`${((index === 0) || (index === 2)) ? "text" : ( isPasswordVisibility ? "text" : "password")}`}
                            className={`card-number-input form-control text-center ${(cardCodeIndex !== index) ? "bg-dark text-primary-3" : ""}`}
                            style={{
                              width: inputWidth[index],
                              borderColor: cardCodeRequired === false && "red",
                            }}
                            inputMode="numeric"
                            placeholder={placeholder}
                            pattern={`^\d{${maxLength[index]}}$`}
                            maxLength={maxLength[index]}
                            disabled={cardCodeIndex !== index}
                            onChange={(e) => handleCardNumInputChange(e , index,"unionPay")}
                          />
                          { (index !== 2) ? (<span>-</span>) : (<button type="button" className="btn ms-1" onMouseDown={handleMouseDown} onMouseUp={handleMouseIp}><i className="fa-solid fa-eye"/></button>) }
                        </Fragment>
                      )
                    }) }
                  </div>
                  { cardCodeRequired === false && <div className="invalid-feedback d-block">*卡號格式錯誤</div> }
                </div>

                <div className="input-group d-flex align-items-center gap-7 mb-4">
                  { Object.keys(creditCardFormContent.required).map((id,index) => {
                      const value = creditCardFormContent.required[id]
                      const inputWidth = (index === 0 && 80) || (index === 1 && 60)
                      return (
                        <div key={`unionPay-${id}`} className={`col-lg-3 fit-content ${errors.expiryDate ? "" : "mb-4"}`}>
                          <div className="d-flex align-items-center">
                            <label htmlFor={id} className={`form-label text-nowrap mb-0 ${(id==="cvv") ? "me-2" : "required"}`}>{value}</label>
                            <input
                              id={id}
                              type="text"
                              className={`form-control text-center ms-2 ${(id==="cvv") ? "gap-2" : ""}`}
                              style={{width: inputWidth}}
                              inputMode="numeric"
                              placeholder={`${(id==="cvv") ? "CVV" : "MM/YY"}`}
                              pattern={`${(id==="cvv") ? "^\d{3}$" : "^\d{4}$"}`}
                              maxLength={`${(id==="cvv") ? "3" : "4"}`}
                              {...register(`${id}`,{
                                required: {
                                  value: id === "cvv" ? false : true,
                                  message: "*必填欄位",
                                },
                                pattern: {
                                  value: id === "cvv" ? /^\d{3}$/ : /^\d{4}$/,
                                  message: id === "cvv" ? "必須是三位數字" : "日期格式不正確",
                                },
                              })}
                            />
                            { id==="cvv" && (<>
                              <i className="fa-regular fa-credit-card" />
                              <small className="ms-2 text-warning">※ 若您的卡片無末三碼，可不填寫</small>
                            </>)}
                          </div>
                          { errors.expiryDate && <div className="invalid-feedback d-block">{errors[id]?.message}</div> }
                          { errors.expiryDate && id === "cvv" && <div className="d-block">　</div> }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )}
          </fieldset>
          </>
        )}

        { (accordionIndex === 1) && (
          <div className="d-flex flex-column mb-4 gap-2">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <label htmlFor="bankSelect" className="form-label mb-0 required">選擇銀行</label>
              <select 
                id="bankSelect"
                className={`form-select d-inline-block fit-content ${errors.bankSelect && "is-invalid"}`}
                defaultValue={"請選擇轉帳銀行"}
                {...register("bankSelect",{
                  validate: {
                    value: value => value !== "請選擇轉帳銀行" || "請選擇有效銀行",
                  }
                })}
              >
                <option value="請選擇轉帳銀行" disabled>請選擇轉帳銀行</option>
                <option value="中華郵政">中華郵政</option>
                <option value="台灣銀行">台灣銀行</option>
                <option value="台新銀行">台新銀行</option>
                <option value="國泰世華銀行">國泰世華銀行</option>
              </select>
              { errors.bankSelect && <div className="invalid-feedback d-inline-block fit-content">{errors?.bankSelect?.message}</div> }
            </div>
            <p className="mb-0">確認付款送出後，您將獲得所選擇的金融機構匯款帳號。您可以使用任意台灣金融機構所發行之金融卡來進行 ATM 轉帳，若持有該金融機構所發行之金融卡，將可享有轉帳免手續費。</p>
          </div>
        ) }

        { (accordionIndex === 2) && (
          <p>
            確認付款送出後，您將取得超商繳費代碼。您也可以至全台 7-11、全家、OK、萊爾富超商的多媒體機台（即 ibon、FamiPort、OK-go、Life-ET）列印繳費單，並於期限內至櫃檯繳費。
          </p>
        )}

        {/* 付款人電子信箱 */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
          <label htmlFor="payerEmail" className="form-label mb-0 required">付款人電子信箱</label>
          <input type="email" id="payerEmail" className={`form-control d-inline-block fit-content ${errors.payerEmail && "is-invalid"}`}
            {...register("payerEmail",{
              required: {
                value: true,
                message: "*必填欄位"
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "*Email 格式錯誤"
              }
            })}
          />
          { errors.payerEmail && <div className="invalid-feedback d-inline-block fit-content">{errors?.payerEmail?.message}</div> }
        </div>

        {/* 表單驗證checkbox */}
          {requiredChecked.map((item,index)=>{
            const itemName = `requiredChecked${index}`
            return (
              <div key={index} className="form-check">
                <input type="checkbox" id={itemName} className="form-check-input"
                  style={{
                    borderColor: errors.requiredChecked && errors.requiredChecked[index] && "red",
                  }}
                  {...register(`requiredChecked.${index}`,{
                    required: {
                      value:true,
                      message:"*必填欄位"
                    }
                  })} 
                />
                <label htmlFor={itemName} className="form-check-label">{item}</label>
                { errors.requiredChecked && errors.requiredChecked[index] && (
                  <div className="invalid-feedback d-block">
                    {errors.requiredChecked[index]?.message}
                  </div>
                ) }
              </div>
            )}
          )}
      </form>
    </PaymentAccordion>
  )
}