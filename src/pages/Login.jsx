import { Link, useLocation } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "../slice/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { Toast, Alert } from "../assets/js/costomSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Login() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const location = useLocation();
  // 如果有來源頁面，就回到來源頁面(收藏未登入，登入後導回專案介紹頁)；沒有來源頁面的話，導回首頁
  const redirectTo = location.state?.from || "/";

  const dispatch = useDispatch();

  const login = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(`${apiBase}/login`, userData);
      const { accessToken, user } = response.data;
      document.cookie = `loginToken=${accessToken}`;
      await axios.patch(`${apiBase}/users/${user.id}`, { token: accessToken });
      dispatch(
        setLogin({
          token: accessToken,
          hasStudio: user.hasStudio,
          userId: user.id,
          userName: user.userProfile.userName,
          imageUrl: user.userProfile.userImageUrl,
        })
      );
      Toast.fire(
        {
          icon: "success",
          title: "登入成功",
        },
        navigate(redirectTo)
      );
      //  登入成功後導回來源頁面，沒有來源頁面，導回首頁
      reset;
      // navigate("/");
    } catch (error) {
      const { data, status } = error.response;
      if (status === 400 && data === "Cannot find user") {
        Alert.fire({
          icon: "error",
          title: "帳號不存在",
        });
      } else if (status === 400 && data === "Incorrect password") {
        Alert.fire({
          icon: "error",
          title: "密碼錯誤",
        });
      } else {
        Alert.fire({
          icon: "error",
          title: "登入失敗",
        });
      }
    }
  };
  return (
    <div className="login-bg">
      <div className="container pt-20 pb-10">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="mx-auto" style={{ width: "216px" }}>
              <h1 className="text-center h6 lh-base mb-6 border-bottom border-2 py-3">會員登入</h1>
            </div>
            <div className="bg-primary-9 py-10 px-3 px-lg-30 mb-20 rounded-2">
              <div className="mb-10 text-center">
                <p className="mb-0">
                  是新朋友嗎?
                  <Link to="/signUp" className="ms-2 border-bottom">
                    立即註冊
                  </Link>
                </p>
              </div>
              <div className="mb-10">
                <button type="button" className="btn btn-info text-light w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="46c3528958e7f331d055e6b735d0d032.png" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} /> 
                  使用 facebook 帳號繼續
                </button>
                <button type="button" className="btn btn-success w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="6c2c184012a38a8dbf129cae0d16b308.png" alt="Line" className="me-2 " style={{ width: "24px", height: "24px" }} />
                  使用 Line 帳號繼續
                </button>
                <button type="button" className="btn btn-light w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="a0b4a34ebb9bf63926751b620f06967d.png" alt="Google" className="me-2 " style={{ width: "24px", height: "24px" }} />
                  使用 Google 帳號繼續
                </button>
              </div>
              <div className="mb-10">
                <div className="d-flex align-items-center my-3">
                  <div className="flex-grow-1 border-top border-white"></div>
                  <span className="mx-3 fw-bold">或使用 FilmNest 影巢帳號登入</span>
                  <div className="flex-grow-1 border-top border-white"></div>
                </div>
              </div>
              <form className="" onSubmit={handleSubmit(login)}>
                <div className="mb-5">
                  <label htmlFor="email" className="mb-2">
                    帳號
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email && "is-invalid"}`}
                    placeholder="請輸入Email電子信箱"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "帳號為必填!",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email 格式不正確",
                      },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback text-danger">{errors.email.message}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="mb-2">
                    密碼
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="請輸入密碼"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "密碼為必填!",
                      },
                    })}
                  />
                  {errors.password && <div className="invalid-feedback text-danger">{errors.password.message}</div>}
                </div>
                <div className="mb-10 text-end">
                  <span className="fs-sm mb-3 mb-lg-5 ms-auto border-bottom">忘記密碼</span>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary form-control py-3 mb-5">
                    登入
                  </button>
                  <p className="text-center">
                    登入後即代表你同意
                    <span className="border-bottom">服務條款</span>及<span className="border-bottom">隱私權政策</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
