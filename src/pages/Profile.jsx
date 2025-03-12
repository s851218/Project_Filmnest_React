import PersonalCenterSidebar from "../components/PersonalCenterSidebar";
export default function Profile() {
  return (
    <div className="container">
      <div className="justify-content-between align-items-center mb-7 d-none d-lg-flex">
        <h1 className="fs-6">編輯個人資料</h1>
        <button className="d-flex align-items-center btn btn-primary py-3 px-4">
          <span className="fs-sm fw-bolder me-2">儲存</span>
          <span class="material-symbols-outlined align-bottom fs-7">check</span>
        </button>
      </div>
      <div className="bg-primary-8 rounded-4 d-flex flex-column flex-lg-row align-items-center p-10">
        <div className="d-block d-lg-none w-100 mb-5">
          <PersonalCenterSidebar />
        </div>
        <div className="me-lg-11">
          <div className="mb-3">
            <div style={{ width: "280px", height: "280px" }} className="mb-5">
              <img src="首頁_輪播_01.jpg" alt="" className="object-fit-cover h-100" />
            </div>
            <button className="btn btn-primary-9 border d-flex align-items-center w-100">
              <span>選擇檔案</span>
              <span class="material-symbols-outlined ms-1 fs-7">folder</span>
            </button>
            <input type="file" className="d-none" id="formFile" />
          </div>
        </div>
        <div>
          <form className="row g-3">
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control bg-primary-9" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <button className="btn btn-primary-9 border d-flex align-items-center py-2 px-4">
                <span class="fs-sm">變更密碼</span>
                <span class="material-symbols-outlined ms-1 fs-base ">edit</span>
              </button>
            </div>
            <div className="col-6">
              <label for="inputAddress" className="form-label">
                Address
              </label>
              <input type="text" className="form-control bg-primary-9" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="col-6">
              <label for="inputAddress2" className="form-label">
                Address
              </label>
              <input type="text" className="form-control bg-primary-9" id="inputAddress2" placeholder="1234 Main St" />
            </div>
            <div className="col-6">
              <label for="inputAddress3" className="form-label">
                Address
              </label>
              <input type="text" className="form-control bg-primary-9" id="inputAddress3" placeholder="1234 Main St" />
            </div>
            <div className="col-6">
              <label for="inputAddress4" className="form-label">
                Address
              </label>
              <input type="text" className="form-control bg-primary-9" id="inputAddress4" placeholder="1234 Main St" />
            </div>
            <div className="col">
              <label for="inputAddress5" className="form-label">
                Address
              </label>
              <textarea className="form-control bg-primary-9" rows="3" id="inputAddress5" placeholder="1234 Main St" />
            </div>
          </form>
        </div>
        <button className="align-items-center btn btn-primary py-3 px-4 d-block d-lg-none w-100 mt-4">
          <span className="fs-sm fw-bolder me-2">儲存</span>
          <span class="material-symbols-outlined align-bottom fs-7">check</span>
        </button>
      </div>
    </div>
  );
}
