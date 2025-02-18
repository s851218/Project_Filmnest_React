import { Link } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  // 使用 useWatch 監聽 password 欄位的值
  const password = useWatch({ control, name: "password", defaultValue: "" });

  const navigate = useNavigate();
  const signUp = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      userProfile: {
        userName: data.userName,
        nickName: "",
        phone: "",
        birthdate: "",
        bio: "",
        userImageUrl: `https://ui-avatars.com/api/?name=${data.userName}&background=0D8ABC&color=fff&size=40&rounded=true&length=1`,
      },
      hasStudio: false,
    };
    try {
      await axios.post(`${apiBase}/signUp`, userData);
      alert("註冊成功");
      reset;
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-bg">
      <div className="container pt-20 pb-10">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="mx-auto" style={{ width: "216px" }}>
              <h1 className="text-center h6 lh-base mb-6 border-bottom border-2 py-3">會員註冊</h1>
            </div>
            <div className="bg-primary-9 py-10 px-30 mb-20 rounded-2">
              <div className="mb-10 text-center">
                <p className="mb-0">
                  已經有帳號?
                  <Link to="/login" className="ms-2 border-bottom">
                    立即登入
                  </Link>
                </p>
              </div>
              <div className="mb-10">
                <button type="button" className="btn btn-info text-light w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="https://s3-alpha-sig.figma.com/img/6806/7dc6/46c3528958e7f331d055e6b735d0d032?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=q9tsI7AMQt1fajG9QbbHnKldvnTrDeGWV3Zt3A~xp~c~Yv9x71R7a9TbMcl2x8KLRlzP0PGiBfvomrRx1OnNOXdH5lPGD7a6o7b6NOq46bYZV9Wno~n4U1UlIVLay9-oqy4m1vAU9~qGR7NXOrTaXmXu8wwcJIZLPigrTgzipIPSoiHOhmy3Y4NaFNQ~V0ERV0rSiovwzYzsV8g0I0-JM6G61ex8hG2QbshGt3vlbJXFokYdCmrXCYrgHumXQBOsM7cu5GtJvARhDZqHYr8MZwRCxZAlnO9FkK0Qy0BV173TZhEBiJ0q4kYEoAsPC1nx9KQdYwQPWkZWhWJ-1wH~gw__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} /> 使用 facebook 帳號繼續
                </button>
                <button type="button" className="btn btn-success w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="https://s3-alpha-sig.figma.com/img/d7bc/c6e0/6c2c184012a38a8dbf129cae0d16b308?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mpYpIi3o7pZ-ypl582xuSMNhvDr7aFdDj4gMlFpgn8X3Yhy6Y5gN15n3dfhTojsTtSfCrzqzjyqKsUcY0VnmEAy9TX6FQA34sO8-aCWNb8GF9iym5AtRooMQAceDH~cznVfLWXtCsr5hR-UIdLIvXGfPQlqkfNlZw-lzV8ChKZQC8EgdaYyXDtrXmPEL3iidxWO9Ij9GYEMXJXTJtqw82xT2HcHmkvZFhabmYt1U0VNM05~1ko~tu5knBpAAE5xcKoeaib38Mqj69xCX1W6XJb0CsUGC5iQ4e4YYgxaTdqe3MEVmck1NCvTezVv3SadD98AimXP46-8JXiYJYsGl1Q__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} />
                  使用 Line 帳號繼續
                </button>
                <button type="button" className="btn btn-light w-100 rounded-4 fw-bolder mb-5 py-2">
                  <img src="https://s3-alpha-sig.figma.com/img/fd6c/8c0e/a0b4a34ebb9bf63926751b620f06967d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dGYm84Uh1ZppA0cAWYDzPlXzKFpb-S36GdaN6tPl6Ai94xtukc7Jw8nwo5to-VLCl0LsLeGjemqe3ZtW2pF2-hAgjtU2lrfRmmGQcS4L6WowBwxRcO1tPCaf4bu6Pld4B0vf6Liq8TdpjQ5ojiVGW6pqBRTbMfGLfazClHS-en1GIDR38t9aTuicxCmcomvurdw-OUY5slyfDkXnjoaOZLQLVMljN5Xm4y8uEIruC8Q2ahIwIAUtzGpYgYA3bcC16O8c3rwDfikgxFnBh8X-MwRHaVW-G7AZBTw5TOoR9ucrZWcslwaFo3auR0VvobODrm9WrLab3M7XzZ33tz46JA__" alt="fb" className="me-2 " style={{ width: "24px", height: "24px" }} />
                  使用 Google 帳號繼續
                </button>
              </div>
              <div className="mb-10">
                <div className="d-flex align-items-center my-3">
                  <div className="flex-grow-1 border-top border-white"></div>
                  <span className="mx-3 fw-bold">或註冊 FilmNest 影巢帳號</span>
                  <div className="flex-grow-1 border-top border-white"></div>
                </div>
              </div>
              <form className="" onSubmit={handleSubmit(signUp)}>
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
                  <label htmlFor="userName" className="mb-2">
                    姓名
                  </label>
                  <input
                    id="userName"
                    type="text"
                    className={`form-control ${errors.userName && "is-invalid"}`}
                    placeholder="請輸入真實姓名"
                    {...register("userName", {
                      required: {
                        value: true,
                        message: "姓名為必填!",
                      },
                    })}
                  />
                  {errors.userName && <div className="invalid-feedback text-danger">{errors.userName.message}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="mb-2">
                    密碼
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    placeholder="請輸入密碼(至少8個字元)"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "密碼為必填!",
                      },
                      minLength: {
                        value: 8,
                        message: "長度不得少於8碼",
                      },
                    })}
                  />
                  {errors.password && <div className="invalid-feedback text-danger">{errors.password.message}</div>}
                </div>
                <div className="mb-10">
                  <label htmlFor="passwordCheck" className="mb-2">
                    再次輸入密碼
                  </label>
                  <input
                    id="passwordCheck"
                    type="password"
                    className={`form-control ${errors.passwordCheck && "is-invalid"}`}
                    placeholder="再次輸入密碼"
                    {...register("passwordCheck", {
                      required: {
                        value: true,
                        message: "再次輸入密碼為必填!",
                      },
                      validate: (value) => value === password || "再次輸入的密碼不一致!",
                    })}
                  />
                  {errors.passwordCheck && <div className="invalid-feedback text-danger">{errors.passwordCheck.message}</div>}
                </div>
                <div>
                  <button type="submit" className="btn btn-primary form-control py-3 mb-5">
                    註冊
                  </button>
                  <p className="text-center">
                    註冊後即代表你同意
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
