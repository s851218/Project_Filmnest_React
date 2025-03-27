import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import UploadProjectImage from "../AdminComponents/UploadProjectImage";
import { useParams } from "react-router";
import ArticleEditor from "../AdminComponents/ArticleEditor";
import { Helmet } from "react-helmet-async";
import LightScreenLoading from "../AdminComponents/LightScreenLoading";
import { AdminCheckModal, Toast } from "../assets/js/costomSweetAlert";
import PropTypes from "prop-types";

const API_BASE = import.meta.env.VITE_API_BASE;

const IntroInput = ({ register, errors, id, labelText, type, rules, min }) => {
  return (
    <>
      <label htmlFor={id} className="form-label fw-bolder fs-base">
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
    </>
  );
};

export default function Intro() {
  const [isLoading, setIsLoading] = useState(false);

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
      team: [],
    },
  });

  // 透過 useFieldArray 來管理 otherImages 的修改、新增、刪除
  const {
    fields: otherImagesFields,
    append: appendOtherImages,
    remove: removeOtherImages,
    update: updateOtherImages,
  } = useFieldArray({
    control,
    name: "otherImages",
  });

  // 取得專案資訊 API
  useEffect(() => {
    const getProjectInfo = async () => {
      setIsLoading(true);
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
          team: projectData.team,
        });

        // 封面圖片狀態
        setProjectImage(projectData.projectImage);
        // 文章狀態
        setContent(projectData.content);
      } catch (error) {
        console.log("取得專案資訊失敗", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProjectInfo();
  }, [reset, id]);

  // 更換劇照圖片 input
  const handleChangeOtherImages = (e, index) => {
    const selectedfile = e.target.files[0]; //取目標files的內容
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        const fileUrl = reader.result;

        updateOtherImages(index, {
          ...otherImagesFields[index],
          imageUrl: fileUrl,
        });
      };
    }
  };

  // 新增劇照圖片 input
  const handleAddOtherImages = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // 新增圖片，這裡直接使用 Base64 字串
      const fileUrl = reader.result;
      appendOtherImages({ imageUrl: fileUrl });
      e.target.value = ""; // 重置 input
    };
  };

  // 刪除劇照圖片
  const handleRemoveOtherImages = (index) => {
    AdminCheckModal.fire({
      title: "是否要刪除此圖片？",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<hr><img src="${otherImagesFields[index].imageUrl}">`,
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log("已確認刪除");
        removeOtherImages(index);
      }
    });
  };

  const teamContainerRef = useRef(null);

  // 透過 useFieldArray 來管理 team(製作團隊) 的修改、新增、刪除
  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
    update: updateTeam,
  } = useFieldArray({ control, name: "team" });

  // 新增團隊人員
  const handleAddMember = () => {
    appendTeam({
      name: "",
      jobTitle: "",
      introduction: "",
      photo: "",
      temp: true,
    });

    setTimeout(() => {
      if (teamContainerRef.current) {
        const lastChild = teamContainerRef.current.lastElementChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
  };

  // 取消編輯團隊人員
  const handleCancelEditMember = (index) => {
    AdminCheckModal.fire({
      title: "是否取消編輯此團隊人員？",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.value) {
        removeTeam(index);
      }
    });
  };

  // 刪除團隊人員
  const handleRemoveMember = (index) => {
    AdminCheckModal.fire({
      title: "是否要刪除此團隊人員？",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<div class="d-flex flex-column align-items-center mt-2"><img class="rounded mb-2" src="${teamFields[index].photo}" ><p>${teamFields[index].jobTitle} ${teamFields[index].name}</p></div>`,
    }).then((result) => {
      if (result.value) {
        removeTeam(index);
      }
    });
  };

  // 更換團隊人員個人照片
  const handleChangeTeamMemberPhoto = (e, index) => {
    const file = e.target.files[0];
    if (!file) {
      // 若沒有選擇圖片，photo 為空字串
      updateTeam(index, { ...getValues(`team.${index}`), photo: "" });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const fileUrl = reader.result;
      // 更新團隊人員的 photo 欄位
      updateTeam(index, { ...getValues(`team.${index}`), photo: fileUrl });
    };
  };

  // 刪除團隊個人相片
  const handleRemoveTeamMemberPhoto = (index) => {
    AdminCheckModal.fire({
      title: "是否要刪除個人相片？",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<div class="mt-2"><img class="rounded" src="${teamFields[index].photo}" ></div>`,
    }).then((result) => {
      if (result.value) {
        updateTeam(index, { ...getValues(`team.${index}`), photo: "" });
      }
    });
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
    setIsLoading(true);

    try {
      // 將團隊人員的 fields 中的 temp 屬性移除
      const updatedTeam = data.team.map((member) => {
        const { ...rest } = member;
        return rest;
      });

      // 要更新的屬性的值
      const updateData = {
        projectTitle: data.projectTitle,
        projectImage: data.projectImage,
        category: data.category,
        summary: data.summary,
        goalMoney: parseInt(data.goalMoney),
        otherImages: data.otherImages,
        content: data.content,
        team: updatedTeam,
      };

      const res = await axios.patch(`${API_BASE}/projects/${id}`, updateData);
      Toast.fire({
        icon: "success",
        title: "成功更新專案資訊！",
      });
      console.log("成功更新專案資訊：", res.data);
      // 更新表單狀態，讓 UI 顯示刪除按鈕（因 temp 屬性已移除）
      setValue("team", updatedTeam);
    } catch (error) {
      console.log("專案資訊編輯失敗", error);
      Toast.fire({
        icon: "error",
        title: "專案資訊編輯失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>專案資訊編輯</title>
      </Helmet>
      <form
        action=""
        className="mb-3 mb-md-6 mb-lg-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="p-4 py-md-5 py-lg-7 px-md-8 px-lg-10 bg-white mb-3 mb-md-4 mb-lg-5 rounded-4">
          {/* 專案名稱 */}
          <div className="mb-5">
            <IntroInput
              register={register}
              errors={errors}
              id="projectTitle"
              labelText="專案名稱"
              type="text"
              rules={{ required: "專案名稱為必填" }}
            />
          </div>
          {/* 專案類型 */}
          <div className="mb-5">
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
          </div>
          {/* 專案簡介 */}
          <div className="mb-5">
            <IntroInput
              register={register}
              errors={errors}
              id="summary"
              labelText="專案簡介"
              type="text"
              rules={{ required: "專案簡介為必填" }}
            />
          </div>
          {/* 目標金額 */}
          <IntroInput
            register={register}
            errors={errors}
            id="goalMoney"
            labelText="目標金額"
            type="number"
            rules={{
              required: "目標金額為必填",
              min: { value: 1, message: "目標金額必須大於零" },
            }}
            min="1"
          />
        </section>
        {/* 更換封面圖片 */}
        <section className="p-4 py-md-5 py-lg-7 px-md-8 px-lg-10 bg-white mb-3 mb-md-4 mb-lg-5 rounded-4">
          <div>
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
            <p className="fs-xs text-primary-5 mt-1 mb-0">
              封面圖片會顯示在專案圖片、首頁輪播與第一張劇照等位置
            </p>
          </div>
        </section>
        {/* 專案介紹頁劇照 */}
        <section className="p-4 py-md-5 py-lg-7 px-md-8 px-lg-10 bg-white mb-3 mb-md-4 mb-lg-5 rounded-4">
          <h2 className="fs-base fw-bolder">專案介紹頁劇照</h2>
          <div className="container">
            <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 g-lg-3 list-unstyled">
              {otherImagesFields.map((img, index) => (
                <li key={img.id} className="col">
                  <h3 className="fs-sm text-primary-6">{`第 ${
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
                    onChange={(e) => handleChangeOtherImages(e, index)}
                  />
                  <div className="d-flex justify-content-center mt-2">
                    {/* 當圖片數量超過 3 張時，才顯示刪除按鈕 */}
                    {otherImagesFields.length > 3 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger rounded"
                        onClick={() => {
                          handleRemoveOtherImages(index);
                        }}
                      >
                        <i className="bi bi-trash me-1"></i>
                        刪除
                      </button>
                    )}
                  </div>
                </li>
              ))}
              {/* 僅當圖片數量少於 10 張時顯示新增圖片按鈕 */}
              {otherImagesFields.length < 10 && (
                <li className="col mt-2">
                  <p className="fs-sm text-primary-6 mb-2">
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
                    onChange={handleAddOtherImages}
                  />
                </li>
              )}
            </ul>
          </div>
        </section>
        {/* 專案介紹圖文 */}
        <section className="p-4 py-md-5 py-lg-7 px-md-8 px-lg-10 bg-white mb-3 mb-md-4 mb-lg-5 rounded-4">
          <h2 className="fs-base fw-bolder">專案介紹</h2>
          <ArticleEditor
            projectId={id}
            setValue={setValue}
            defaultContent={content}
          />
        </section>
        {/* 製作團隊介紹 */}
        <section className="p-3 py-md-5 py-lg-7 px-md-8 px-lg-10 bg-white mb-3 mb-md-4 mb-lg-5 rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-base fw-bolder mb-0">製作團隊介紹</h2>
            <button
              type="button"
              className="btn btn-primary rounded"
              onClick={handleAddMember}
            >
              <i className="bi bi-plus-circle me-1 me-lg-2"></i>新增團隊人員
            </button>
          </div>
          <div ref={teamContainerRef}>
            {teamFields.map((member, index) => (
              <div
                key={member.id}
                className="border border-primary-3 rounded-2 p-4 mb-5"
              >
                <section className="d-flex justify-content-between">
                  <h3 className="fs-base text-primary-6 mb-0">{`團隊人員 #${
                    index + 1
                  }`}</h3>
                  {member.temp ? (
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded"
                      onClick={() => handleCancelEditMember(index)}
                    >
                      <i className="bi bi-x-circle me-1 me-lg-2"></i>
                      取消
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-danger rounded"
                      onClick={() => handleRemoveMember(index)}
                    >
                      <i className="bi bi-trash me-1 me-lg-2"></i>
                      刪除
                    </button>
                  )}
                </section>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      {/* 個人相片 */}
                      <section className="d-flex flex-column mb-5 mb-md-0">
                        <h4 className="fs-base">個人相片</h4>
                        <label
                          htmlFor={`edit-member-photo-${index}`}
                          className="form-label"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={member.photo || "假圖.jpg"}
                            className="img-fluid object-fit-cover rounded"
                            alt={`團隊人員 #${index + 1}`}
                          />
                        </label>
                        <input
                          id={`edit-member-photo-${index}`}
                          type="file"
                          accept="image/*"
                          className="w-100"
                          onChange={(e) =>
                            handleChangeTeamMemberPhoto(e, index)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm rounded mt-2"
                          onClick={() => handleRemoveTeamMemberPhoto(index)}
                        >
                          刪除相片
                        </button>
                      </section>
                    </div>
                    <div className="col-md-8">
                      {/* 名稱與職稱 */}
                      <section className="d-flex gap-6">
                        <div className="mb-5">
                          <label
                            htmlFor={`team-name-${index}`}
                            className="form-label fw-bolder fs-base"
                          >
                            名稱
                          </label>
                          <input
                            type="text"
                            id={`team-name-${index}`}
                            className={`form-control bg-light text-dark fs-sm fs-md-base ${
                              errors.team?.[index]?.name ? "is-invalid" : ""
                            }`}
                            {...register(`team.${index}.name`, {
                              required: "名稱為必填",
                            })}
                          />
                          {errors.team?.[index]?.name && (
                            <p className="invalid-feedback my-2">
                              {errors.team[index].name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor={`team-jobTitle-${index}`}
                            className="form-label fw-bolder fs-base"
                          >
                            名稱
                          </label>
                          <input
                            type="text"
                            id={`team-jobTitle-${index}`}
                            className={`form-control bg-light text-dark fs-sm fs-md-base ${
                              errors.team?.[index]?.jobTitle ? "is-invalid" : ""
                            }`}
                            {...register(`team.${index}.jobTitle`, {
                              required: "職稱為必填",
                            })}
                          />
                          {errors.team?.[index]?.jobTitle && (
                            <p className="invalid-feedback my-2">
                              {errors.team[index].jobTitle.message}
                            </p>
                          )}
                        </div>
                      </section>
                      {/* 個人介紹 */}
                      <section>
                        <label className="form-label fs-base fw-bolder">
                          個人介紹
                        </label>
                        <textarea
                          type="textArea"
                          rows="7"
                          className={`form-control bg-light text-dark h-100 ${
                            errors.team?.[index]?.introduction
                              ? "is-invalid"
                              : ""
                          }`}
                          {...register(`team.${index}.introduction`, {
                            required: "個人介紹為必填",
                          })}
                        />
                        {errors.team?.[index]?.introduction && (
                          <p className="invalid-feedback my-2">
                            {errors.team[index].introduction.message}
                          </p>
                        )}
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <button
          type="submit"
          className="btn btn-primary rounded d-block mx-auto"
          disabled={isLoading}
        >
          <i className="bi bi-floppy me-2"></i>
          儲存
        </button>
      </form>
      <LightScreenLoading isLoading={isLoading} />
    </>
  );
}

IntroInput.propTypes = {
  register: PropTypes.func,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      message: PropTypes.string,
    })
  ),
  id: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
  rules: PropTypes.object,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
