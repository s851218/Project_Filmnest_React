export default function PaymentMobileFooter ({handleFormsSubmit}) {
  return (
    <>
      <footer className="checkout-footer d-lg-none d-block p-4 bg-primary-8 fixed-bottom">
        {/* 手機版：aside 變成 footer */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#checkoutModal">
            查看訂單
          </button>
          {/* <div className="d-flex flex-column gap-1 w-auto">
            <div className="d-flex">
              <p className="mb-0 d-xs1-block">方案名稱：</p>
              <strong>《追風者》【我全都要組】</strong>
            </div>
            <p className="mb-0 d-xs1-block">訂單編號：WINDS100033302</p>
          </div> */}
          <div className="d-flex align-items-center gap-3 justify-content-between">
            <p className="total-amount fs-7 mb-0">NT$ 2,000</p>
            <button type="button" className="btn btn-primary ms-auto" onClick={handleFormsSubmit}>確認付款</button>
          </div>
        </div>
      </footer>

      {/* checkout-modal */}
      <div className="modal fade checkout-modal" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-primary-9 rounded-1 border border-primary-1">
            <div className="modal-header">
              <h5 className="modal-title fs-sm-6 fs-7" id="checkoutModal">《追風者》群眾募資計畫【我全都要組】</h5>
              <button type="button" className="material-symbols-outlined text-white border-0 ms-auto" data-bs-dismiss="modal" aria-label="Close">close</button>
              {/* style={{backgroundColor: transparent}} */}
            </div>
            <div className="modal-body d-flex flex-column justify-content-between">
              <ul className="list-unstyled d-flex flex-column gap-5 lh-1">
                <li className="d-flex justify-content-between align-items-center">
                  <small className="mb-0 text-primary-3 lh-1">訂單編號：</small>
                  <p className="mb-0 lh-1">WINDS100033302</p>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <small className="text-primary-3">方案金額：</small>
                  <p className="mb-0">NT$2,000</p>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <small className="text-primary-3">加購項目：</small>
                  <p className="mb-0">無</p>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <small className="text-primary-3">加購金額：</small>
                  <p className="mb-0">NT$0</p>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  <small className="text-primary-3">加碼金額：</small>
                  <p className="mb-0">NT$0</p>
                </li>
              </ul>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">總計：</p>
                <p className="fs-7 fw-bold mb-0">NT$2,000</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal">確認訂單</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}