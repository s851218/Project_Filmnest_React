import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Alert } from "../../js/customSweetAlert";
import handleInputNumber from "../../helpers/handleInputNumber"

const API_BASE = import.meta.env.VITE_API_BASE;

export default function CreateProposal() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    trigger, // 手動觸發驗證的函式
  } = useForm({
    defaultValues: {
      groupName: "",
      personResponsible: "",
      email: "",
      phone: "",
      studioImageUrl: "",
      studioFb: "",
      studioIg: "",
      studioLine: "",
      teamIntro: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE}/createProjects`, data);
      Alert.fire(
        {
          icon: "success",
          title: "提交成功",
        },
        setTimeout(() => {
          navigate("/completeProposal");
        }, 1500)
      );
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "提交失敗",
        });
      }
    }
  };

  const [endMinDate, setEndMinDate] = useState(null);

  const handleChange = (newDateTime, type) => {
    if (newDateTime) {
      switch (type) {
        case "created": {
          // 設置時間為當日 00:00
          newDateTime.setHours(0, 0, 0, 0);
          setValue("createdAt", newDateTime); // 更新日期與時間

          const defaultEndTime = new Date(newDateTime.getTime());
          defaultEndTime.setMonth(defaultEndTime.getMonth() + 1);
          defaultEndTime.setHours(23, 59, 59, 999);
          setValue("endAt", defaultEndTime); // 預設截止日期為一個月後
          setEndMinDate(defaultEndTime);
          break;
        }

        case "end":
          // 設置時間為當日 23:59
          newDateTime.setHours(23, 59, 59, 999);
          setValue("endAt", newDateTime); // 更新日期與時間
          break;

        default:
          break;
      }
    }

    if (errors.createdAt || errors.endAt) {
      trigger("createdAt");
      trigger("endAt");
    }
  };

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1); // 將日期設為明天，但時間為當前時間
  nextDay.setHours(0, 0, 0, 0); // 因此重置時間為00:00

  return (
    <>
      <div className="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <h1 className="text-center mb-5 mb-sm-8 mb-md-10">發起專案</h1>
        <form>
          <div className="container">
            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-legend">專案基本資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectName" className="form-label required">
                    專案名稱
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.projectName ? "is-invalid" : ""}`}
                    id="projectName"
                    {...register("projectName", {
                      required: {
                        value: true,
                        message: "*必填欄位，限制30字",
                      },
                      maxLength: {
                        value: 30,
                        message: "*超出字數上限，限制30字",
                      },
                    })}
                  />
                  {errors.projectName ? <div className="invalid-feedback">{errors?.projectName?.message}</div> : <p className="fs-sm mb-0 mt-1">限制30字</p>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectType" className="form-label required">
                    專案類型
                  </label>
                  <select
                    className={`form-select ${errors.projectType ? "is-invalid" : ""}`}
                    id="projectType"
                    defaultValue="請選擇專案類型"
                    {...register("projectType", {
                      validate: {
                        value: (value) => value !== "請選擇專案類型" || "*請選擇有效專案類型",
                      },
                    })}
                  >
                    <option value="請選擇專案類型" disabled>
                      請選擇專案類型
                    </option>
                    <option value="喜劇">喜劇</option>
                    <option value="愛情">愛情</option>
                    <option value="恐怖">恐怖</option>
                    <option value="懸疑">懸疑</option>
                    <option value="科幻">科幻</option>
                    <option value="紀錄片">紀錄片</option>
                    <option value="動畫">動畫</option>
                    <option value="實驗電影">實驗電影</option>
                  </select>
                  {errors.projectType && <div className="invalid-feedback">{errors?.projectType?.message}</div>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectIntroduction" className="form-label required">
                    專案簡介
                  </label>
                  <textarea
                    className={`form-control ${errors.projectIntroduction ? "is-invalid" : ""}`}
                    name="projectIntroduction"
                    id="projectIntroduction"
                    {...register("projectIntroduction", {
                      required: {
                        value: true,
                        message: "*必填欄位，限制80字",
                      },
                      maxLength: {
                        value: 80,
                        message: "*超出字數上限，限制80字",
                      },
                    })}
                  />
                  {errors.projectIntroduction ? <div className="invalid-feedback">{errors?.projectIntroduction?.message}</div> : <p className="fs-sm mb-0 mt-1">限制80字</p>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="target" className="form-label required">
                    目標金額
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className={`form-control ${errors.target ? "is-invalid" : ""}`}
                    id="target"
                    onInput={(e)=>handleInputNumber(e,setValue)}
                    {...register("target", {
                      required: {
                        value: true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^[1-9]\d*$/,
                        message: "*格式錯誤，只能輸入大於0的整數",
                      },
                    })}
                  />
                  {errors.target && <div className="invalid-feedback">{errors?.target?.message}</div>}
                </div>
                <div className="mb-3 mb-md-5">
                  <h3 className="fs-base fw-normal lh-base required">募資時間</h3>
                  <div className="container px-0">
                    <div className="row dateRange">
                      <div className="col-6">
                        <small>
                          <label htmlFor="createdAt" className="form-label required">
                            起始時間
                          </label>
                        </small>
                        <Controller
                          name="createdAt"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "*請填入有效日期",
                          }}
                          render={({ field }) => <DateTimePicker {...field} id="createdAt" className={`form-control ${errors.createdAt ? "is-invalid" : ""}`} value={field.value} format="y-MM-dd HH:mm" clearIcon={null} onChange={(date) => handleChange(date, "created")} minDate={nextDay} maxDetail={"minute"} disableClock={true} />}
                        />
                      </div>
                      <div className="col-6">
                        <small>
                          <label htmlFor="endAt" className="form-label required">
                            結束時間
                          </label>
                        </small>
                        <Controller
                          name="endAt"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "*請填入有效日期",
                          }}
                          render={({ field }) => <DateTimePicker {...field} id="endAt" className={`form-control ${errors?.endAt ? "is-invalid" : ""}`} value={field.value} format="y-MM-dd HH:mm" clearIcon={null} onChange={(date) => handleChange(date, "end")} minDate={endMinDate} maxDetail={"minute"} disableClock={true} />}
                        />
                      </div>
                    </div>
                  </div>
                  {errors?.createdAt || errors?.endAt ? (
                    <div className="row">
                      <div className="col-6">
                        <div className="invalid-feedback d-inline-block">{errors?.createdAt?.message}</div>
                      </div>
                      <div className="col-6">
                        <div className="invalid-feedback d-inline-block">{errors?.endAt?.message}</div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </fieldset>
            </div>

            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-legend">提案人資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="personResponsible" className="form-label required">
                    提案負責人
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.personResponsible ? "is-invalid" : ""}`}
                    id="personResponsible"
                    {...register("personResponsible", {
                      required: {
                        value: true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                        message: "輸入包含無效字符，只可輸入中英文",
                      },
                    })}
                  />
                  {errors.personResponsible && <div className="invalid-feedback">{errors?.personResponsible?.message}</div>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="groupName" className="form-label required">
                    提案單位
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.groupName ? "is-invalid" : ""}`}
                    id="groupName"
                    {...register("groupName", {
                      required: {
                        value: true,
                        message: "*必填欄位",
                      },
                    })}
                  />
                  {errors.groupName && <div className="invalid-feedback">{errors?.groupName?.message}</div>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="teamIntro" className="form-label required">
                    提案人/團隊介紹
                  </label>
                  <textarea
                    className={`form-control ${errors.teamIntro ? "is-invalid" : ""}`}
                    name="teamIntro"
                    id="teamIntro"
                    rows={3}
                    {...register("teamIntro", {
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
                  {/* <p className="fs-sm mb-0 mt-1">限制300字</p> */}
                  {errors.teamIntro ? <div className="invalid-feedback">{errors?.teamIntro?.message}</div> : <p className="fs-sm mb-0 mt-1">限制300字</p>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="email" className="form-label required">
                    聯絡信箱
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "*Email 格式錯誤",
                      },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors?.email?.message}</div>}
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="tel" className="form-label required">
                    連絡電話
                  </label>
                  <input
                    id="tel"
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "*必填欄位",
                      },
                      pattern: {
                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                        message: "電話格式錯誤，請輸入有效的台灣電話號碼",
                      },
                    })}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors?.phone?.message}</div>}
                </div>
              </fieldset>
            </div>
          </div>
        </form>

        <button type="button" className="btn btn-primary btn-main fw-bolder w-100 w-md-auto" onClick={handleSubmit(onSubmit)}>
          送出
        </button>
      </div>
    </>
  );
}
