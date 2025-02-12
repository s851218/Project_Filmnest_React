import { useEffect, useState } from 'react';
import axios from 'axios';

function AboutStudio() {
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
              {/* <img src={studioImageUrl} alt="" /> */}
              <img src="https://images.unsplash.com/photo-1739036462754-6e86520998a2?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{height:264 , width:264}}/>
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
    </>
  )
};

export default AboutStudio;

