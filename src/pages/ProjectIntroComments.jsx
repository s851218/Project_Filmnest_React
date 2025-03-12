import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const BASE_URL = "https://json-server-vercel-tdcc.onrender.com";

export default function ProjectIntroComments() {
  const [comments, setComments] = useState([]);
  const [projectOwner, setProjectOwner] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      commentContent: "",
    },
  });
  const getCommentsData = async (id = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments?projectId=${id}&_expand=user`
      );
      const responseForStudio = await axios.get(
        `${BASE_URL}/projects/${id}?_expand=studio`
      );
      setProjectOwner(responseForStudio.data.studio.studioProfile);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCommentsData();
  }, []);

  const onSubmit = async (data) => {
    if (!data.commentContent.trim()) return;
    try {
      const timestamp = new Date();
      const now = timestamp.toISOString().slice(0, 16);
      const dataToSend = {
        projectId: 1,
        userId: 3,
        content: data.commentContent,
        reply: "",
        date: now,
      };
      await axios.post(`${BASE_URL}/comments`, dataToSend);
      reset();
      alert("送出成功！感謝您的鼓勵與回饋！");
      getCommentsData();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {/* 留言區塊 */}
      <section className="container py-10">
        <div className="row">
          <div className="col-lg-9 col-10 mx-auto">
            <div
              className="card mb-4 shadow-sm"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <div className="card-body p-0">
                <h5 className="mb-4">留下一句話</h5>
                <form
                  className="position-relative"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-3 ">
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

      {/* 展示留言區塊 */}
      <section className="container">
        <div className="row">
          <div className="col-10 col-lg-9 mx-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-6">
                <div className="card shadow-sm border border-primary-7 rounded-1">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-6">
                      {/* 頭像 */}
                      <div className="comment-avatar me-3">
                        {comment.user.userProfile.userImageUrl ? (
                          <img
                            src={comment.user.userProfile.userImageUrl}
                            className="img-fluid object-fit-cover me-1"
                            alt={
                              comment.user.userProfile.nickName ||
                              comment.user.userProfile.userName
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
                          {comment.user.userProfile.nickName ||
                            comment.user.userProfile.userName}
                        </h6>
                        {/* 時間 */}
                        <div className="small text-muted d-flex align-items-center gap-2">
                          <i className="bi bi-calendar"></i>
                          {comment.date.split("T")[0]}
                          <i className="bi bi-clock"></i>
                          {comment.date.split("T")[1]}
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
                          <div className="d-flex align-items-center mb-6">
                            <div className="comment-avatar me-3">
                              {projectOwner.studioImageUrl ? (
                                <img
                                  src={projectOwner.studioImageUrl}
                                  className="img-fluid object-fit-cover me-1"
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
                                {projectOwner.groupName ||
                                  projectOwner.personResponsible}
                              </h6>
                              {/* 時間 */}
                              <div className="small text-muted d-flex align-items-center gap-2">
                                <i className="bi bi-calendar"></i>
                                {comment.date.split("T")[0]}
                                <i className="bi bi-clock"></i>
                                {comment.date.split("T")[1]}
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
            ))}
          </div>
        </div>
      </section>

      <section className="fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <div className="d-flex justify-content-end p-4">
                <button
                  title="我要留言"
                  className="btn btn-success"
                  type="button"
                  onClick={() => {
                    // alert("前往留言？");
                    setFocus("commentContent");
                  }}
                  style={{
                    borderRadius: "100px",
                    scrollBehavior: "smooth",
                  }}
                >
                  <i className="bi bi-chat-heart-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
