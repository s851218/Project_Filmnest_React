import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutStudio() {
  // 提案者資料
  const [ studioProfile , setStudioProfile ] = useState({})
  // 取得提案者資料
  const getStudioProfile = async() => {
    try {
      const res = await axios.get("https://json-server-vercel-tdcc.onrender.com/studios")
      const studioProfile = res.data[0].studioProfile
      setStudioProfile(studioProfile)
    } catch (error) {
      console.log(error)
    }
  }

  // 元件初始化
  useEffect(() => {
    getStudioProfile()
  },[])

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
      <div className="container mt-20 pb-15">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="border-bottom border-primary-4 pb-8 mb-8">
              <div className="row flex-md-row flex-column">
                <div className="col-lg-4 col-md-5 text-center">
                  <img src={studioImageUrl} className="img-fluid" style={{height:264 , width:264}} alt={groupName}/>
                </div>
                <div className="col-lg-8 col-md-7">
                  <div className="d-flex flex-column h-100">
                    <h3 className="fs-6 fs-md-4 mb-3">{groupName}</h3>
                    <p className="fs-sm"><i className="bi bi-person" />{personResponsible}</p>
                    <div id="connectUs" className="rounded-1 p-4 mt-auto" style={{background: "#FFFFFF1A",border: "1px solid #606060"}}>
                      <div className="d-flex justify-content-between mb-2">
                        <h3 className="fs-sm mb-0">聯絡我們</h3>
                        <ul className="list-unstyled d-flex align-self-end mb-0">
                          <li><a href={studioFb}><i className="bi bi-facebook fs-base social-media-hover"></i></a></li>
                          <li className="mx-2"><a href={studioIg}><i className="bi bi-instagram fs-base social-media-hover"></i></a></li>
                          <li><a href={studioLine}><i className="bi bi-line fs-base social-media-hover"></i></a></li>
                        </ul>
                      </div>
                    
                      <div className="d-flex justify-content-between">
                        <ul className="list-unstyled mb-0">
                          <li className="fs-sm mb-1"><a href={`tel:${phone}`}><i className="bi bi-telephone" /> {phone}</a></li>
                          <li className="fs-sm mb-1"><a href={email}><i className="bi bi-envelope" /> {email}</a></li>
                          <li className="fs-sm"><i className="bi bi-clock" /> {startTime}~{endTime}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="teamIntro">
              <h3 className="fs-7 mb-3 d-flex align-items-center">
                <span className="me-2">。{personResponsible}</span>
                <span className="fs-sm fw-normal">導演/攝影</span>
              </h3>
              <p className="mb-0">
                {teamIntro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}