import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminAnsComment() {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isReplied, setIsReplied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [comments, setComments] = useState([
    {
      id: 2,
      projectId: 1,
      userId: 3,
      content: "很喜歡這樣紀錄片的風格，期待創作者能做出更多的作品",
      date: "2024-08-04T18:30",
    },
    {
      id: 3,
      projectId: 1,
      userId: 3,
      content: "很喜歡這樣紀錄片的風格，期待創作者能做出更多的作品",
      date: "2024-08-04T19:30",
    },
  ]);

  // useEffect(() => {
  //   const getCommentData = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE}/comments`);
  //       setComments(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getCommentData();
  // }, []);

  const onSubmitReply = async (data, id) => {
    // console.log("回覆內容：", data.replyContent);
    // console.log("回覆 ID：", id);
    const commentReplied = comments.find((comment) => comment.id === id);
    commentReplied.reply = data.replyContent;
    console.log(commentReplied);

    try {
      await axios.put(`${API_BASE}/comments/${id}`, {
        ...commentReplied,
      });
      console.log("回覆後", comments);
      reset();
      setActiveReplyId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>回覆留言</h1>
      <div className="container-fluid p-4">
        {comments.map((comment, index) => {
          // const isReplied = replyContent.find((item) => item.id === comment.id);
          return (
            <div key={comment.id} className="row shadow-sm rounded mb-3 p-3">
              <div className="col-10">
                <section className="d-flex align-items-center justify-content-between w-25 mb-3">
                  <img
                    src="/api/placeholder/50/50"
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column">
                    <h5 className="mb-1">User #{index + 1}</h5>
                    <small className="text-muted">
                      {comment.date.split("T").join(" ")}
                    </small>
                  </div>
                </section>
                <section>
                  <p>{comment.content}</p>
                </section>
                <section>
                  {comment.reply ? (
                    <>
                      <section className="d-flex align-items-center justify-content-between w-25 mb-3">
                        <img
                          src="/api/placeholder/50/50"
                          alt="Profile"
                          className="rounded-circle"
                        />
                        <div className="d-flex flex-column">
                          <h5 className="mb-1">春日影像</h5>
                          <small className="text-muted">
                            {comment.date.split("T").join(" ")}
                          </small>
                        </div>
                      </section>
                      <section>{comment.reply}</section>
                    </>
                  ) : (
                    <>
                      {/* 回覆按鈕 */}
                      <div className="text-end">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            setActiveReplyId(
                              activeReplyId === comment.id ? null : comment.id
                            )
                          }
                        >
                          {activeReplyId === comment.id ? "取消" : "回覆"}
                        </button>
                      </div>
                    </>
                  )}
                </section>

                {/* 條件渲染回覆區塊 */}
                {activeReplyId === comment.id && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <form>
                      <div className="mb-3">
                        <textarea
                          className={`form-control ${
                            errors.replyContent && "is-invalid"
                          }`}
                          rows="4"
                          placeholder="請輸入回覆..."
                          {...register("replyContent", {
                            required: "你必須輸入回覆",
                          })}
                        ></textarea>
                        <div className="invalid-feedback text-danger">
                          {errors?.replyContent?.message}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          onClick={handleSubmit((data) => {
                            onSubmitReply(data, comment.id);
                          })}
                          className="btn btn-primary"
                        >
                          回覆留言
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
