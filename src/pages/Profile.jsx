import { useForm } from "react-hook-form";
import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { setLogin } from "../slice/userSlice";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { Alert, Toast } from "../assets/js/costomSweetAlert";
import { useNavigate } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Profile() {
  // 路由跳轉至專案介紹頁時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [file, setFile] = useState(null);
  const id = useSelector((state) => state.user.profile.userId);
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 圖片處理
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const profileData = {
      userProfile: {
        userName: data.userName,
        nickName: data.nickName,
        phone: data.phone,
        birthdate: data.birthdate,
        bio: data.bio,
        userImageUrl: file,
      },
    };
    try {
      await axios.patch(`${apiBase}/users/${id}`, profileData);
      dispatch(setLogin({ ...profile, imageUrl: file }));
      Toast.fire({
        icon: "success",
        title: "修改成功",
      });
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "修改失敗",
        });
      }
    }
  };

  const getUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiBase}/users/${id}`);
      setUserProfile(response.data.userProfile);
      setUserEmail(response.data.email);
      setFile(response.data.userProfile.userImageUrl);
      setValue("userName", response.data.userProfile.userName);
      setValue("nickName", response.data.userProfile.nickName);
      setValue("phone", response.data.userProfile.phone);
      setValue("birthdate", response.data.userProfile.birthdate);
      setValue("bio", response.data.userProfile.bio);
      setValue("userImageUrl", response.data.userProfile.userImageUrl);
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "取得使用者資料失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, setValue]);
  useEffect(() => {
    getUserProfile();
  }, [id, getUserProfile]);

  return (
    <>
      <div className="container container-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="justify-content-between align-items-center mb-7 d-none d-lg-flex">
            <h1 className="fs-6">編輯個人資料</h1>
            <button className="d-flex align-items-center btn btn-primary py-3 px-4">
              <span className="fs-sm fw-bolder me-2">儲存</span>
              <span className="material-symbols-outlined align-bottom fs-7">check</span>
            </button>
          </div>
          <div className="bg-primary-8 rounded-lg-4 d-flex flex-column flex-lg-row align-items-center p-3 p-lg-10">
            <div className="d-block d-lg-none w-100 mb-5">
              <PersonalCenterSidebar />
            </div>
            <div className="me-lg-11">
              <div className="mb-3">
                <div style={{ width: "280px", height: "280px" }} className="mb-5">
                  <img src={file} alt="" className="object-fit-cover h-100" />
                </div>
                <input type="file" id="inputFile" className="d-none" onChange={handleFileChange} />
                <label htmlFor="inputFile" className="btn btn-primary-9 border d-flex justify-content-center align-items-center w-100">
                  <span>選擇檔案</span>
                  <span className="material-symbols-outlined ms-1 fs-7">folder</span>
                </label>

                <input type="file" className="d-none" id="formFile" />
              </div>
            </div>
            <div className="container">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    帳號
                  </label>
                  <input type="email" className="form-control bg-primary-4" defaultValue={userEmail} id="inputEmail4" disabled />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    密碼
                  </label>
                  <button type="button" className="btn btn-primary-9 border d-flex align-items-center py-2 px-4" onClick={() => navigate("/personalCenter/profilePassword")}>
                    <span className="fs-sm">變更密碼</span>
                    <span className="material-symbols-outlined ms-1 fs-base ">edit</span>
                  </button>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputAddress" className="form-label">
                    真實姓名
                  </label>
                  <input
                    type="text"
                    defaultValue={userProfile.userName}
                    className={`form-control bg-primary-9 ${errors.userName && "is-invalid"}`}
                    id="inputAddress"
                    placeholder="請輸入您的真實姓名"
                    {...register("userName", {
                      required: {
                        value: true,
                        message: "姓名不得為空白",
                      },
                    })}
                  />
                  {errors?.userName?.message && <div className="invalid-feeback text-danger">{errors.userName.message}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputAddress2" className="form-label">
                    暱稱
                  </label>
                  <input type="text" defaultValue={userProfile.nickName} className={`form-control bg-primary-9 ${errors.nickName && "is-invalid"}`} id="inputAddress2" placeholder="請輸入您的暱稱" {...register("nickName")} />
                  {errors?.nickName?.message && <div className="invalid-feeback text-danger">{errors.nickName.message}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress3" className="form-label">
                    聯絡電話
                  </label>
                  <input type="tel" defaultValue={userProfile.phone} className={`form-control bg-primary-9 ${errors.phone && "is-invalid"}`} id="inputAddress3" placeholder="請輸入您的聯絡電話" {...register("phone")} />
                  {errors?.phone?.message && <div className="invalid-feeback text-danger">{errors.phone.message}</div>}
                </div>
                <div className="col-6">
                  <label htmlFor="inputAddress4" className="form-label">
                    出生日期
                  </label>
                  <input type="date" defaultValue={userProfile.birthdate} className={`form-control bg-primary-9 ${errors.birthdate && "is-invalid"}`} id="inputAddress4" placeholder="請輸入您的出生日期" {...register("birthdate")} />
                  {errors?.birthdate?.message && <div className="invalid-feeback text-danger">{errors.birthdate.message}</div>}
                </div>
                <div className="col">
                  <label htmlFor="inputAddress5" className="form-label">
                    自我介紹
                  </label>
                  <textarea defaultValue={userProfile.bio} className={`form-control bg-primary-9 ${errors.bio && "is-invalid"}`} rows="4" id="inputAddress5" placeholder="請簡單介紹一下自己" {...register("bio")} />
                  {errors?.bio?.message && <div className="invalid-feeback text-danger">{errors.bio.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary py-3 px-4 d-block d-lg-none w-100 mt-4">
                  <span className="fs-sm fw-bolder me-2">儲存</span>
                  <span className="material-symbols-outlined align-bottom fs-7">check</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
