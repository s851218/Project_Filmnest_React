import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadProjectImage from "../components/UploadProjectImage";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Intro() {
  const [projectImage, setProjectImage] = useState({});

  // 取得專案資訊 API
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/1`);
        console.log("成功取得專案資訊：", res.data);
        // 取得專案圖片
        setProjectImage(res.data.projectImage);
      } catch (error) {
        console.log("取得專案資訊失敗", error);
      }
    };
    getProjectInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/1`);
        console.log("成功取得欄位預設值：", res.data);
        return {
          projectTitle: res.data.projectTitle,
          projectCategory: res.data.category,
          projectIntro: res.data.summary,
          goalMoney: res.data.goalMoney,
        };
      } catch (error) {
        console.log("專案資訊預設值取得失敗", error);
      }
    },
  });

  // 編輯完儲存 API
  const introSave = async (data) => {
    try {
      // 要更新的屬性的值
      const updateData = {
        projectTitle: data.projectTitle,
        category: data.projectCategory,
        summary: data.projectIntro,
        goalMoney: parseInt(data.goalMoney),
      };

      const res = await axios.patch(`${API_BASE}/projects/1`, updateData);
      alert("成功更新專案資訊！");
      console.log("成功更新專案資訊：", res.data);
    } catch (error) {
      console.log("專案資訊編輯失敗", error);
    }
  };

  const onSubmit = (data) => {
    console.log("編輯後送出的專案資訊：", data);
    introSave(data);
  };

  return (
    <>
      <form action="" className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="fs-6">專案資訊</h1>
        <div className="mb-3">
          <label htmlFor="projectTitle" className="form-label">
            專案名稱
          </label>
          <input
            type="text"
            className={`form-control bg-light text-dark ${
              errors?.projectTitle?.message && "is-invalid"
            }`}
            id="projectTitle"
            {...register("projectTitle", {
              required: "專案名稱為必填",
            })}
          />
          {errors?.projectTitle && (
            <p className="text-danger my-2">{errors?.projectTitle?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectCategory" className="form-label">
            專案類型
          </label>
          <input
            type="text"
            className={`form-control bg-light text-dark ${
              errors?.projectCategory?.message && "is-invalid"
            }`}
            id="projectCategory"
            {...register("projectCategory", {
              required: "專案類型為必填",
            })}
          />
          {errors?.projectCategory && (
            <p className="text-danger my-2">
              {errors?.projectCategory?.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectIntro" className="form-label">
            專案簡介
          </label>
          <input
            type="text"
            className={`form-control bg-light text-dark ${
              errors?.projectIntro?.message && "is-invalid"
            }`}
            id="projectIntro"
            {...register("projectIntro", {
              required: "專案簡介為必填",
            })}
          />
          {errors?.projectInfo && (
            <p className="text-danger my-2">{errors?.projectInfo?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="goalMoney" className="form-label">
            目標金額
          </label>
          <input
            type="number"
            className={`form-control bg-light text-dark ${
              errors?.goalMoney?.message && "is-invalid"
            }`}
            id="goalMoney"
            {...register("goalMoney", {
              required: "目標金額為必填",
            })}
            min="1"
          />
          {errors?.goalMoney && (
            <p className="text-danger my-2">{errors?.goalMoney?.message}</p>
          )}
        </div>

        {/* 更換封面圖片 */}
        <div className="mt-3">
          <div className="d-flex">
            <UploadProjectImage
              onUploadSuccess={(data) => setProjectImage(data.projectImage)}
            />
          </div>
        </div>
        <div className="mt-3 mb-4">
          <h5>專案封面圖片</h5>
          <img src={projectImage} alt="" />
        </div>
        <div className="my-3">
          <h5>專案介紹</h5>
        </div>
        <button type="submit" className="btn btn-primary">
          儲存
        </button>
      </form>
    </>
  );
}
