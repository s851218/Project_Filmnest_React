import { Fragment , useEffect, useImperativeHandle, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setPaymentOption } from "../slice/paymentInfoSlice"
import PaymentAccordion from "./PaymentAccordion" // 手風琴元件

const requiredChecked = [
  "我已再次確認「訂單資訊」及「付款資訊」，付款完成後藍新金流將發送通知信至付款人電子信箱",
  "我已同意藍新金流付款方使用條款及隱私權保護政策"
]

const creditCardFormContent = {
  "cardTypes": {
    "creditCard": {
      "name": "信用卡",
      "patterns": [ 4 , 4 , 4 , 4]
    },
    "unionPay": {
      "name": "銀聯卡",
      "patterns":  [ 4 , 8 ,7 ]
    }
  },
  "methods": {
    "oneTime": "一次付清",
    "installments": "分期付款",
  },
  "required": {
    "expiryDate": {
      "name": "有效年月",
      "pattern":  4,
    },
    "cvv": {
      "name": "背面末三碼",
      "pattern":  3,
    }
  },
}

export default function PaymentCollapseFrom ({reference , showError}) {
  
  const { register , control , setValue , formState:{errors,isValid} , reset , handleSubmit } = useForm({
    shouldUnregister:true, // 不寫入未被渲染的表單內容
    mode: "onTouched"
  })

  useImperativeHandle(reference,() => ({
    submitForm : handleSubmit(onSubmit),
    resetForm : reset,
    isValid,
  }))

  const onSubmit = (data) => {
    console.log("驗證成功",data);
  }

  const dispatch = useDispatch()
  const accordionIndex = useSelector((state)=>state.paymentInfo.accordion.index)

  const [ enabledCardType, setEnabledCardType ] = useState(null) // 當前啟用的卡別
  const [ enabledPayMethod, setEnabledPayMethod ] = useState(null) // 當前啟用的付款方式
  const [ cardCodeIndex , setCardCodeIndex ] = useState(0) // 當前的input位置
  const [ isPasswordVisibility , setIsPasswordVisibility ] = useState(false) // 密碼是否可視

  const watch = useWatch({control})
  // 監控表單
  useEffect(()=>{
    dispatch(setPaymentOption(watch))
  },[watch])

  // 手風琴切換，重設表單reset (OK)
  useEffect(()=>{
    reset()
    if (accordionIndex === 0) {
      setEnabledCardType("creditCard")
      setValue("cardType","creditCard")
      setEnabledPayMethod("oneTime")
      setValue("payMethod","oneTime")
      setCardCodeIndex(0)
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
      reset({
        "cardType": newCardType,
        "payMethod": enabledPayMethod,
      })
    }
  }

  useEffect(()=>{
    if (enabledCardType) {
      if (watch.cardType !== enabledCardType) {
        setValue("cardType", enabledCardType)
      }
    }
  },[enabledCardType])
  

  // radio改變=>切換付款方式 (OK)
  const handlePayMethodChange = (e) => {
    const newPayMethod = e.target.value

    if (newPayMethod !== enabledPayMethod) {
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

  // 處理卡號連續輸入 (OK)
  useEffect(()=> {
    if ((enabledCardType)&& accordionIndex === 0) {
      const codeIndexLength = creditCardFormContent.cardTypes[enabledCardType].patterns.length
      const thisInputId = `codeInput${cardCodeIndex+1}`
      const thisInput = document.getElementById(thisInputId)

      if ((thisInput.value.length === thisInput.maxLength) && (cardCodeIndex < codeIndexLength-1)) {
        // 當前input填滿
        setCardCodeIndex(cardCodeIndex+1) // 設定下一個input index
      } else if ((thisInput.value.length === 0) && (cardCodeIndex > 0)) {
        // 當前input清空
        setCardCodeIndex(cardCodeIndex-1) // 設定上一個input index
      }
    }
  },[watch])

  useEffect(()=>{
    if (enabledCardType) {
      const nextInputId = `codeInput${cardCodeIndex+1}`
      const nextInput = document.getElementById(nextInputId)
      if (nextInput) {
        nextInput.focus()
      }
    }
  },[cardCodeIndex])
  // 處理卡號連續輸入 (OK)

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
                  const name = creditCardFormContent.cardTypes[cardType].name
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
                      <label className="form-check-label" htmlFor={cardType}>{name}</label>
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
            {/* 信用卡資料 */}
            { (enabledCardType) && (
              <div id="creditCardForm" className="credit-card-form">
                <div className="input-group d-flex align-items-center gap-1 mb-4">
                  <label onClick={()=>handleCardNumInptLabelClick("creditCard")} className="form-label mb-0 required">
                    輸入卡號
                  </label>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-1">
                      
                    </div>
                    { creditCardFormContent.cardTypes[enabledCardType].patterns.map(( pattern , index) => {
                      const maxIndex = creditCardFormContent.cardTypes[enabledCardType].patterns.length
                      const placeholderText = Array.from({length: pattern}).map((item) => item = "-").join(" ")
                      const inputName = `codeInput${index+1}`
                      let inputWidth
                      if ("unionPay") {
                        inputWidth = pattern*20
                      }
                      // 動態創建正規表達式
                      const regex = new RegExp(`^\\d{${pattern}}$`);

                      return (
                        <Fragment key={inputName}>
                          <input
                            id={inputName}
                            type={`${((index === 0) || (index === maxIndex)) ? "text" : ( isPasswordVisibility ? "text" : "password")}`}
                            className={`card-number-input form-control text-center ${(cardCodeIndex !== index) ? "bg-dark text-primary-3" : ""} ${ showError && (Object.keys(errors).some((error)=> error.includes("codeInput"))) ? "border-danger" : ""}`}
                            style={{
                              width: inputWidth,
                            }}
                            inputMode="numeric"
                            placeholder={placeholderText}
                            pattern={regex}
                            maxLength={pattern}
                            disabled={cardCodeIndex !== index}
                            autoComplete="one-time-code"
                            {...register(inputName,{
                              required: {
                                value: true
                              },
                              pattern: {
                                value: regex,
                                message: "*卡號格式錯誤"
                              },
                            })}
                          />
                          { (index !== (maxIndex-1) ) ? (<span>-</span>) : (<button type="button" className="btn ms-1" onMouseDown={handleMouseDown} onMouseUp={handleMouseIp}><i className="fa-solid fa-eye"/></button>) }
                        </Fragment>
                      )
                    }) }
                  </div>
                  { showError && (Object.keys(errors).some((error)=> error.includes("codeInput"))) && <div className="invalid-feedback d-block">*卡號格式錯誤</div>}
                  { (enabledCardType === "creditCard") && (
                    <ul className="checkout-card-list list-unstyled mb-0">
                      <li><i className="fa-brands fa-cc-visa" /></li>
                      <li><i className="fa-brands fa-cc-mastercard" /></li>
                      <li><i className="fa-brands fa-cc-jcb" /></li>
                    </ul>
                  )}
                </div>

                <div className={`input-group d-flex align-items-center gap-6 ${(errors.expiryDate || errors.cvv) ? "" : "mb-4"}`}>
                  { Object.keys(creditCardFormContent.required).map((id,index) => {
                    const { name , pattern } = creditCardFormContent.required[id]
                    const inputWidth = pattern*20
                    const placeholderText = (id === "cvv") ? "CVV" : "MM/YY"
                    const patternErrorMessage = (id === "cvv") ? "必須是三位數字" : "日期格式不正確"
                    // 動態創建正規表達式
                    const regex = new RegExp(`^\\d{${pattern}}$`)
                      
                    return (
                      <div key={name} className="col-lg-3 fit-content mb-4">
                        <div className="d-flex align-items-center">
                          <label htmlFor={id} className={`form-label text-nowrap mb-0  ${(id==="expiryDate") ? "me-1" : ""} ${id==="cvv" && enabledCardType === "unionPay" ? "me-3" : "required"} `}>{name}</label>
                          <input
                            id={id}
                            type="text"
                            className={`form-control text-center ms-2 
                              ${(id==="cvv") ? "gap-2" : ""}
                              ${errors.expiryDate && id === "expiryDate" ? "is-invalid no-icon" : ""}
                              ${errors.cvv && id==="cvv" ? "is-invalid no-icon" : ""}`}
                            style={{width: inputWidth}}
                            inputMode="numeric"
                            placeholder={placeholderText}
                            pattern={regex}
                            maxLength={pattern}
                            {...register( id ,{
                              required: {
                                value: ((id === "cvv") && (enabledCardType === "unionPay")) ? false : true,
                                message: "*必填欄位",
                              },
                              pattern: {
                                value: (id === "cvv" && enabledCardType === "unionPay") ? false : regex,
                                message: patternErrorMessage,
                              },
                            })}
                          />
                          { id==="cvv" && <i className="fa-regular fa-credit-card" /> }
                          { id==="cvv" && enabledCardType === "unionPay" &&
                            <small className="ms-2 text-warning">※ 若您的卡片無末三碼，可不填寫</small> }
                        </div>
                        { errors[id] && <div className="invalid-feedback d-block">{errors[id]?.message}</div> }
                        { errors.expiryDate && enabledCardType === "unionPay" && id === "cvv" && <div className="d-block">　</div> }
                      </div>
                    )
                  }) }
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
                className={`form-select d-inline-block fit-content ${errors.bankSelect ? "is-invalid no-icon" : ""}`}
                defaultValue={"請選擇轉帳銀行"}
                {...register("bankSelect",{
                  validate: {
                    value: value => value !== "請選擇轉帳銀行" || "*請選擇有效銀行",
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