import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadProjectImage from "../AdminComponents/UploadProjectImage";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Intro() {
  const [projectImage, setProjectImage] = useState({});

  const [file, setFile] = useState(null); // 選擇圖片檔案狀態

  const [projectOtherImages, setProjectOtherImages] = useState([]);

  // 取得專案資訊 API
  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/1`);
        // 取得專案圖片
        setProjectImage(res.data.projectImage);
        // 取得其他圖片加入 id
        const imagesWithId = res.data.otherImages.map((item, index) => ({
          id: index + 1,
          imageUrl: typeof item === "string" ? item : item.imageUrl,
        }));

        setProjectOtherImages(imagesWithId);

        console.log("轉換後的 otherImages：", imagesWithId);
      } catch (error) {
        console.log("取得專案資訊失敗", error);
      }
    };
    getProjectInfo();
  }, []);

  // 這裡做一個 useEffect，用來查看更新後的 projectOtherImages 狀態，因為在上面 useEffect 觸發條件設定 projectOtherImages，會觸發無限迴圈
  useEffect(() => {
    console.log("更新後的 projectOtherImages：", projectOtherImages);
  }, [projectOtherImages]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects/1`);
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

  // 圖片檔案選擇 input
  const handleImageFileChange = (e) => {
    const selectedfile = e.target.files[0]; //取目標files的內容
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        setFile(reader.result); // 存 Base64 字串
      };
    }
  };

  // 專案介紹圖片更換
  const handleImageChange = async (id) => {
    try {
      if (!file) {
        alert("請選擇一張圖片");
        return;
      }
      // 點擊該圖片的更換按鈕，更換 imageUrl 屬性為新 file 狀態
      const updateChangeImage = projectOtherImages.map((image) =>
        image.id === id ? { ...image, imageUrl: file } : image
      );
      setProjectOtherImages(updateChangeImage);
      await axios.patch(`${API_BASE}/projects/1`, {
        otherImages: updateChangeImage,
      });
      console.log("圖片更換成功：", updateChangeImage);
      alert("圖片更換成功！");
      setFile(null); // 重置 file 狀態
    } catch (error) {
      alert("更換圖片失敗！");
      console.log("更換圖片失敗：", error);
    }
  };

  // 刪除圖片
  const handleDeleteImage = async (id) => {
    try {
      if (projectOtherImages.length <= 3) {
        alert("最少三張圖片，無法刪除！");
        return;
      }
      // 非點擊到的圖片篩選出來
      const filterDeleteImage = projectOtherImages.filter(
        (image) => image.id !== id
      );

      const updateImageIdArr = filterDeleteImage.map((image, index) => ({
        ...image,
        id: index + 1,
      }));

      setProjectOtherImages(updateImageIdArr);

      await axios.patch(`${API_BASE}/projects/1`, {
        otherImages: updateImageIdArr,
      });
      alert("刪除圖片成功！");
    } catch (error) {
      alert("刪除圖片失敗！");
      console.log("刪除圖片失敗：", error);
    }
  };

  // 新增專案介紹圖片
  const handleAddImage = async () => {
    try {
      if (!file) {
        alert("請選擇一張圖片");
        return;
      }

      if (projectOtherImages.length >= 10) {
        alert("最多只能有十張圖片！");
        return;
      }

      const newId = projectOtherImages.length + 1;

      const newImage = { id: newId, imageUrl: file };

      const updateAddImage = [...projectOtherImages, newImage];
      setProjectOtherImages(updateAddImage);
      await axios.patch(`${API_BASE}/projects/1`, {
        otherImages: updateAddImage,
      });
      alert("新增圖片成功！");
      setFile(null);
    } catch (error) {
      alert("新增圖片失敗！");
      console.log("新增圖片失敗：", error);
    }
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
        <div className="my-3">
          <h5>專案封面圖片</h5>
          <img src={projectImage} alt="" />
        </div>
        <div className="my-3">
          <h5>專案介紹頁圖片</h5>
          <ul className="row g-3 list-unstyled">
            {projectOtherImages.map((image) => {
              return (
                <li className="col-4" key={image.id}>
                  <img src={image.imageUrl} alt="" />
                  <div className="my-2">
                    <input type="file" onChange={handleImageFileChange} />
                  </div>
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-50"
                      onClick={() => {
                        handleImageChange(image.id);
                      }}
                    >
                      更換
                    </button>
                    {/* 當圖片數量超過 3 張時，才顯示刪除按鈕 */}
                    {projectOtherImages.length > 3 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger w-50"
                        onClick={() => {
                          handleDeleteImage(image.id);
                        }}
                      >
                        刪除
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
            {/* 僅當圖片數量少於 10 張時顯示新增圖片按鈕 */}
            {projectOtherImages.length < 10 && (
              <li className="col-4">
                <input
                  type="file"
                  className="my-2"
                  onChange={handleImageFileChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={handleAddImage}
                >
                  新增圖片
                </button>
              </li>
            )}
          </ul>
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
