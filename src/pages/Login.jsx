import { Link } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "../slice/userSlice";
import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(`${apiBase}/login`, userData);
      const { accessToken, user } = response.data;
      console.log(user);

      dispatch(
        setLogin({
          token: accessToken,
          userId: user.id,
          userName: user.userProfile.userName,
          imageUrl: user.userProfile.userImageUrl,
        })
      );
      alert("登入成功");
      reset;
      navigate("/");
    } catch (error) {
      const { data, status } = error.response;
      if (status === 400 && data === "Cannot find user") {
        alert("帳號不存在");
      } else if (status === 400 && data === "Incorrect password") {
        alert("密碼錯誤");
      } else {
        alert("登入失敗");
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
                  <img src="https://s3-alpha-sig.figma.com/img/6806/7dc6/46c3528958e7f331d055e6b735d0d032?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dcUMQHlNPnocApZUB-IoLwbV0Jc9I6zT-DKxe68~D42-srCcOI85lAh1izVgwxpFxdUnvp6cEsA3vFurtQEiuvhalqbvUqqIaAErfALufIPU1OHagAKGbQCOg7zX6iXsYHrBwUVk6IuG0IcrNNB8m2UsB1qZwF3hN99h3JvxWAZoDIeHo3~IF25TGgAN7z8O3XRWwN79gPtRf05px4ejkb2ypRQwI7gOow7E3XcsSR~2QA1otLJABr0ergLE-h5f18rjdqwpE8v2SFijgT9NUFljNQ1MbU9QGYgvMOm1TPcZkxaF2e-AzyyPriBgCLGMQHZ0ty3uJxcPb3w9NjiGfg__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} /> 使用 facebook 帳號繼續
                </button>
                <button type="button" className="btn btn-success w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="https://s3-alpha-sig.figma.com/img/d7bc/c6e0/6c2c184012a38a8dbf129cae0d16b308?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=garJ2hqup~CW0U1f8Xvz~FF3j2Flt9qo-lCZ-HJTxH28v-4qaHLxIuwSqW6pixqqvnDGI4WlOpXcJCZ9L~HV9wEWU5AwO-FxiDY9OYepQd5v5Y1ePDw8rWSwa71mZ1aUCy5trO2CL1zb8KPzC~YUoiQnq0~PnZ~TPA3khwqZC5wqtQA6eZcRpCzh0UtBRpoQcQszYDwqW6KRMugOhSbZsDtHr-TyUihwTGettAOZsd09W3vhX0MESc6hn2343DYlYKhXvnUqTmfS4zizzUP6-XwjcgBcJf7iuXNXgB2qvvxhG8CfK3HL1tPLEhcLCyhgd-gcmqZySIPSmm9ul~lEGg__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} />
                  使用 Line 帳號繼續
                </button>
                <button type="button" className="btn btn-light w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="https://s3-alpha-sig.figma.com/img/fd6c/8c0e/a0b4a34ebb9bf63926751b620f06967d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DdqtMYEPUzvRinbJpNKtqUH54ryvPzKjf~43En4Qvdmd4dsT0SS1zcSsF9WX-~QFq33oSMVTd50yS5E9~u3xyP94SBfXG3QG5A0JhqDjzN5ucNJRFMz-ZAOYaGhUsojsv1H1rEX7ucvvyq0y7bMf5XTY7xmVlkE9NhfGqMjqMLlZelYf974t-9dZ31UcK3eM9qOflexidyopiKerC5TtQ3sC~zx6ZZwqCe4UBn-Ym0spUApoA5e2azl-JUfrWs9Ifd1hl-gemT9wjikETsI3LlDDYF7fTZJ3h-YPdbfBiji~HXDoMohT1EHp5cJRJW9ePp3wCrQ-XBdxWFrUXJygtQ__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} />
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
