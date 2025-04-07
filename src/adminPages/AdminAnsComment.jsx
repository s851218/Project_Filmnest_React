import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import getNewDateFormatted from "../helpers/getNewDateFormatted";
import { Helmet } from "react-helmet-async";
import LightScreenLoading from "../AdminComponents/LightScreenLoading";
import { AdminCheckModal, Alert, Toast } from "../assets/js/costomSweetAlert";

const BASE_URL = import.meta.env.VITE_API_BASE;

export default function AdminAnsComment() {
  const [comments, setComments] = useState([]);
  const [projectOwner, setProjectOwner] = useState(null);
  const [replyingToId, setReplyingToId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const getCommentsData = async (id = 1) => {
      setIsLoading(true);
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/comments?projectId=${id}&_expand=user`);
        const responseForStudio = await axios.get(`${BASE_URL}/projects/${id}?_expand=studio`);
        setProjectOwner(responseForStudio.data.studio.studioProfile);
        const sortedComments = sortCommentsByDate(response.data, sortOrder);
        setComments(sortedComments);
      } catch (error) {
        if (error) {
          Alert.fire({
            icon: "error",
            title: "留言or專案取得失敗",
          });
        }
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };
    getCommentsData();
  }, [sortOrder]);

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

  const {
    register: registerReply,
    handleSubmit: handleSubmitReply,
    reset: resetReply,
    formState: { errors: errorsReply },
  } = useForm({
    defaultValues: {
      replyContent: "",
    },
  });

  const startReply = (commentId) => {
    setReplyingToId(commentId);
  };

  const cancelReply = () => {
    setReplyingToId(null);
    resetReply();
  };

  // 提交回覆功能
  const submitReply = async (data) => {
    try {
      setLoading(true);
      const currentComment = comments.find((comment) => comment.id === replyingToId);
      if (!currentComment) return;
      const updatedComment = {
        ...currentComment,
        reply: data.replyContent,
        replyDate: new Date(),
      };
      await axios.patch(`${BASE_URL}/comments/${replyingToId}`, {
        reply: data.replyContent,
        replyDate: new Date(),
      });

      setComments((prevComments) => prevComments.map((comment) => (comment.id === replyingToId ? updatedComment : comment)));

      resetReply();
      setReplyingToId(null);
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "提交回覆失敗，請稍後再試",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 編輯狀態管理
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // 刪除回覆
  const handleDeleteReply = (commentId) => {
    AdminCheckModal.fire({
      title: "是否要刪除此回覆",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.value) {
        deleteReply(commentId);
      }
    });
  };

  const deleteReply = async (commentId) => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/comments/${commentId}`, {
        reply: "",
        replyDate: "",
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                reply: "",
                replyDate: "",
              }
            : comment
        )
      );
      Toast.fire({
        icon: "success",
        title: "刪除回覆成功",
      });
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "刪除回覆失敗，請稍後再試",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 編輯回覆
  const startEditReply = (replyContent, commentId) => {
    setEditingReplyId(commentId);
    setEditContent(replyContent);
  };

  // 儲存編輯後的回覆
  const saveEditReply = async (commentId) => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/comments/${commentId}`, {
        reply: editContent,
        replyDate: new Date(),
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                reply: editContent,
                replyDate: new Date(),
              }
            : comment
        )
      );
      // 重置編輯狀態
      setEditingReplyId(null);
      setEditContent("");
    } catch (error) {
      if (error) {
        Toast.fire({
          icon: "error",
          title: "儲存回覆失敗，請稍後再試",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 取消編輯
  const cancelEdit = () => {
    setEditingReplyId(null);
    setEditContent("");
  };

  return (
    <>
      <Helmet>
        <title>回覆留言</title>
      </Helmet>
      {/* 展示留言區塊 */}
      <section className="container">
        <div className="d-flex justify-content-between">
          <h1 className="fs-6 lh-2">回覆留言</h1>
          {/* 排序按鈕 */}
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-outline-secondary d-flex align-items-center gap-1" onClick={toggleSortOrder} disabled={loading}>
              <i className={`bi bi-sort-${sortOrder === "desc" ? "down" : "up"}`}></i>
              {sortOrder === "desc" ? "由新到舊" : "由舊到新"}
            </button>
          </div>
        </div>
        {comments.length === 0 && !loading ? (
          <div className="alert alert-info">目前沒有留言</div>
        ) : (
          comments.map((comment) => {
            const commentTime = comment.date ? getNewDateFormatted(comment.date) : "";
            let replyTime;
            if (comment.reply !== "") {
              replyTime = getNewDateFormatted(comment.replyDate);
            }
            return (
              <div key={comment.id} className="mb-6">
                <div className="card rounded-2 border-0 bg-white shadow text-primary-8">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-6">
                      <div className="d-flex align-items-center">
                        {/* 頭像 */}
                        <div className="comment-avatar me-3">
                          {!comment.isIncognito && comment.user?.userProfile?.userImageUrl ? (
                            <img
                              src={comment.user?.userProfile?.userImageUrl}
                              className="img-fluid object-fit-cover me-1"
                              alt={comment.user?.userProfile?.nickName || comment.user?.userProfile?.userName}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50px",
                              }}
                            />
                          ) : (
                            <div className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-1" style={{ width: 50, height: 50 }}>
                              <i className="bi bi-person"></i>
                            </div>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          {/* 名稱 */}
                          <h6 className="mb-1">{comment.isIncognito ? "匿名" : comment.user?.userProfile?.nickName || comment.user?.userProfile?.userName || "訪客"}</h6>
                          {/* 時間 */}
                          <div className="small text-primary-7 d-flex align-items-center gap-2">
                            <i className="bi bi-calendar"></i>
                            {commentTime.split("T")[0]}
                            <i className="bi bi-clock"></i>
                            {commentTime.split("T")[1]}
                          </div>
                        </div>
                      </div>
                      {/* 回覆按鈕 */}
                      {replyingToId !== comment.id && editingReplyId !== comment.id && !comment.reply && (
                        <button className="btn btn-outline-primary-10 btn-sm d-flex align-items-center" onClick={() => startReply(comment.id)}>
                          <i className="bi bi-reply me-1"></i> 回覆
                        </button>
                      )}
                    </div>
                    {/* 內容 */}
                    <div className="p-1">
                      <p>{comment.content}</p>
                    </div>

                    {/* 回覆表單 */}
                    {replyingToId === comment.id && (
                      <div className="mt-3 border-top pt-3">
                        <form onSubmit={handleSubmitReply(submitReply)}>
                          <textarea
                            className={`form-control mb-2 ${errorsReply.replyContent ? "is-invalid" : ""}`}
                            rows="2"
                            placeholder="輸入您的回覆..."
                            {...registerReply("replyContent", {
                              required: "請輸入回覆內容",
                              minLength: {
                                value: 2,
                                message: "回覆內容太短",
                              },
                            })}
                          />
                          {errorsReply.replyContent && <div className="invalid-feedback mb-2">{errorsReply.replyContent.message}</div>}
                          <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-sm btn-secondary me-2" onClick={cancelReply} disabled={loading}>
                              取消
                            </button>
                            <button type="submit" className="btn btn-sm btn-outline-primary-10" disabled={loading}>
                              {loading ? "處理中..." : "送出回覆"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* 已有回覆的顯示區塊 */}
                    {comment.reply && (
                      <>
                        <hr />
                        <div className="bg-primary-1 rounded-1 shadow-sm p-3">
                          <div className="d-flex align-items-center justify-content-between mb-6">
                            <div className="d-flex align-items-center">
                              <div className="comment-avatar me-3">
                                {projectOwner && projectOwner.studioImageUrl ? (
                                  <img
                                    src={projectOwner.studioImageUrl}
                                    className="img-fluid object-fit-cover me-1"
                                    alt={projectOwner.groupName || projectOwner.personResponsible}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: "50px",
                                    }}
                                  />
                                ) : (
                                  <div className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-1" style={{ width: 50, height: 50 }}>
                                    <i className="bi bi-person"></i>
                                  </div>
                                )}
                              </div>
                              <div className="d-flex flex-column">
                                {/* 名稱 */}
                                <h6 className="mb-1">{projectOwner && (projectOwner.groupName || projectOwner.personResponsible)}</h6>
                                {/* 回覆時間 */}
                                {comment.replyDate && (
                                  <div className="small text-primary-7 d-flex align-items-center gap-2">
                                    <i className="bi bi-calendar"></i>
                                    {replyTime.split("T")[0]}
                                    <i className="bi bi-clock"></i>
                                    {replyTime.split("T")[1]}
                                  </div>
                                )}
                              </div>
                            </div>
                            {editingReplyId === comment.id || (
                              <div className="d-flex align-items-center">
                                <button className="btn btn-outline-primary-10 btn-sm me-2 d-flex align-items-center" onClick={() => startEditReply(comment.reply, comment.id)}>
                                  <i className="bi bi-pencil me-1"></i> 編輯
                                </button>
                                <button className="btn btn-outline-danger btn-sm d-flex align-items-center" disabled={loading} onClick={() => handleDeleteReply(comment.id)}>
                                  <i className="bi bi-trash me-1"></i> 刪除
                                </button>
                              </div>
                            )}
                          </div>

                          {/* 編輯中的回覆 */}
                          {editingReplyId === comment.id ? (
                            <div className="mb-3">
                              <textarea className="form-control mb-2" rows="2" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                              <div className="d-flex justify-content-end">
                                <button className="btn btn-sm btn-secondary me-2" onClick={cancelEdit} disabled={loading}>
                                  取消
                                </button>
                                <button className="btn btn-sm btn-outline-primary-10" onClick={() => saveEditReply(comment.id)} disabled={loading}>
                                  {loading ? "儲存中..." : "儲存"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="mb-0 p-1">{comment.reply}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
      <LightScreenLoading isLoading={isLoading} />
    </>
  );
}
