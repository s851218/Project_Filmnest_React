const API_BASE = import.meta.env.VITE_API_BASE;
const DEFAULT_FEEDBACK_OPTION = {
  title: "",
  price: "",
  contents: [{ item: "" }],
  image: "",
};

function FeedbackFormTest() {
  return (
    <>
      <div className="container py-20">
        <div className="card bg-primary-2 text-primary-8">
          <div className="card-body">
            <h5 className="mb-4">回饋項目</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  項目名稱
                </label>
                <input
                  type="text"
                  className="form-control bg-white text-primary-8"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  金額設定
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control bg-white text-primary-8"
                />
              </div>
              {/* 動態欄位 */}
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  項目內容
                </label>
                {/* fields */}
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control bg-white text-primary-8"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success bg-white"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger bg-white"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <button type="button" className="btn btn-sm btn-primary">
                  新增項目
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  上傳圖片
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-white text-primary-8"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackFormTest;
