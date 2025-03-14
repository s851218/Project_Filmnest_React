export default function PaymentAside ({
  handleFormsSubmit,
  orderData,
  projectData,
  productData,
}) {

  return (
    <aside className="col-lg-4 d-lg-block d-none">
      <div className="card checkout-info-sidebar bg-primary-9 border rounded-1 h-auto" style={{border: `1px sold #606060`}}>
        <div className="order-info">
          <div className="card-header p-4">
            <h3 className="mb-5">訂單資訊</h3>
            <h4 className="fs-7 fw-normal mb-3">{projectData.projectTitle}</h4>
            <h4 className="fs-7 fw-normal mb-3">{`【${productData.title}】`}</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="small text-primary-2 mb-0">訂單編號：</h5>
                <p className="mb-0 font-monospace">{orderData.orderId}</p>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-5">
                <h5 className="small text-primary-2 mb-0">訂單金額：</h5>
                <p className="mb-0">NT$ {orderData?.totalPrice.toLocaleString()}</p>
              </li>
              <hr />
              <li className="d-flex justify-content-between align-items-center mb-5">
                <h5 className="fs-7 text-primary-2 mb-0">應付金額：</h5>
                <p className="mb-0 fw-bold fs-7">NT$ <span className="total-number">{orderData?.totalPrice.toLocaleString()}</span></p>
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