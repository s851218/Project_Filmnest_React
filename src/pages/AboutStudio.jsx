import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutStudio() {
  // 提案者資料
  const [ studioProfile , setStudioProfile ] = useState({})

  const getStudioProfile = async() => {
    try {
      const res = await axios.get("https://json-server-vercel-tdcc.onrender.com/studios")
      const studioProfile = res.data[0].studioProfile
      setStudioProfile(studioProfile)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(studioProfile)

  useEffect(() => {
    getStudioProfile()
  },[])
  
  console.log(studioProfile)

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
    email,
    endTime,
    groupName,
    personResponsible,
    phone,
    startTime,
    studioFb,
    studioIg,
    studioImageUrl,
    studioLine,
    teamIntro
  } = studioProfile
  
  return (
    <>
      <div className="container mt-20">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="d-flex">
              <img src={studioImageUrl} alt="" style={{height:264 , width:264}}/>
              <div className="ms-8 w-100">
                <div className="mb-5">
                  <h3>{groupName}</h3>
                  <span>{personResponsible}</span>
                </div>
                <div className="border rounded-1 p-3">
                  <div className="d-flex justify-content-between">
                    <p>聯絡我們</p>
                    <div>
                      <span>{studioFb}</span>
                      <span className="mx-2">{studioIg}</span>
                      <span>{studioLine}</span>
                    </div>
                  </div>
                  <div>{phone}</div>
                  <div>{email}</div>
                  <div><span>{startTime}</span> ~ <span>{endTime}</span></div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>{teamIntro}</p>
            </div>
          </div>
        </div>
      </div>


      <section className="aboutproposal">
        <div className="container py-10 py-lg-20 mt-10 mt-lg-15">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="d-flex flex-column flex-lg-row align-items-center mb-6 mb-lg-10">
                <div className="mb-5 mb-lg-0 me-0 me-lg-5">
                  <img src="/assets/images/遠端對話劇照/遠端對話導演照/導演照1.jpg" style={{width: 300}} alt="account" />
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <h2>春日影像製作Spring Film</h2>
                    <p className="fs-6 d-flex align-items-center"><span className="material-symbols-outlined text-white fs-4 me-2">groups</span>周先生</p>
                  </div>
                  <div>
                    <h3 className="fs-5">聯絡我們</h3>
                    <div className="d-flex justify-content-between">
                      <ul className="list-unstyled">
                        <li>聯絡電話:<a href="tel:+123456789">01-23456789</a></li>
                        <li>聯絡信箱:<a href="https://example.com">example@gmail.com</a></li>
                        <li>服務時間:09:00~17:00</li>
                      </ul>
                      <ul className="list-unstyled d-flex align-self-end">
                        <li><a href="#"><i className="bi bi-facebook fs-6 social-media-hover"></i></a></li>
                        <li className="mx-2"><a href="#"><i className="bi bi-instagram fs-6 social-media-hover"></i></a></li>
                        <li><a href="#"><i className="bi bi-line fs-6 social-media-hover"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-primary-8 border border-3 border-white">
                <h3 className="fs-7 mb-2">導演/攝影 周禹丞</h3>
                <p className="mb-0">
                  畢業於世新大學廣播電視電影學系電影組,現就讀國立臺北藝術大學電影創作學系研究所導演組。<br />
                  善於觀察溫柔情感和人際關係的鏡頭捕捉,近年來從紀錄片創作中找到極大樂趣。希望能藉由更多的影像創作中找到真實且精彩的人生。攝影作品數部橫跨MV、廣告、形象、紀錄/劇情短片各類商業及藝術領域。<br />
                  最新創作紀錄短片《遠端對話》(2022)在三級警戒疫情下的臺北,一位香港職業演員被困在永和的隔離生活,紀錄了三個月中他與唯一在遠方的親人,靠著視訊互相依偎的溫馨感人故事。此片榮獲2022年南方影展「疫情一天單元」首獎、中華電信MOD金片子競賽——蹲點台灣紀錄片佳作、第四屆福爾摩沙國際電影節榮獲「最佳療癒疫情短片」以及韓國阿波里亞國際電影節紀錄短片類入圍。過去劇情片導演作品《晃遊》(2020)也曾入圍新北市學生影像新星獎、洛杉磯Ourfest酷兒影展、韓國、香港多國同志電影節。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-3 bg-primary-8">
        <div className="container">
          <ul className="list-unstyled mb-0 d-flex gap-8 justify-content-around align-items-center">
            <li>
              <a className="nav-link py-3 fs-7 fs-lg-3 <%= page === 'aboutProposal-now' ? 'border-white ' : '' %>" href="aboutProposal-now.html">進行中</a>
            </li>
            <li>
              <a className="nav-link py-3 fs-7 fs-lg-3 <%= page === 'aboutProposal-fin' ? 'border-white ' : '' %>" href="aboutProposal-fin.html">已結案</a>
            </li>
            <li>
              <a className="nav-link py-3 fs-7 fs-lg-3 <%= page === 'aboutProposal-other' ? 'border-white ' : '' %>" href="aboutProposal-other.html">其他作品集</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}