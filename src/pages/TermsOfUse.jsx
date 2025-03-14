import { useEffect } from "react";
import { Link } from "react-router";

const data = [
  {
    title: "一、服務介紹",
    contents: [
      "歡迎使用影巢募資平台，我們致力於為創業者和支持者提供一個安全、透明的募資平台。",
      "通過我們的平台，創業者可以展示他們的項目並尋求資金支持，而支持者則能夠探索和投資於他們感興趣的項目。",
    ],
  },
  {
    title: "二、註冊與帳戶管理",
    contents: [
      "註冊要求：用戶需年滿18歲並擁有有效的電子郵件地址進行註冊。",
      "帳戶安全：用戶應妥善保管自己的帳戶資訊和密碼，對於帳戶內發生的所有活動負責。",
    ],
  },
  {
    title: "三、募資項目",
    contents: [
      "項目提交：創業者需要提供詳細的項目描述，包括但不限於項目目標、預算需求、計劃進度等。",
      "內容審核：所有提交的項目將經過我們的審核流程，以確保其真實性和合法性。",
      "募資目標：每個項目必須設定具體的募資目標金額，並在指定時間內達成。",
    ],
  },
  {
    title: "四、資金處理",
    contents: [
      "資金撥付：成功達成募資目標的項目，資金將按照預定的撥付計劃發放給創業者。",
      "退款政策：如項目未能達成募資目標，所有支持者的資金將全額退還至其原支付方式。",
    ],
  },
  {
    title: "五、用戶責任",
    contents: [
      "誠實性：創業者需提供真實準確的項目信息，不得虛假宣傳或誤導支持者。",
      "合規性：所有募資活動必須符合相關法律法規，禁止非法用途。",
    ],
  },
  {
    title: "六、隱私與數據保護",
    contents: [
      "我們致力於保護用戶的個人資訊。所有數據將依照我們的隱私政策進行處理，不會未經授權向第三方披露。",
    ],
  },
  {
    title: "七、服務條款的變更",
    contents: [
      "我們保留隨時更新或修改條款的權利,變更將在平台上公告。用戶應定期查閱條款以了解最新規定。",
    ],
  },
  {
    title: "八、聯繫方式",
    contents: [
      "如有任何疑問或需進一步協助，請聯繫我們的客服團隊：[客服信箱]，[客服電話]。",
    ],
    email: "service@filmnest.com",
    tel: "01-2345678",
  },
];

export default function TermsOfUse() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <h1 className="text-center mb-5 mb-sm-8 mb-md-10">募資平台條款說明</h1>
        <div className="row justify-content-center mb-5 mb-sm-8 mb-md-10 text-start">
          <div className="col-12 col-md-10">
            <ul className="list-unstyled p-5 p-sm-8 p-md-10 border">
              {data.map(({ title, contents }, index) => (
                <li key={index}>
                  <h2 className="fs-6">{title}</h2>
                  {contents.map((content, index) => (
                    <>
                      <p
                        key={index}
                        className={`${index + 1 !== contents.length && "mb-0"}`}
                      >
                        {content}
                      </p>
                    </>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          to="/createProposal"
          className="btn btn-primary fw-bolder py-3 px-5 w-100 w-md-auto"
        >
          我要提案
        </Link>
      </div>
    </>
  );
}
