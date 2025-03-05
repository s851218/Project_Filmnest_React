import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import UploadProjectImage from "../AdminComponents/UploadProjectImage";

const API_BASE = import.meta.env.VITE_API_BASE;

const IntroInput = ({ register, errors, id, labelText, type, rules, min }) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className={`form-control bg-light text-dark ${
          errors?.[id]?.message && "is-invalid"
        }`}
        id={id}
        {...register(id, rules)}
        min={min}
      />
      {errors[id] && (
        <p className="invalid-feedback my-2">{errors?.[id]?.message}</p>
      )}
    </div>
  );
};

export default function Intro() {
  const [projectImage, setProjectImage] = useState({});

  // 專案編輯用 useForm
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      projectTitle: "",
      projectImage: "",
      category: "",
      summary: "",
      goalMoney: "",
      otherImages: [],
    },
  });

  // 透過 useFieldArray 來管理 otherImages 的修改、新增、刪除
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "otherImages",
  });

  // 取得專案資訊 API
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/1`);

        const projectData = res.data;

        reset({
          projectTitle: projectData.projectTitle,
          projectImage: projectData.projectImage,
          category: projectData.category,
          summary: projectData.summary,
          goalMoney: projectData.goalMoney,
          otherImages: projectData.otherImages,
        });

        // 封面圖片狀態
        setProjectImage(projectData.projectImage);
        // 專案介紹圖片狀態
        // setProjectOtherImages(projectData.otherImages);
      } catch (error) {
        console.log("取得專案資訊失敗", error);
      }
    };
    getProjectInfo();
  }, [reset]);

  // 圖片檔案選擇 input
  const handleOtherImagesFileChange = (e, index) => {
    const selectedfile = e.target.files[0]; //取目標files的內容
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        const fileUrl = reader.result;
        update(index, { ...fields[index], imageUrl: fileUrl });
      };
    }
  };

  // 新增圖片檔案選擇 input
  const handleAddImageFileChange = (e) => {
    const selectedfile = e.target.files[0]; //取目標files的內容
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        const fileUrl = reader.result;
        append({ imageUrl: fileUrl });
        e.target.value = "";
      };
    }
  };

  const onSubmit = (data) => {
    const editData = {
      ...data,
      projectImage,
    };
    console.log("編輯後送出的專案資訊：", data);
    introSave(editData);
  };

  // 編輯完儲存 API
  const introSave = async (data) => {
    try {
      // 要更新的屬性的值
      const updateData = {
        projectTitle: data.projectTitle,
        projectImage: data.projectImage,
        category: data.projectCategory,
        summary: data.summary,
        goalMoney: parseInt(data.goalMoney),
        otherImages: data.otherImages,
      };

      const res = await axios.patch(`${API_BASE}/projects/1`, updateData);
      alert("成功更新專案資訊！");
      console.log("成功更新專案資訊：", res.data);
    } catch (error) {
      console.log("專案資訊編輯失敗", error);
    }
  };

  console.log("fields:", fields);

  console.dir({ fields, append, remove, update });
  return (
    <>
      <h1 className="fs-6 mb-7">專案資訊</h1>
      <form action="" className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <IntroInput
          register={register}
          errors={errors}
          id="projectTitle"
          labelText="專案名稱"
          type="text"
          rules={{ required: "專案名稱為必填" }}
        />
        <IntroInput
          register={register}
          errors={errors}
          id="category"
          labelText="專案類型"
          type="text"
          rules={{ required: "專案類型為必填" }}
        />
        <IntroInput
          register={register}
          errors={errors}
          id="summary"
          labelText="專案簡介"
          type="text"
          rules={{ required: "專案簡介為必填" }}
        />
        <IntroInput
          register={register}
          errors={errors}
          id="goalMoney"
          labelText="目標金額"
          type="number"
          rules={{ required: "目標金額為必填" }}
          min="1"
        />

        {/* 更換封面圖片 */}
        <div className="mt-3">
          <div className="d-flex">
            <UploadProjectImage
              onUploadSuccess={(img) => setProjectImage(img)}
            />
          </div>
        </div>
        <div className="my-3">
          <h2 className="fs-7">專案封面圖片預覽</h2>
          <img src={projectImage} alt="" className="img-fluid" />
        </div>
        <div className="my-3">
          <h2 className="fs-7">專案介紹頁圖片</h2>
          <ul className="row g-3 list-unstyled">
            {fields.map((image, index) => {
              return (
                <li className="col-4" key={image.id}>
                  <img src={image.imageUrl} alt="" className="img-fluid" />
                  <div className="d-flex flex-column align-items-center">
                    <div className="mt-2 align-self-start">
                      <input
                        type="file"
                        onChange={(e) => handleOtherImagesFileChange(e, index)}
                      />
                    </div>
                    <div className="mt-2">
                      {/* 當圖片數量超過 3 張時，才顯示刪除按鈕 */}
                      {fields.length > 3 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          刪除
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
            {/* 僅當圖片數量少於 10 張時顯示新增圖片按鈕 */}
            {fields.length < 10 && (
              <li className="col-4">
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ minHeight: "200px", border: "1px dashed #ccc" }}
                >
                  <input type="file" onChange={handleAddImageFileChange} />
                  <p className="fs-6 mt-2">這裡新增圖片</p>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="my-3">
          <h2>專案介紹</h2>
        </div>
        <button type="submit" className="btn btn-primary">
          儲存
        </button>
      </form>
    </>
  );
}
