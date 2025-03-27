import { useRef, useState } from "react";
import ModalComponent from "../components/ModalComponent"
import PropTypes from 'prop-types';

export default function PaymentMobileFooter ({handleFormsSubmit , orderData , projectData , productData }) {

  PaymentMobileFooter.propTypes = {
    handleFormsSubmit : PropTypes.func,
    orderData : PropTypes.object,
    projectData : PropTypes.object,
    productData : PropTypes.object,
  }

  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType , setModalType] = useState(null);

  // 處理開啟Modal
  const handleOpenModal = (type) => {
    setModalType(type)
    // 開啟modal
    setIsModalOpen(true);
  };

  const totalPrice = orderData.totalPrice

  return (
    <>
    {Object.keys(orderData).length !== 0 && (
      <>
        <footer className="checkout-footer d-lg-none d-block p-4 bg-primary-8 fixed-bottom">
          {/* 手機版：aside 變成 footer */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <button type="button" className="btn btn-secondary" onClick={() => handleOpenModal("check")}>
              查看訂單
            </button>
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <p className="total-amount fs-7 mb-0">NT$ {totalPrice.toLocaleString()}</p>
              <button type="button" className="btn btn-primary ms-auto" onClick={handleFormsSubmit}>確認付款</button>
            </div>
          </div>
        </footer>

        <ModalComponent 
          modalType={modalType}
          modalRef={modalRef}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          totalPrice={totalPrice}
        >
          <ul className="list-unstyled d-flex flex-column gap-5 lh-1">
            <li className="d-flex justify-content-between align-items-center">
              <small className="mb-0 text-primary-3 lh-1 flex-shrink-0">專案名稱：</small>
              <p className="mb-0 lh-1 text-end">{projectData.projectTitle}</p>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <small className="mb-0 text-primary-3 lh-1 flex-shrink-0">方案名稱：</small>
              <p className="mb-0 lh-1">【{productData.title}】</p>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <small className="mb-0 text-primary-3 lh-1 flex-shrink-0">訂單編號：</small>
              <p className="mb-0 lh-1">{orderData.orderId}</p>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <small className="mb-0 text-primary-3">方案金額：</small>
              <p className="mb-0">NT$ {productData.price.toLocaleString()}</p>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <small className="mb-0 text-primary-3">加碼金額：</small>
              <p className="mb-0">NT$ {orderData.bonus.toLocaleString()}</p>
            </li>
          </ul>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">總計：</p>
            <p className="fs-7 fw-bold mb-0">NT$ {totalPrice.toLocaleString()}</p>
          </div>
        </ModalComponent>
      </>)}
    </>
  )
}