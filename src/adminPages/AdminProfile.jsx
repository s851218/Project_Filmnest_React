import { useState } from 'react';
import { useForm , Controller } from 'react-hook-form'
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import { Alert } from "../js/customSweetAlert";
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // 載入react-fontawesome元件
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AdminSummary from '../AdminComponents/AdminSummary';
import handleInputNumber from "../js/handleInputNumber"

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminProfile() {
  const [ isEdit , setIsEdit ] = useState(false)
  const [ defaultFormValues , setDefaultFormValue ] = useState({})
  const [ tempFormValue , setTempFormValue ] = useState({})
  const [ studioId , setStudioId ] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: async() => {
      try {
        const res = await axios.get("https://json-server-vercel-tdcc.onrender.com/studios")
        const { startTime , endTime } = res.data[0].studioProfile
        const defaultStartTime = createTime(startTime)
        const defaultEndTime = createTime(endTime)
        
        const defaultValues = {
          ...res.data[0].studioProfile,
          startTime:defaultStartTime,
          endTime:defaultEndTime,
        }
        
        setStudioId(res.data[0].id)
        setDefaultFormValue(defaultValues)
        setTempFormValue(defaultValues)

        return defaultValues

      } catch (error) {
        console.log(error)
      }
    },
    mode: "onTouched"
  });

  // 處理服務時間選擇
  const handleTimeChange = (type,time) => {
    if (time) {
      const newTimeString = time.toLocaleString()
      const newTime = createTime(newTimeString)
      
      setValue(type,newTime)
    } else if ( time === null ) {
      setValue(type,null)
    }
  }

  function createTime(timeString) {
    const [ hour , min ] = timeString.split(":")
    let time = new Date();
    time.setFullYear(1970,0,1)
    time.setHours(hour)
    time.setMinutes(min)
    time.setMilliseconds(0)
    return time
  }
  // 處理服務時間選擇

  // 處理更換圖片
  const handleFileChange = (event) => {
    const file = event.target.files[0]; //取目標files的內容
    console.log(file);
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        // setFileData(reader.result); // 存 Base64 字串
        setValue("studioImageUrl",reader.result)
        setTempFormValue({
          ...tempFormValue,
          studioImageUrl:reader.result,
        })
      };
    }
  };
  // 處理更換圖片

  // 處理編輯功能
  const handleEdit = (type) => {
    switch (type) {
      case "edit": // 啟用編輯
        setIsEdit(!isEdit)
        break;

      case "cancel": // 取消編輯
        setTempFormValue(defaultFormValues)
        setIsEdit(!isEdit)
        break;
    
      default:
        break;
    }
  }

  // 完成編輯 = 送出表單
  function changeTime (time) {
    const hours = time.getHours() < 10 ? "0"+time.getHours() : `${time.getHours()}`
    const minutes =  time.getMinutes() < 10 ? "0"+time.getMinutes() : `${time.getMinutes()}`
    const timeString = hours + ":" + minutes
    return timeString
  }

  const onSubmit = async(data) => {
    const { startTime , endTime } = data
    const newStartTime = changeTime(startTime)
    const newEndTime = changeTime(endTime)
    
    const newData = {
      studioProfile: {
        ...data,
        startTime: newStartTime,
        endTime: newEndTime,
      },
    }
    
    try {
      await axios.patch(`${API_BASE}/studios/${studioId}`,newData)
      Object.keys(data).map((key)=>{
        setValue(key,data[key])
      })
      Alert.fire({
        icon: "success",
        title: "編輯成功",
      });
      setIsEdit(!isEdit)
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "編輯失敗",
        });
      }
    }
    
  }
  // 處理編輯功能

  return (
    <> 
      <Helmet>
        <title>提案者工作室</title>
      </Helmet>

      <AdminSummary /> {/* 摘要區 */}

      <div className="container d-flex justify-content-between mb-3 mb-sm-7">
        <h2 className="fs-6 lh-2 fw-bolder">個人資料</h2>
        <div>
          <button className="btn btn-outline-primary-10 fs-sm fw-bold py-3 ps-4 me-4">
            預覽
            <i className="bi bi-eye lh-1 ms-2" style={{height:16}} />
          </button>
          { !isEdit && (
            <button
              className="btn btn-outline-primary-10 fs-sm fw-bold py-3 ps-4"
              onClick={()=>handleEdit("edit")}
            >
              編輯
              <FontAwesomeIcon className="ms-2" icon={fas.faPenToSquare} />
            </button>
          )}
          { isEdit && (
            <>
              <button
                className="btn btn-outline-primary-10 fs-sm fw-bold py-3 ps-4 me-4"
                onClick={()=>handleEdit("cancel")}
              >
                取消
                <FontAwesomeIcon className="ms-2" icon={fas.faCheck} />
              </button>
              <button
                className="btn btn-primary-10 fs-sm fw-bold py-3 ps-4"
                onClick={handleSubmit(onSubmit)}
              >
                儲存
                <FontAwesomeIcon className="ms-2" icon={fas.faCheck} />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="container px-0 px-sm-3">
        <div className="bg-white p-3 p-sm-10 rounded-0 rounded-sm-5 shadow">
          <form className="row row-cols-md-2 row-cols-1">
            <div className="col-md-4 col mb-5">
              <img src={tempFormValue.studioImageUrl} alt={tempFormValue.groupName} />
              { isEdit && (
                <input
                  name="studioImageUrl"
                  type="file"
                  className="form-control mt-3"
                  id="studioImageUrl"
                  onChange={handleFileChange}
                />
              )}
            </div>
            <div className="col-md-8 col">
              <div className="row row-cols-sm-2 row-cols-1 gx-5 mb-3 mb-sm-5">
                <div className="col-sm-6 col mb-3 mb-sm-0">
                  <label htmlFor="groupName" className="form-label text-primary-6">團隊名稱</label>
                  <input
                    id="groupName"
                    type="text" 
                    className={`form-control ${errors.groupName ? "is-invalid no-icon" : ""}`}
                    disabled={!isEdit}
                    {...register("groupName",{
                      required: {
                        value:true,
                        message: "*必填欄位",
                      },
                    })}
                  />
                  { errors.groupName && <div className="invalid-feedback d-block">{errors.groupName.message}</div>}
                </div>
                <div className="col-sm-6 col">
                  <label htmlFor="personResponsible" className="form-label text-primary-6">負責人</label>
                  <input
                    id="personResponsible"
                    type="text"
                    className={`form-control ${errors.personResponsible ? "is-invalid no-icon" : ""}`}
                    disabled={!isEdit}
                    {...register("personResponsible",{
                      required: {
                        value:true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                        message: "輸入包含無效字符，只可輸入中英文",
                      },
                    })}
                  />
                  { errors.personResponsible && <div className="invalid-feedback d-block">{errors.personResponsible.message}</div>}
                </div>
              </div>

              <div className="row row-cols-sm-2 row-cols-1 gx-5 mb-3 mb-sm-5">
                <div className="col-sm-6 col mb-3 mb-sm-0">
                  <label htmlFor="email" className="form-label text-primary-6">聯絡信箱</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid no-icon" : ""}`}
                    disabled={!isEdit}
                    {...register("email",{
                      required: {
                        value:true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "*Email 格式錯誤"
                      }
                    })}
                  />
                  { errors.email && <div className="invalid-feedback d-block">{errors.email.message}</div>}
                </div>
                <div className="col-sm-6 col">
                  <label htmlFor="phone" className="form-label text-primary-6">聯絡電話</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid no-icon" : ""}`}
                    disabled={!isEdit}
                    onInput={(e)=>handleInputNumber(e,setValue)}
                    {...register("phone",{
                      required: {
                        value:true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                        message: "電話格式錯誤，請輸入有效的台灣電話號碼",
                      },
                    })}
                  />
                  { errors.phone && <div className="invalid-feedback d-block">{errors.phone.message}</div>}
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-normal fs-base lh-base text-primary-6">服務時間</h3>
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <label htmlFor="startTime" className="form-label flex-shrink-0 mb-0 me-2">開始時間</label>
                    <Controller 
                      control={control}
                      name="startTime"
                      rules={{required: "*請輸入有效時間"}}
                      render={({
                        field: { name, value },
                        formState: { errors },
                      }) => (
                        <>
                          <DatePicker
                            disableDayPicker
                            id="startTime"
                            inputClass={`form-control ${errors.startTime ? "is-invalid no-icon" : ""}`}
                            value={value}
                            onChange={(time) => handleTimeChange(name,time)}
                            format="HH:mm"
                            plugins={[
                              <TimePicker key="startTime" hideSeconds />
                            ]}
                            disabled={!isEdit}
                          />
                          { errors.startTime && <div className="invalid-feedback d-block">{errors.startTime.message}</div>}
                        </>
                      )}
                    />
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    <label htmlFor="endTime" className="form-label flex-shrink-0 mb-0 me-2">結束時間</label>
                    <Controller 
                      control={control}
                      name="endTime"
                      rules={{required: "*請輸入有效時間"}}
                      render={({
                        field: { name, value },
                        formState: { errors },
                      }) => (
                        <>
                          <DatePicker
                            disableDayPicker
                            id="endTime"
                            inputClass={`form-control ${errors.endTime ? "is-invalid no-icon" : ""}`}
                            value={value}
                            onChange={(time) => handleTimeChange(name,time)}
                            format="HH:mm"
                            plugins={[
                              <TimePicker key="endTime" hideSeconds />
                            ]}
                            disabled={!isEdit}
                          />
                          { errors.endTime && <div className="invalid-feedback d-block">{errors.endTime.message}</div>}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column mb-5">
                <label htmlFor="teamIntro" className="form-label text-primary-6">團隊簡介</label>
                <textarea
                  id="teamIntro"
                  rows={5}
                  className={`form-control ${errors.teamIntro ? "is-invalid no-icon" : ""}`}
                  disabled={!isEdit}
                  {...register("teamIntro",{
                    required: {
                      value: true,
                      message: "*必填欄位，限制500字",
                    },
                    maxLength: {
                      value: 500,
                      message: "*超出字數上限，限制500字",
                    },
                  })}
                />
                { errors.teamIntro && <div className="invalid-feedback d-block">{errors.teamIntro.message}</div>}
              </div>

              <div className="mb-0">
                <h5 className="fs-base fw-normal text-primary-6">社群媒體</h5>
                <div className="input-group">
                  <div className="input-group-text w-100 py-3 border-bottom-0 rounded-bottom-0">
                    <div className="row align-items-center">
                      <div className="col-4 d-flex align-items-center">
                        { isEdit && (
                          <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                        )}
                        <span className="text-black mx-5 d-flex" style={{width:120}}>
                          <FontAwesomeIcon className="text-primary-6 fs-6 me-2" icon={fab.faSquareFacebook} />
                          Facebook
                        </span>
                      </div>
                      <div className="col-8">
                        { isEdit && (
                          <input
                            type="text" className="form-control" aria-label="Text input with checkbox"
                            disabled={!isEdit}
                            {...register("studioFb")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-text w-100 py-3 rounded-0">
                    <div className="row align-items-center">
                      <div className="col-4 d-flex align-items-center">
                        { isEdit && (
                          <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                        )}
                        <span className="text-black mx-5 d-flex" style={{width:120}}>
                          <FontAwesomeIcon className="text-primary-6 fs-6 me-2" icon={fab.faInstagram} />
                          Instagram
                        </span>
                      </div>
                      <div className="col-8">
                        { isEdit && (
                          <input
                            type="text" className="form-control" aria-label="Text input with checkbox"
                            disabled={!isEdit}
                            {...register("studioIg")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-text w-100 py-3 border-top-0 rounded-top-0">
                    <div className="row align-items-center">
                      <div className="col-4 d-flex align-items-center">
                        { isEdit && (
                          <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                        )}
                        <span className="text-black mx-5 d-flex" style={{width:120}}>
                          <i className="bi bi-line text-primary-6 fs-6 lh-0 me-2" />
                          LINE
                        </span>
                      </div>
                      <div className="col-8">
                        { isEdit && (
                          <input
                            type="text" className="form-control" aria-label="Text input with checkbox"
                            disabled={!isEdit}
                            {...register("studioLine")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
