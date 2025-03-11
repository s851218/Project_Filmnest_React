import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

{/* <script src="https://code.jquery.com/jquery-3.7.1.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.中文 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/locales/bootstrap-datepicker.zh-TW.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.min.css" rel="stylesheet" /> */}


export default function CreatePropsal() {
  {/*
    email: "電子信箱"
    endTime: "服務時間(迄)"
    groupName: "團隊名稱"
    personResponsible: "負責人"
    phone: "電話"
    startTime: "服務時間(起)"
    studioFb: "FB"
    studioIg: "IG"
    studioImageUrl: "大頭貼"
    studioLine: "LINE"
    teamIntro: "團隊簡介"
  */}
  
  const {
    register,
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      groupName: "",
      personResponsible: "",
      email: "",
      phone: "",
      studioImageUrl: "",
      startTime: "",
      endTime: "",
      studioFb: "",
      studioIg: "",
      studioLine: "",
      teamIntro: "",
    }
  })

  const watch = useWatch({control})
  useEffect(() => {
    console.log(watch)
  },[watch])

  const onSubmit = () => {

  }

  return (
    <>
      <div className="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <h1 className="text-center mb-5 mb-sm-8 mb-md-10">發起專案</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-lengend">專案基本資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectName" className="form-label required">專案名稱</label>
                  <input type="text" className="form-control" id="projectName" {...register("projectName")} />
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectType" className="form-label required">專案類型</label>
                  <select className="form-select" id="projectType" defaultValue="請選擇專案類型" {...register("projectType")}>
                    <option selected>請選擇專案類型</option>
                    <option value="喜劇">喜劇</option>
                    <option value="愛情">愛情</option>
                    <option value="恐怖">恐怖</option>
                    <option value="懸疑">懸疑</option>
                    <option value="科幻">科幻</option>
                    <option value="紀錄片">紀錄片</option>
                    <option value="動畫">動畫</option>
                    <option value="實驗電影">實驗電影</option>
                  </select>
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="projectdIntroduction" className="form-label required">專案簡介</label>
                  <textarea className="form-control" name="projectdIntroduction" id="projectdIntroduction" {...register("projectdIntroduction")} />
                  <p className="fs-sm mb-0 mt-1">限制30字</p>
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="target" className="form-label required">目標金額</label>
                  <input type="number" className="form-control" id="target" {...register("target")} />
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="inputDate1" className="form-label required">募資時間</label>
    
                  <div className="container px-0">
                    <div className="row daterange">
                      <div className="col-6">
                        <small><label htmlFor="inputDate1" className="form-label required">起始時間</label></small>
                        <input type="text" id="inputDate1" placeholder="起始時間" className="form-control" />
                      </div>
                      <div className="col-6">
                        <small><label htmlFor="inputDate2" className="form-label required">結束時間</label></small>
                        <input type="text" id="inputDate2" placeholder="結束時間" className="form-control" />
                      </div>
                    </div>
                  </div>
    
                  {/* {
                    const fundraisingTime = {
                      language: 'zh-TW', //語言
                      autoclose: true, //選擇後自動關閉
                      format: "yyyy-mm-dd",//日期格式
                    };
            
                    $("#inputDate1").datepicker(fundraisingTime);
                    $("#inputDate2").datepicker(fundraisingTime);
            
                    //第一個輸入選中日期後，設置第二個輸入框的開始日期
                    $("#inputDate1").datepicker().on("changeDate", function (e) {
                        $("#inputDate2").datepicker('setStartDate', e.date);
                    });
                    $("#inputDate2").datepicker().on("changeDate", function (e) {
                        $("#inputDate1").datepicker('setEndDate', e.date);
                    });
                  } */}
                  {/* 參考文章：https://www.itxst.com/bootstrap-datepicker/tutorial.html */}
                </div>
              </fieldset>
            </div>
    
            <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset className="payment-fieldset col-12 col-md-10">
                <legend className="payment-lengend">提案人資訊</legend>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="proposalLeader" className="form-label required">提案負責人</label>
                  <input type="text" className="form-control" id="proposalLeader" {...register("personResponsible")} />
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="proposalUnit" className="form-label required">提案單位</label>
                  <input type="text" className="form-control" id="proposalUnit" {...register("groupName")} />
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="Introduction" className="form-label required">提案人/團隊介紹</label>
                  <textarea className="form-control" name="Introduction" id="Introduction" rows={3} {...register("teamIntro")} />
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="email" className="form-label required">聯絡信箱</label>
                  <input type="email" className="form-control" id="email" {...register("email")} />
                  
                </div>
                <div className="mb-3 mb-md-5">
                  <label htmlFor="tel" className="form-label required">連絡電話</label>
                  <input type="tel" className="form-control" id="tel" {...register("phone")} />
                </div>
              </fieldset>
            </div>
          </div>
        </form>
        
        <a href="completeProposal.html" className="btn btn-primary fw-bolder py-3 px-5 w-100 w-md-auto">送出</a>
      </div>
    </>
  )
}