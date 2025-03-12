export default function PaymentAside ({handleFormsSubmit}) {

  return (
    <aside className="col-lg-4 d-lg-block d-none">
      <div className="card checkout-info-sidebar bg-primary-9 border rounded-1 h-auto" style={{border: `1px sold #606060`}}>
        <div className="order-info">
          <div className="card-header p-4">
            <h3 className="mb-5">訂單資訊</h3>
            <h4 className="fs-7 fw-normal mb-3">《追風者》群眾募資計畫–【我全都要組】</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="small text-primary-2 mb-0">訂單編號：</h5>
                <p className="mb-0 font-monospace">WINDS100033302</p>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-5">
                <h5 className="small text-primary-2 mb-0">訂單金額：</h5>
                <p className="mb-0">NT$ 2,000</p>
              </li>
              <hr />
              <li className="d-flex justify-content-between align-items-center mb-5">
                <h5 className="fs-7 text-primary-2 mb-0">應付金額：</h5>
                <p className="mb-0 fw-bold fs-7">NT$ <span className="total-number">2,000</span></p>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-primary w-100 my-2" onClick={handleFormsSubmit}>確認付款</button>
          </div>
        </div>
      </div>
    </aside>
  )
}