import { useEffect, useState } from 'react';
import { useForm , useWatch } from 'react-hook-form'
import axios from 'axios';

function StudioProfile() {

  const [ formValue , setFormValue ] = useState({})
  
  const {
    register,
    handleSubmit,
    formState: {error},
    control,
    watch,
  } = useForm({
    defaultValues: async() => {
      try {
        const res = await axios.get("https://json-server-vercel-tdcc.onrender.com/studios")
        const defaultValues = {
          ...res.data[0].studioProfile,
          studioImageUrl: "https://images.unsplash.com/photo-1739036462754-6e86520998a2?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        
        setFormValue(defaultValues)
        
        return defaultValues

      } catch (error) {
        console.log(error)
      }
    }
  });

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload",file);

    try {
      const res = await axios.post("api_path" , formData)
      const imageUrl = res.data.imageUrl

      setFormValue({
        ...formValue,
        studioImageUrl: imageUrl
      })

      e.target.value = null
    } catch (error) {
      console.log(error);
    }
  }
  
  // const watchForm = useWatch({
  //   control
  // })
  // useEffect(()=>{
  //   console.log(watchForm)
  // },[watchForm])

  return (
    <>
      <div className="vh-100 py-20">
        <div className="container">
          <form className="row">
            <div className="col-4">
              {/* <img src="https://images.unsplash.com/photo-1739036462754-6e86520998a2?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
              <img src={formValue.studioImageUrl} alt="" />
              <label htmlFor="studioImageUrl" className="form-label"></label>
              <input name="studioImageUrl" type="file" className="form-control mt-3" id="studioImageUrl" onChange={handleFileChange}/>
              <button type="button" className="btn btn-outline-primary-5 w-100 mt-3">上傳圖片</button>
            </div>
            <div className="col-8">
              <div className="row g-5 mb-5">
                <div className="col-6">
                  <label htmlFor="" className="form-label">團隊名稱</label>
                  <input
                    name="groupName" type="text" className="form-control" id="" 
                    {...register("groupName")}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="form-label">負責人</label>
                  <input
                    type="text" className="form-control" id=""
                    {...register("personResponsible")}
                  />
                </div>
              </div>

              <div className="row g-5 mb-5">
                <div className="col-6">
                  <label htmlFor="" className="form-label">聯絡信箱</label>
                  <input
                    type="email" className="form-control" id=""
                    {...register("email")}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="" className="form-label">聯絡電話</label>
                  <input
                    type="tel" className="form-control" id=""
                    {...register("phone")}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="" className="form-label">服務時間</label>
                <input
                    type="datetime-local" className="form-control" id=""
                    // {...register("startTime")}
                  />
              </div>

              <div className="d-flex flex-column mb-5">
                <label htmlFor="" className="form-label">團隊簡介</label>
                <textarea
                  name="text" id="" rows={5} className="form-control"
                  {...register("teamIntro")}
                />
              </div>

              <div className="mb-5">
                <h5 className="fs-base fw-normal">社群媒體</h5>
                <div className="input-group">
                  <div className="input-group-text w-100 border-bottom-0 rounded-bottom-0">
                    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                    <span className="text-black mx-5 text-start" style={{width:120}}>Facebook</span>
                    <input
                      type="text" className="form-control" aria-label="Text input with checkbox" 
                      {...register("studioFb")}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-text w-100 rounded-0">
                    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                    <span className="text-black mx-5 text-start" style={{width:120}}>Instagram</span>
                    <input
                      type="text" className="form-control" aria-label="Text input with checkbox"
                      {...register("studioIg")}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-text w-100 border-top-0 rounded-top-0">
                    <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                    <span className="text-black mx-5 text-start" style={{width:120}}>LINE</span>
                    <input
                      type="text" className="form-control" aria-label="Text input with checkbox"
                      {...register("studioLine")}
                    />
                  </div>
                </div>
              </div>

            </div>
          </form>

        </div>
      </div>  
    </>
  )
};

export default StudioProfile;