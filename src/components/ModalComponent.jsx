import { useEffect } from "react";
import { Modal } from "bootstrap";
import FeedbackSwiper from "../components/FeedbackSwiper";

function ModalComponent({
  modalRef,
  isModalOpen,
  setIsModalOpen,
  modalType,
  totalPrice,
  handleBonusCheck,
  handleBonusReset,
  children,
}) {
  
  useEffect(() => {    
    // 建立Modal實例
    new Modal(modalRef.current , {
      backdrop : false,
      // 取消Modal背景&預設點擊外面關閉的功能
      keyboard : false
      // 取消Modal使用鍵盤操控
    });
  },[])

  useEffect(() => {
    if (isModalOpen) {
      Modal.getInstance(modalRef.current).show()
    } else {
      Modal.getInstance(modalRef.current).hide()
    }
  },[isModalOpen])

  let modalTitle
  switch (modalType) {
    case "change":
      modalTitle = "更改方案"
      break;

    case "bonus":
      modalTitle = "我要加碼"
      break;
      
    case "check":
      modalTitle = "訂單資訊"
      break;
  
    default:
      break;
  }

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
      
        <div className="modal-content bg-primary-9 rounded-1 border-1 border-white">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5">
              {modalTitle}
            </h1>
            <button
              type="button"
              className="btn-close btn-close-white p-2"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <div className="modal-body px-5 px-lg-10 pb-5 pb-lg-10 pt-0">
            { modalType === "change" && <FeedbackSwiper />}
            { modalType === "bonus" && (
              <>
                <div className="d-flex align-items-center mb-4">
                  <p className="mb-0">多給一點點，讓夢想早日實現</p> 
                  <span className="material-symbols-outlined ms-1 fs-base icon-fill text-danger">favorite</span>
                </div>
                {children}
                <div className="bg-primary-8 p-6 rounded-1">
                  <p className="mb-0 text-center">總計：NT$ {totalPrice.toLocaleString()}</p>
                </div>
              </>
            )}
            { modalType === "check" && <>{children}</> }
          </div>
          { modalType === "bonus" && (
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleBonusReset}>取消</button>
              <button type="button" className="btn btn-primary" onClick={handleBonusCheck}>確認加碼</button>
            </div>
          )}
          { modalType === "check" && (
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-100" onClick={() => setIsModalOpen(false)}>確認訂單</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
