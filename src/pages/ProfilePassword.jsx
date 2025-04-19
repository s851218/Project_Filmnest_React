import { useForm, useWatch } from "react-hook-form";
import { Alert, Toast } from "../assets/js/costomSweetAlert";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const apiBase = import.meta.env.VITE_API_BASE;

export default function ProfilePassword() {
  const userId = useSelector((state) => state.user.profile.userId);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const newPassword = useWatch({ control, name: "newPassword", defaultValue: "" });

  const onSubmit = async (data) => {
    const passwordData = {
      password: data.newPassword,
    };
    try {
      await axios.patch(`${apiBase}/users/${userId}`, passwordData);
      Toast.fire({
        icon: "success",
        title: "更新密碼成功",
      });
      navigate(-1);
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "更新密碼失敗",
        });
      }
    }
  };


  return (
    <>
      <div className="container container-lg">
        <div className="row row-lg">
          <div className="col-lg-8">
            <div className="mb-20">
              <h1 className="fs-6">變更密碼</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label className="mb-1" htmlFor="password">輸入舊密碼</label>
                <input
                  id="password"
                  className={`form-control ${errors.oldPassword && "is-invalid"}`}
                  type="password"
                  {...register("oldPassword", {
                    required: {
                      value: true,
                      message: "舊密碼為必填!",
                    },
                  })}
                />
                {errors.oldPassword && <div className="invalid-feedback text-danger">{errors.oldPassword.message}</div>}
              </div>
              <div className="mb-5">
                <label className="mb-1" htmlFor="newPassword">輸入新密碼</label>
                <input
                  id="newPassword"
                  className={`form-control ${errors.newPassword && "is-invalid"}`}
                  type="password"
                  placeholder="請輸入密碼(至少8個字元)"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "新密碼為必填!",
                    },
                    minLength: {
                      value: 8,
                      message: "長度不得少於8碼",
                    },
                  })}
                />
                {errors.newPassword && <div className="invalid-feedback text-danger">{errors.newPassword.message}</div>}
              </div>
              <div className="mb-10">
                <label className="mb-1" htmlFor="checkPassword">再次輸入新密碼</label>
                <input
                  id="checkPassword"
                  className={`form-control ${errors.checkPassword && "is-invalid"}`}
                  type="password"
                  {...register("checkPassword", {
                    required: {
                      value: true,
                      message: "再次輸入新密碼為必填!",
                    },
                    validate: (value) => value === newPassword || "再次輸入的密碼不一致!",
                  })}
                />
                {errors.checkPassword && <div className="invalid-feedback text-danger">{errors.checkPassword.message}</div>}
              </div>
              <div>
                <button className="btn btn-outline-light btn-main mb-2 w-100 rounded">儲存</button>
                <button type="button" className="btn btn-outline-light btn-main w-100 rounded" onClick={() => navigate(-1)}>
                  返回
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
