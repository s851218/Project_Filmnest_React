import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;
export default function Post() {
  const [postsData, setPostsData] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const { id } = useParams();

    // 時間格式轉換
    const getTime = (time) =>{
      const newTime = new Date(time).toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(/\//g, "-")
      return newTime
    }

  // 新增最新消息
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: { schedule: "" } });

  const schedule = watch("date");

  const onSubmit = async (data) => {
    const postData = {
      projectId: id,
      title: data.title,
      content: data.content,
      date: data.date === "now" ? new Date().toString() : data.schedule,
    };

    const formatDate = postData.date
    const newPost = {
      ...postData,
      date: formatDate,
    };

    try {
      await axios.post(`${apiBase}/posts`, newPost);
      setIsAdd(false);
      alert("新增成功");
      getPostsData(id);
      reset();
    } catch (error) {
      alert("新增失敗");
    }
  };

  // 編輯最新消息
  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    reset: updateReset,
    formState: { errors: updateErrors },
  } = useForm({ mode: "onChange" });

  const onPutSubmit = async (data, dataId) => {
    const now = new Date().toString();
    const updataPost = {
      projectId: id,
      title: data.title,
      content: data.content,
      date: now, // 設定為當前時間
    };
    try {
      await axios.put(`${apiBase}/posts/${dataId}`, updataPost);
      setIsEdit(null);
      alert("編輯成功");
      getPostsData(id);
    } catch (error) {
      alert("編輯失敗");
    }
  };

  // 刪除最新消息
  const handleDelPostData = async (dataId) => {
    try {
      await axios.delete(`${apiBase}/posts/${dataId}`);
      alert("刪除成功");
      getPostsData(id);
    } catch (error) {
      console.log("刪除失敗");
    }
  };

  // 取得最新消息
  const getPostsData = async (projectId) => {
    try {
      const response = await axios.get(`${apiBase}/posts?projectId=${projectId}`);
      setPostsData(response.data);
    } catch (error) {
      console.log("取得資料失敗");
    }
  };

  useEffect(() => {
    getPostsData(id);
  }, []);

  return (
    <>
      {isAdd ? (
        <form className="bg-primary-2 p-5 rounded-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              標題
            </label>
            <input
              type="text"
              className={`form-control text-dark bg-white ${errors.title && "is-invalid"}`}
              id="title"
              {...register("title", {
                required: {
                  value: true,
                  message: "標題 為必填!",
                },
              })}
            />
            <div className="invalid-feedback text-danger">{errors?.title?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              內容
            </label>
            <textarea
              className={`form-control text-dark bg-white ${errors.content && "is-invalid"}`}
              id="content"
              rows="3"
              {...register("content", {
                required: {
                  value: true,
                  message: "內容 為必填!",
                },
              })}
            ></textarea>
            <div className="invalid-feedback text-danger">{errors?.content?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label me-2">時間</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                value="now"
                className="form-check-input"
                {...register("date", {
                  onChange: () => setValue("schedule", ""),
                })}
              />
              <label className="form-check-label">立即發布</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" value="schedule" className="form-check-input" {...register("date")} />
              <label className="form-check-label">排程：</label>
            </div>
            <input
              type="datetime-local"
              className="form-control d-inline w-auto ms-2"
              disabled={schedule !== "schedule"}
              {...register("schedule", {
                validate: (value) => (schedule === "schedule" ? value !== "" || "請選擇排程時間" : true),
              })}
            />
            {errors.schedule && <div className="text-danger">{errors.schedule.message}</div>}
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary rounded-2 px-4 py-2 me-3">
              確認送出
            </button>
            <button type="button" className="btn btn-primary rounded-2 px-4 py-2" onClick={() => setIsAdd(false)}>
              取消
            </button>
          </div>
        </form>
      ) : (
        <div className="d-flex justify-content-end mb-2">
          <i type="button" className="btn btn-primary bi bi-plus-lg fs-1 lh-1 p-1 rounded-2" onClick={() => setIsAdd(true)}></i>
        </div>
      )}
      {postsData.map((post, index) => {
        const isEditIng = isEdit === post.id;

        return (
          <form className="bg-primary-2 p-5 rounded-3 mb-5" key={post.id}>
            <div className="mb-3">
              {!isEditIng && (
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="title" className="form-label fs-5">
                    {post.title}
                  </label>
                  <p className="fs-sm">更新日期:{getTime(post.date)}</p>
                </div>
              )}
              {isEditIng && (
                <input
                  type="text"
                  className={`form-control text-dark bg-white ${updateErrors.title && "is-invalid"}`}
                  id="title"
                  defaultValue={post.title}
                  {...updateRegister("title", {
                    required: {
                      value: true,
                      message: "標題 為必填!",
                    },
                  })}
                />
              )}
              <div className="invalid-feedback text-danger">{updateErrors?.title?.message}</div>
            </div>
            <div className="mb-3">
              {!isEditIng && (
                <label htmlFor="content" className="form-label fs-7">
                  {post.content}
                </label>
              )}
              {isEditIng && (
                <textarea
                  className={`form-control text-dark bg-white ${updateErrors.content && "is-invalid"}`}
                  id="content"
                  rows="3"
                  defaultValue={post.content}
                  {...updateRegister("content", {
                    required: {
                      value: true,
                      message: "內容 為必填!",
                    },
                  })}
                ></textarea>
              )}
              <div className="invalid-feedback text-danger">{updateErrors?.content?.message}</div>
            </div>
            <div className="d-flex justify-content-end">
              {isEditIng ? (
                <>
                  <button type="submit" className="btn btn-primary rounded-2 px-4 py-2 me-3" onClick={updateHandleSubmit((data) => onPutSubmit(data, post.id))}>
                    確認
                  </button>
                  <button type="button" className="btn btn-primary rounded-2 px-4 py-2" onClick={() => setIsEdit(null)}>
                    取消
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary rounded-2 px-4 py-2 me-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEdit(post.id);
                      updateReset({
                        title: post.title,
                        content: post.content,
                      });
                    }}
                  >
                    編輯
                  </button>
                  <button type="button" className="btn btn-primary rounded-2 px-4 py-2" onClick={() => handleDelPostData(post.id)}>
                    刪除
                  </button>
                </>
              )}
            </div>
          </form>
        );
      })}
    </>
  );
}
