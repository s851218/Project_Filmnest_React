import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import UploadProjectImage from "../AdminComponents/UploadProjectImage";
import { useParams } from "react-router";
import ArticleEditor from "../AdminComponents/ArticleEditor";

const API_BASE = import.meta.env.VITE_API_BASE;

const IntroInput = ({ register, errors, id, labelText, type, rules, min }) => {
  return (
    <section className="mb-5">
      <label htmlFor={id} className="form-label fw-bolder fs-sm fs-md-base">
        {labelText}
      </label>
      <input
        type={type}
        className={`form-control bg-light text-dark fs-sm fs-md-base ${
          errors?.[id]?.message && "is-invalid"
        }`}
        id={id}
        {...register(id, rules)}
        min={min}
      />
      {errors[id] && (
        <p className="invalid-feedback my-2">{errors?.[id]?.message}</p>
      )}
    </section>
  );
};

export default function Intro() {
  // 路由跳轉頁面時，重製滾輪捲軸
  useEffect(() => {
    // 將滾動行為設為 auto 避免有捲動過程的動畫
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  const [projectImage, setProjectImage] = useState({});

  const [content, setContent] = useState("");

  // 專案編輯用 useForm
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
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
      content: "",
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
        const res = await axios.get(`${API_BASE}/projects/${id}`);

        const projectData = res.data;

        reset({
          projectTitle: projectData.projectTitle,
          projectImage: projectData.projectImage,
          category: projectData.category,
          summary: projectData.summary,
          goalMoney: projectData.goalMoney,
          otherImages: projectData.otherImages,
          content: projectData.content,
        });

        // 封面圖片狀態
        setProjectImage(projectData.projectImage);
        // 文章狀態
        setContent(projectData.content);
      } catch (error) {
        console.log("取得專案資訊失敗", error);
      }
    };
    getProjectInfo();
  }, [reset, id]);

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

  // 圖片新增 input
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // 新增圖片，這裡直接使用 Base64 字串
      const fileUrl = reader.result;
      append({ imageUrl: fileUrl });
      e.target.value = ""; // 重置 input
    };
  };

  console.log(fields);

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
        category: data.category,
        summary: data.summary,
        goalMoney: parseInt(data.goalMoney),
        otherImages: data.otherImages,
        content: getValues("content"),
      };

      const res = await axios.patch(`${API_BASE}/projects/${id}`, updateData);
      alert("成功更新專案資訊！");
      console.log("成功更新專案資訊：", res.data);
    } catch (error) {
      console.log("專案資訊編輯失敗", error);
    }
  };

  return (
    <>
      <section className="p-3 py-md-4 py-lg-7 px-md-8 px-lg-10 bg-white mb-5 rounded-4">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {/* 專案名稱 */}
          <IntroInput
            register={register}
            errors={errors}
            id="projectTitle"
            labelText="專案名稱"
            type="text"
            rules={{ required: "專案名稱為必填" }}
          />
          {/* 專案類型 */}
          <section className="mb-5">
            <label
              htmlFor="category"
              className="form-label fw-bolder fs-sm fs-md-base"
            >
              專案類型
            </label>
            <select
              id="category"
              className={`form-control bg-light text-dark ${
                errors?.category ? "is-invalid" : ""
              }`}
              {...register("category", { required: "請選擇專案類型" })}
            >
              <option value="" disabled hidden>
                請選擇專案類型
              </option>
              <option value="喜劇">喜劇</option>
              <option value="愛情">愛情</option>
              <option value="恐怖">恐怖</option>
              <option value="懸疑">懸疑</option>
              <option value="科幻">科幻</option>
              <option value="紀錄片">紀錄片</option>
              <option value="動畫">動畫</option>
              <option value="實驗電影">實驗電影</option>
            </select>
            {errors?.category && (
              <p className="invalid-feedback my-2">
                {errors?.category.message}
              </p>
            )}
          </section>
          {/* 專案簡介 */}
          <IntroInput
            register={register}
            errors={errors}
            id="summary"
            labelText="專案簡介"
            type="text"
            rules={{ required: "專案簡介為必填" }}
          />
          {/* 目標金額 */}
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
          <div className="mt-5">
            <UploadProjectImage
              onUploadSuccess={(img) => setProjectImage(img)}
            />
          </div>
          <div className="mt-5">
            <h2 className="fs-base fw-bolder">專案封面圖片預覽</h2>
            <img
              src={projectImage}
              alt=""
              className="img-fluid object-fit-cover rounded w-100"
              style={{ maxWidth: "600px" }}
            />
            <p className="fs-xs text-primary-5 mt-1">
              封面圖片會顯示在專案圖片、首頁輪播與第一張劇照等位置
            </p>
          </div>
          {/* 專案介紹頁劇照 */}
          <div className="mt-5">
            <h2 className="fs-base fw-bolder">專案介紹頁劇照</h2>
            <div className="container">
              <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-3 list-unstyled">
                {fields.map((img, index) => (
                  <li key={img.id} className="col">
                    <h3 className="fs-xs fs-md-sm text-primary-6">{`第 ${
                      index + 1
                    } 張劇照`}</h3>
                    <label
                      htmlFor={`change-image-input-${index}`}
                      className="mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={img.imageUrl}
                        alt={`第 ${index + 1} 張劇照`}
                        className="img-fluid object-fit-cover rounded"
                      />
                    </label>
                    <input
                      id={`change-image-input-${index}`}
                      type="file"
                      accept="image/*"
                      className="w-100"
                      onChange={(e) => handleOtherImagesFileChange(e, index)}
                    />
                    <div className="d-flex justify-content-center mt-2">
                      {/* 當圖片數量超過 3 張時，才顯示刪除按鈕 */}
                      {fields.length > 3 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          刪除
                        </button>
                      )}
                    </div>
                  </li>
                ))}
                {/* 僅當圖片數量少於 10 張時顯示新增圖片按鈕 */}
                {fields.length < 10 && (
                  <li className="col mt-2">
                    <p className="fs-xs fs-md-sm text-primary-6 mb-2">
                      選擇圖片新增劇照 (最多十張)
                    </p>
                    <label
                      htmlFor="add-image-input"
                      className="mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className="img-fluid object-cover rounded"
                        src="假圖.jpg"
                      />
                    </label>
                    <input
                      type="file"
                      id="add-image-input"
                      accept="image/*"
                      className="w-100"
                      onChange={handleAddImage}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* 專案介紹圖文 */}
          <section className="mt-5 mb-5">
            <h2 className="fs-base fw-bolder">專案介紹</h2>
            <ArticleEditor
              projectId={id}
              setValue={setValue}
              defaultContent={content}
            />
          </section>
          {/* 製作團隊介紹 */}
          {/* <section className="my-5">
            <h2 className="fs-base fw-bolder">製作團隊介紹</h2>
          </section> */}
          <button type="submit" className="btn btn-primary">
            儲存
          </button>
        </form>
      </section>
    </>
  );
}
