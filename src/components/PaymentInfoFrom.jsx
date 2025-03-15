import axios from "axios"
import { useEffect, useImperativeHandle, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { setUserInfo , setAddress, setRecipientInfo, setSameAsMember , setRequried } from "../slice/paymentInfoSlice"
import { useDispatch, useSelector } from "react-redux"

export default function PaymentInfoFrom ({reference , userData}) {
  const dispatch = useDispatch()
  const { userInfo , recipientInfo } = useSelector((state) => state.paymentInfo)
  const { register , setValue , control , formState:{errors,isValid} , handleSubmit , reset} = useForm({
    defaultValues: {
      ...userInfo,
      sameAsMember: false,
      ...recipientInfo,
      county: "請選擇縣市",
      district: "請選擇鄉鎮市區",
      zipcode: "",
      address: "",
    },
    mode: "onTouched"
  })

  useEffect(()=>{
    if (userData.userProfile) {
      const {userName , phone} = userData?.userProfile
      const {email} = userData
  
      const userInfo = {
        userName,
        userPhone: phone,
        userEmail: email,
      }
      setValue("userName",userName)
      setValue("userPhone", phone)
      setValue("userEmail", email)
      dispatch(setUserInfo(userInfo))
    }
  },[userData.userProfile])

  useImperativeHandle(reference, () => ({
    submitForm : handleSubmit(onSubmit),
    resetForm : reset,
    isValid,
  }))
  const onSubmit = (data) => {
    console.log("驗證成功",data);
  }
  
  const watch = useWatch({control})
  
  const [ countys , setCountys ] = useState([]) // 縣市選擇
  const [ districts , setDistricts ] = useState([]) // 行政區選擇
  // 取得郵遞區號資料 (OK)
  useEffect(()=> {
    (async()=>{
      try {
        const res = await axios.get("https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/taiwan_districts.json")
        // 資料來源：https://gist.github.com/abc873693/2804e64324eaaf26515281710e1792df
        // https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/taiwan_districts.json
        setCountys(res.data)
      } catch (error) {
        console.log(error);
      }
    })()
  },[])
  // 整理郵遞區號資料 => 移除釣魚臺.南海島 (OK)
  useEffect(()=> {
    const newArr = countys.filter((item) => ((item.name !== "釣魚臺") && (item.name !== "南海島")))
    if (newArr.length !== countys.length) {
      setCountys(newArr)
    }
  },[countys])
  // 縣市選擇 (OK)
  useEffect(() => {
    if (watch.county !== "請選擇縣市") {
      const res = countys.filter((county) => (watch.county === county.name))
      setDistricts(res[0].districts)
      setValue("district" , "請選擇鄉鎮市區")
    }
  },[watch.county])
  // 行政區選擇 (OK)
  useEffect(() => {
    if ((watch.district !== "請選擇鄉鎮市區")) {
      const zip = (districts.find((item) => item.name === watch.district)).zip
      console.log(zip)
      if (watch.zipcode !== zip) {
        setValue("zipcode" , zip)
      }
    } else {
      setValue("zipcode" , "")
    }
  },[watch.district])
  // 寫入地址 to slice
  useEffect(()=>{
    const addressData = {
      "county":watch.county,
      "district":watch.district,
      "address":watch.address,
      "zipcode":watch.zipcode,
    }
    dispatch(setAddress(addressData))
  },[watch.address])
  // 收件人 同會員資料 (OK)
  useEffect(() => {
    dispatch(setSameAsMember(watch.sameAsMember))
    if (watch.sameAsMember) {
      setValue("recipientName", watch.userName)
      setValue("recipientPhone", watch.userPhone)
      setValue("recipientEmail", watch.userEmail)
    } else {
      setValue("recipientName", "")
      setValue("recipientPhone", "")
      setValue("recipientEmail", "")
    }
  },[watch.sameAsMember])
  // 寫入收件人資料 to slice
  useEffect(()=>{
    const recipientInfoData = {
      recipientName: watch.recipientName,
      recipientPhone: watch.recipientPhone,
      recipientEmail: watch.recipientEmail,
    }
    dispatch(setRecipientInfo(recipientInfoData))
  },[watch.recipientName , watch.recipientPhone , watch.recipientEmail])

  return (
    <form>
      {/* 會員資料 V */}
      <fieldset className="payment-fieldset mb-4">
        <legend className="payment-lengend">會員資料</legend>
        <div className="row mb-3">
          <div className="col-lg-6 mb-lg-0 mb-3">
            <label htmlFor="userName" className="form-label">會員姓名</label>
            <input type="text" id="userName"
              className="form-control bg-dark text-primary-3"
              disabled
              {...register("userName")}
              />
          </div>

          <div className="col-lg-6">
            <label htmlFor="userPhone" className="form-label">手機</label>
            <input type="tel" id="userPhone"
              className="form-control bg-dark text-primary-3"
              disabled
              {...register("userPhone")}
              />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email</label>
          <input type="email" id="userEmail"
            className="form-control bg-dark text-primary-3"
            disabled
            {...register("userEmail")}
            />
        </div>
      </fieldset>

      {/* 收件人資料 V */}
      <fieldset className="payment-fieldset mb-4">
        <legend className="payment-lengend">收件人資料</legend>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="sameAsMember" {...register("sameAsMember")} />
          <label className="form-check-label" htmlFor="sameAsMember">同會員資料</label>
        </div>
        
        <div className="row mb-3">
          <div className="col-lg-6 mb-lg-0 mb-3">
            <label htmlFor="recipientName" className="form-label required">收件人姓名</label>
            <input type="text" id="recipientName"
              className={`form-control ${!watch.sameAsMember && (errors.recipientName && "is-invalid")} ${(watch.sameAsMember) && "bg-dark text-primary-3"}`}
              {...register("recipientName", {
                required: {
                  value: true,
                  message: "*必填欄位"
                },
                pattern: {
                  value: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                  message: "輸入包含無效字符，只可輸入中英文"
                }
              })}
              disabled={(watch.sameAsMember) && "disabled"}
              />
              { !watch.sameAsMember && errors.recipientName && (<div className="invalid-feedback">{errors?.recipientName?.message}</div>) }
          </div>
          <div className="col-lg-6">
            <label htmlFor="recipientPhone" className="form-label required">手機</label>
            <input type="tel" id="recipientPhone"
              className={`form-control ${!watch.sameAsMember && (errors.recipientPhone && "is-invalid")} ${(watch.sameAsMember) && "bg-dark text-primary-3"}`}
              {...register("recipientPhone",{
                required: {
                  value: true,
                  message: "*必填欄位"
                },
                pattern: {
                  value: /^(0[2-8]\d{7}|09\d{8})$/,
                  message: "電話格式錯誤，請輸入有效的台灣電話號碼"
                }
              })}
              disabled={(watch.sameAsMember) && "disabled"}
              />
              { !watch.sameAsMember && errors.recipientPhone && (<div className="invalid-feedback">{errors?.recipientPhone?.message}</div>) }
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="recipientEmail" className="form-label required">E-mail</label>
          <input type="email" id="recipientEmail"
            className={`form-control ${!watch.sameAsMember && (errors.recipientEmail && "is-invalid")} ${(watch.sameAsMember) && "bg-dark text-primary-3"}`}
            {...register("recipientEmail",{
              required: {
                value: true,
                message: "*必填欄位"
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email 格式錯誤"
              }
            })}
            disabled={(watch.sameAsMember) && "disabled"}
            />
            { !watch.sameAsMember && errors.recipientEmail && (<div className="invalid-feedback">{errors?.recipientEmail?.message}</div>) }
        </div>
      </fieldset>
      
      {/* 收件地址 V */}
      <fieldset className="payment-fieldset mb-4">
        <legend className="payment-lengend">收件地址</legend>
        <div className="row mb-3">
          <div className="col-lg-4 mb-lg-0 mb-3">
            <label htmlFor="county" className="form-label required">縣市</label>
            <select className="form-select" id="county" defaultValue={"請選擇縣市"}
              {...register("county",{
                required: {
                  value: true,
                  message: "*必填欄位"
                },
              })}>
              <option value="請選擇縣市" disabled>請選擇縣市</option>
              {countys.map((county)=>(
                <option key={county.name} value={county.name}>{county.name}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 mb-lg-0 mb-3">
            <label htmlFor="district" className="form-label required">鄉鎮市區</label>
            <select className="form-select" id="district" defaultValue={"請選擇鄉鎮市區"} 
              {...register("district",{
                required: {
                  value: true,
                  message: "*必填欄位"
                },
              })}>
              <option value="請選擇鄉鎮市區" disabled>請選擇鄉鎮市區</option>
              {(watch.county !== "請選擇縣市") && 
              districts.map((district)=>(
                <option key={district.name} value={district.name}>{district.name}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-4">
            <label htmlFor="zipcode" className="form-label">郵遞區號</label>
            <input type="text" id="zipcode" className="form-control bg-primary-10"
              {...register("zipcode")}
              disabled
              />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label required">地址</label>
          <input type="text" id="address" disabled={(watch.zipcode === "") && "disabled"}
            className={`form-control ${errors.address && "is-invalid"} ${(watch.zipcode === "") && "bg-dark text-primary-3"}`}
            {...register("address",{
              required: {
                value: true,
                message: "*必填欄位"
              },
            })} />
            {errors.address && (<div className="invalid-feedback">{errors?.address?.message}</div>)}
        </div>
      </fieldset>
    </form>
  )
}