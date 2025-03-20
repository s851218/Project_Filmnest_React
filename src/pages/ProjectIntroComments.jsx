import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import getNewDateFormatted from "../helpers/getNewDateFormatted";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { Toast } from "../assets/js/costomSweetAlert";

const BASE_URL = "https://json-server-vercel-tdcc.onrender.com";

export default function ProjectIntroComments() {
  const [comments, setComments] = useState([]);
  const [projectOwner, setProjectOwner] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const userId = useSelector((state) => state.user.profile.userId);
  const { id } = useParams();
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //處理params
  useEffect(() => {
    if (id) {
      const paramsArry = id.split("&");
      let paramsObj = {};
      paramsArry.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      console.log(paramsObj);
      setParams(paramsObj);
    }
  }, [id]);

  //初始渲染資料，並處理排序
  useEffect(() => {
    if (params.projectId) {
      const getCommentsData = async (id) => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}/comments?projectId=${id}&_expand=user`
          );
          const responseForStudio = await axios.get(
            `${BASE_URL}/projects/${id}?_expand=studio`
          );
          setProjectOwner(responseForStudio.data.studio.studioProfile);
          const sortedComments = sortCommentsByDate(response.data, sortOrder);
          setComments(sortedComments);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getCommentsData(params.projectId);
    }
  }, [sortOrder, params]);

  // 重新渲染呼叫用
  const refreshComments = async (id = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments?projectId=${id}&_expand=user`
      );
      setComments(sortCommentsByDate(response.data, sortOrder));
    } catch (error) {
      console.error(error);
    }
  };

  // 排序留言
  const sortCommentsByDate = (commentsToSort, order) => {
    return [...commentsToSort].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  // 切換排序順序
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sortedComments = sortCommentsByDate(comments, newOrder);
    setComments(sortedComments);
  };

  // 留言表單
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      isIncognito: false,
      commentContent: "",
    },
  });

  // 提交留言
  const onSubmit = async (data) => {
    if (!data.commentContent.trim()) return;
    try {
      const timeString = new Date();
      const dataToSend = {
        projectId: 1,
        userId,
        content: data.commentContent,
        isIncognito: data.isIncognito,
        reply: "",
        replyDate: "",
        date: timeString,
      };
      await axios.post(`${BASE_URL}/comments`, dataToSend);
      reset();
      Toast.fire({
        icon: "success",
        title: "送出成功！感謝您的鼓勵與回饋！",
      });
      refreshComments();
    } catch (error) {
      console.error(error.message);
      Toast.fire({
        icon: "error",
        title: "送出失敗！請稍後再試！",
      });
    }
  };

  // 神秘按鈕
  const [showButton, setShowButton] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (commentRef.current) {
        const formRect = commentRef.current.getBoundingClientRect();
        const inputRect = document
          .querySelector("textarea")
          .getBoundingClientRect();

        setShowButton(formRect.bottom < 0 && inputRect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 頁面載入時立即檢查

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document
      .querySelector(".floating-button")
      ?.classList.toggle("show", showButton);
  }, [showButton]);

  return (
    <>
      <Helmet>
        <title>留言板</title>
      </Helmet>
      {/* 留言區塊 */}
      <section className="container py-10">
        <div className="row">
          <div className="col-lg-9 col-md-10 mx-auto">
            <div
              className="card mb-4 shadow-sm"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <div className="card-body p-0">
                <form
                  className="position-relative"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5>留下一句話</h5>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          {...register("isIncognito", { valueAsBoolean: true })}
                          className="form-check-input"
                          id="anonymous-message"
                          type="checkbox"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="anonymous-message"
                        >
                          匿名留言
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3" ref={commentRef}>
                    <textarea
                      {...register("commentContent", {
                        required: "請輸入留言內容",
                        minLength: { value: 2, message: "留言內容太短囉" },
                      })}
                      className={`form-control ${
                        errors.commentContent ? "is-invalid" : ""
                      }`}
                      id=""
                      rows="3"
                      placeholder="你的鼓勵將會是創作者繼續前進的最大原動力"
                    />
                    {errors.commentContent && (
                      <div className="invalid-feedback position-absolute">
                        {errors.commentContent.message}
                      </div>
                    )}
                  </div>
                  <div
                    className="position-absolute"
                    style={{
                      bottom: 10,
                      right: 15,
                    }}
                  >
                    <button
                      className={`btn btn-primary-8 ${
                        errors.commentContent ? "text-danger border-danger" : ""
                      }`}
                      disabled={isSubmitting}
                      type="submit"
                      style={{
                        borderRadius: "100px",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="spinner-border spinner-border-sm" />
                      ) : (
                        <i className="bi bi-send"></i>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-10 mx-auto">
            <div className="d-flex mb-4">
              <button
                className="btn btn-secondary d-flex align-items-center gap-1"
                onClick={toggleSortOrder}
              >
                <i
                  className={`bi bi-sort-${
                    sortOrder === "desc" ? "down" : "up"
                  }`}
                ></i>
                {sortOrder === "desc" ? "由新到舊" : "由舊到新"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 展示留言區塊 */}
      <section className="container">
        <div className="row">
          <div className="col-10 col-lg-9 mx-auto">
            {comments.map((comment) => {
              const commentTime = getNewDateFormatted(comment.date);
              let replyTime;
              if (comment.reply) {
                replyTime = getNewDateFormatted(comment.replyDate);
              }

              return (
                <div key={comment.id} className="mb-6">
                  <div className="card shadow-sm border border-primary-7 rounded-1">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-6">
                        {/* 頭像 */}
                        <div className="comment-avatar me-3">
                          {!comment.isIncognito &&
                          comment.user?.userProfile?.userImageUrl ? (
                            <img
                              src={comment.user?.userProfile?.userImageUrl}
                              className="img-fluid object-fit-cover me-1"
                              alt={
                                comment.user?.userProfile?.nickName ||
                                comment.user?.userProfile?.userName
                              }
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50px",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-1"
                              style={{ width: 50, height: 50 }}
                            >
                              <i className="bi bi-person"></i>
                            </div>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          {/* 名稱 */}
                          <h6 className="mb-1">
                            {comment.isIncognito
                              ? "匿名"
                              : comment.user?.userProfile?.nickName ||
                                comment.user?.userProfile?.userName ||
                                "訪客"}
                          </h6>
                          {/* 時間 */}
                          <div className="small text-muted d-flex align-items-center gap-2">
                            <i className="bi bi-calendar"></i>
                            {commentTime.split("T")[0]}
                            <i className="bi bi-clock"></i>
                            {commentTime.split("T")[1]}
                          </div>
                        </div>
                      </div>
                      {/* 內容 */}
                      <div className="p-1">
                        <p>{comment.content}</p>
                      </div>
                      {comment.reply && (
                        <>
                          <hr />
                          <div className="bg-primary-9 rounded-1 p-3">
                            <div className="d-flex align-items-center gap-2 mb-6">
                              <div className="comment-avatar me-3">
                                {projectOwner.studioImageUrl ? (
                                  <img
                                    src={projectOwner.studioImageUrl}
                                    className="img-fluid object-fit-cover me-md-1"
                                    alt={
                                      projectOwner.groupName ||
                                      projectOwner.personResponsible
                                    }
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: "50px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-md-1"
                                    style={{ width: 50, height: 50 }}
                                  >
                                    <i className="bi bi-person"></i>
                                  </div>
                                )}
                              </div>
                              <div className="d-flex flex-column">
                                {/* 名稱 */}
                                <h6 className="mb-1 fs-lg-6 fs-md-7 fs-9">
                                  {projectOwner.groupName ||
                                    projectOwner.personResponsible}
                                </h6>
                                {/* 時間 */}
                                <div className="small text-muted d-flex align-items-center gap-2">
                                  <i className="bi bi-calendar"></i>
                                  {replyTime.split("T")[0]}
                                  <i className="bi bi-clock"></i>
                                  {replyTime.split("T")[1]}
                                </div>
                              </div>
                            </div>
                            <p className="mb-0 p-1">{comment.reply}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 幽靈按鈕 */}
      <section className="fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <div className="d-flex justify-content-end p-4">
                <button
                  title="我要留言"
                  className={`btn btn-success floating-button ${
                    showButton ? "show" : "hide"
                  }`}
                  // className="btn btn-success"
                  type="button"
                  onClick={() => {
                    setFocus("commentContent");
                  }}
                  style={{
                    borderRadius: "100px",
                  }}
                >
                  <i className="bi bi-chat-heart-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        .floating-button {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
        .floating-button.show {
            opacity: 1;
            transform: translateY(-100px);
          }

          .floating-button.hide {
            opacity: 0;
            transform: translateY(20px);
          }`}
      </style>

      {/* <GrayScreenLoading isLoading={isLoading} /> */}
    </>
  );
}
