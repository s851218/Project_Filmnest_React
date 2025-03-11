import { useState } from "react";

const CommentBoard = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ken",
      date: "2024年8月4日",
      time: "17:30",
      content: "很喜歡這樣紀錄片的風格，期待創作者能做出更多的作品",
      isAdmin: false,
      likes: 15,
      replies: [
        {
          id: 101,
          author: "Admin小明",
          date: "2024年8月5日",
          time: "09:45",
          content: "謝謝您的支持！我們會繼續努力創作更多優質內容，敬請期待！",
          isAdmin: true,
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: "Lily",
      date: "2024年8月5日",
      time: "10:15",
      content: "這部紀錄片拍得太棒了，攝影師的視角非常獨特",
      isAdmin: false,
      likes: 8,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const now = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = now.toLocaleDateString("zh-TW", options);
      const time = now.toLocaleTimeString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newCommentObj = {
        id: comments.length + 1,
        author: "訪客",
        date,
        time,
        content: newComment,
        isAdmin: false,
        likes: 0,
        replies: [],
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="container py-4">
      {/* 留言表單 */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">留下一句話</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="分享您的想法..."
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                發表留言
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="comment-avatar me-3">
                    {comment.isAdmin ? (
                      <div
                        className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 50, height: 50 }}
                      >
                        <i className="bi bi-person"></i>
                      </div>
                    ) : (
                      <div
                        className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 50, height: 50 }}
                      >
                        <i className="bi bi-person"></i>
                      </div>
                    )}
                  </div>
                  <div>
                    <h6 className="mb-0 d-flex align-items-center">
                      {comment.author}
                      {comment.isAdmin && (
                        <span className="badge bg-danger ms-2">版主</span>
                      )}
                    </h6>
                    <div className="small text-muted d-flex align-items-center">
                      <i className="bi bi-calendar me-1"></i>
                      {comment.date}
                      <i className="bi bi-clock ms-2 me-1"></i>
                      {comment.time}
                    </div>
                  </div>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="d-flex align-items-center mt-3">
                  <button className="btn btn-outline-primary btn-sm me-2 d-flex align-items-center">
                    <i className="bi bi-heart me-1"></i> 喜歡{" "}
                    {comment.likes > 0 && `(${comment.likes})`}
                  </button>
                  <button className="btn btn-outline-secondary btn-sm d-flex align-items-center">
                    <i className="bi bi-share me-1"></i> 分享
                  </button>
                </div>
              </div>
            </div>

            {/* 回覆區塊 */}
            {comment.replies.length > 0 && (
              <div className="ms-5 mt-2">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="card mb-2 shadow-sm border-start border-danger border-3"
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <div className="comment-avatar me-3">
                          <div
                            className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: 40, height: 40 }}
                          >
                            <i className="bi bi-person"></i>
                          </div>
                        </div>
                        <div>
                          <h6 className="mb-0 d-flex align-items-center">
                            {reply.author}
                            {reply.isAdmin && (
                              <span className="badge bg-danger ms-2">版主</span>
                            )}
                          </h6>
                          <div className="small text-muted d-flex align-items-center">
                            <i className="bi bi-calendar me-1"></i>
                            {reply.date}
                            <i className="bi bi-clock ms-2 me-1"></i>
                            {reply.time}
                          </div>
                        </div>
                      </div>
                      <p className="mb-2">{reply.content}</p>
                      <div className="d-flex align-items-center mt-3">
                        <button className="btn btn-outline-primary btn-sm me-2 d-flex align-items-center">
                          <i className="bi bi-heart me-1"></i> 喜歡{" "}
                          {reply.likes > 0 && `(${reply.likes})`}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 支援訊息 */}
      <div className="card bg-dark text-white mt-4">
        <div className="card-body text-center">
          <h5>你的鼓勵都是支持我們創作的原動力</h5>
          <button className="btn btn-light mt-2">留下一句話</button>
        </div>
      </div>
    </div>
  );
};

export default CommentBoard;
