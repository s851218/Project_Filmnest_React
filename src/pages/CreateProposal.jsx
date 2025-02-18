{/* <script src="https://code.jquery.com/jquery-3.7.1.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.中文 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/locales/bootstrap-datepicker.zh-TW.min.js" />
<!-- Bootstrap DatePicker 日期選擇器模組.CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.min.css" rel="stylesheet" /> */}

export default function CreatePropsal() {
  return (
    <>
      <div class="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <h1 class="text-center mb-5 mb-sm-8 mb-md-10">發起專案</h1>
        <form action="#">
          <div class="container">
            <div class="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset class="payment-fieldset col-12 col-md-10">
                <legend class="payment-lengend">專案基本資訊</legend>
                <div class="mb-3 mb-md-5">
                  <label for="projectName" class="form-label required">專案名稱</label>
                  <input type="text" class="form-control" id="projectName" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="projectType" class="form-label required">專案類型</label>
                  <select class="form-select" id="projectType" required>
                    <option selected>請選擇專案類型</option>
                    <option value="1">喜劇</option>
                    <option value="2">愛情</option>
                    <option value="3">恐怖</option>
                    <option value="4">懸疑</option>
                    <option value="5">科幻</option>
                    <option value="6">紀錄片</option>
                    <option value="7">動畫</option>
                    <option value="8">實驗電影</option>
                  </select>
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="projectdIntroduction" class="form-label required">專案簡介</label>
                  <input type="text" class="form-control" id="projectdIntroduction" required />
                  <p class="fs-sm mb-0 mt-1">限制30字</p>
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="target" class="form-label required">目標金額</label>
                  <input type="text" class="form-control" id="target" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="inputDate1" class="form-label required">募資時間</label>
    
                  <div class="container px-0">
                    <div class="row daterange">
                      <div class="col-6">
                        <small><label for="inputDate1" class="form-label required">起始時間</label></small>
                        <input type="text" id="inputDate1" placeholder="起始時間" class="form-control" />
                      </div>
                      <div class="col-6">
                        <small><label for="inputDate2" class="form-label required">結束時間</label></small>
                        <input type="text" id="inputDate2" placeholder="結束時間" class="form-control" />
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
    
            <div class="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
              <fieldset class="payment-fieldset col-12 col-md-10">
                <legend class="payment-lengend">提案人資訊</legend>
                <div class="mb-3 mb-md-5">
                  <label for="proposalLeader" class="form-label required">提案負責人</label>
                  <input type="text" class="form-control" id="proposalLeader" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="proposalUnit" class="form-label required">提案單位</label>
                  <input type="text" class="form-control" id="proposalUnit" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="Introduction" class="form-label required">提案人/團隊介紹</label>
                  <input type="text" class="form-control" id="Introduction" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="email" class="form-label required">聯絡信箱</label>
                  <input type="email" class="form-control" id="email" required />
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="tel" class="form-label required">連絡電話</label>
                  <input type="tel" class="form-control" id="tel" required />
                </div>
              </fieldset>
            </div>
          </div>

          {/* <div class="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
            <div class="col-12 col-md-10">
              <div class="p-5 p-sm-8 p-md-10 border">
                <h2 class="mb-5">專案基本資訊</h2>
                <div class="mb-3 mb-md-5">
                  <label for="projectName" class="form-label">專案名稱<%- include('./layout/importantDeco'); -%></label>
                  <input type="text" class="form-control p-3" id="projectName" placeholder="專案名稱">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="projectType" class="form-label">專案類型<%- include('./layout/importantDeco'); -%></label>
                  <input type="text" class="form-control p-3" id="projectType" placeholder="專案類型">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="projectdIntroduction" class="form-label">專案簡介<%- include('./layout/importantDeco'); -%></label>
                  <input type="text" class="form-control p-3" id="projectdIntroduction" placeholder="專案簡介">
                  <p>限制30字</p>
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="target" class="form-label">目標金額<%- include('./layout/importantDeco'); -%></label>
                  <input type="text" class="form-control p-3" id="target" placeholder="目標金額">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="time" class="form-label">募資時間<%- include('./layout/importantDeco'); -%></label>
                  <input type="time" class="form-control p-3" id="time" placeholder="募資時間">
                </div>
              </div>
            </div>
          </div> */}

          {/* <div class="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
            <div class="col-12 col-md-10">
              <div class="p-5 p-sm-8 p-md-10 border">
                <h2 class="mb-5">提案人資訊</h2>
                <div class="mb-3 mb-md-5">
                  <label for="text" class="form-label">提案負責人<%- include('./layout/importantDeco'); -%></label>
                  <input type="text" class="form-control p-3" id="text" placeholder="提案負責人">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="proposalUnit" class="form-label">提案單位</label>
                  <input type="text" class="form-control p-3" id="proposalUnit" placeholder="提案單位">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="Introduction" class="form-label">提案人/團隊介紹</label>
                  <input type="text" class="form-control p-3" id="Introduction" placeholder="提案人/團隊介紹">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="email" class="form-label">聯絡信箱<%- include('./layout/importantDeco'); -%></label>
                  <input type="email" class="form-control p-3" id="email" placeholder="聯絡信箱">
                </div>
                <div class="mb-3 mb-md-5">
                  <label for="tel" class="form-label">連絡電話<%- include('./layout/importantDeco'); -%></label>
                  <input type="tel" class="form-control p-3" id="tel" placeholder="連絡電話">
                </div>
              </div>
            </div>
          </div>  */}
        </form>
        <a href="completeProposal.html" class="btn btn-primary fw-bolder py-3 px-5 w-100 w-md-auto">送出</a>
      </div>
    </>
  )
}