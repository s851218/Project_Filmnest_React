import { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = "https://json-server-vercel-tdcc.onrender.com";

function BulletinBoard() {
  const [messages, setMessages] = useState([]);

  const getMessage = async (id = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments?projectId=${id}`);
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMessage();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const timestamp = new Date().toLocaleString();
      const dataToSend = {
        ...data,
        date: timestamp,
      };
      const response = await axios.post(`${BASE_URL}/comments`, dataToSend);
      console.log("送出成功：", response.data);
      reset();
      hideModal();
      alert("送出成功！感謝您的鼓勵與回饋！");
      getMessage();
    } catch (error) {
      console.error("錯誤：", error);
      setError("root", {
        message: "噢，有地方出錯了…",
      });
    }
  };

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    modalInstance.current = new Modal(modalRef.current, {
      backdrop: false,
    });

    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, [modalRef]);

  const showModal = () => {
    modalInstance.current?.show();
  };

  const hideModal = () => {
    modalInstance.current?.hide();
    reset();
  };

  return (
    <section className="comments">
      <div className="d-lg-none sticky-top-custom mt-3">
        <div className="card border-1 border-white bg-collect-support">
          <div className="card-body py-3 px-3 text-center">
            <h3 className="fs-base mb-3">你的鼓勵都是支持我們創作的原動力</h3>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary fs-base"
                onClick={showModal}
              >
                留下一句話
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 py-lg-20">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row">
              <div className="col-lg-9">
                {messages.map((message) => {
                  return (
                    <div
                      key={message.id}
                      className="card border-1 border-white mb-6"
                    >
                      <div className="card-body">
                        <div className="d-flex mb-6">
                          <img
                            src="/assets/images/icon/account_circle_24dp_FFFFFF_FILL1_wght0_GRAD0_opsz48.png"
                            className="img-fluid object-fit-cover round-circle me-3"
                            alt={message.title}
                          />
                          <div>
                            <h2 className="fs-base mb-1">{message.title}</h2>
                            <p>{message.date.split("T").join(" ")}</p>
                          </div>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-3 d-none d-lg-block">
                <div className="card border-1 border-white sticky-top-custom1">
                  <div className="card-body p-6">
                    <h3 className="fs-6 mb-10 text-center">
                      你的鼓勵都是支持我們創作的原動力
                    </h3>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary fs-7 fw-bolder w-100"
                        onClick={showModal}
                      >
                        留下一句話
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-primary-9 rounded-1 border-1 border-white">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close btn-comment-close p-2"
                onClick={hideModal}
              ></button>
            </div>
            <div className="modal-body px-5 px-lg-10 pb-5 pb-lg-10 pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="form-label fs-base fs-7 fw-bolder text-white mb-1"
                  >
                    您的名稱<span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("title", {
                      required: "此為必填欄位",
                    })}
                    id="title"
                    type="text"
                    className="form-control form-control-custom border-0 bg-white"
                    placeholder="請輸入名稱"
                  />
                  {errors.title && (
                    <small className="text-danger">
                      {errors.title.message}
                    </small>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="content"
                    className="form-label fs-base fs-7 fw-bolder text-white mb-1"
                  >
                    想對專案團隊說<span className="text-danger">*</span>
                  </label>
                  <textarea
                    {...register("content", {
                      required: "此為必填欄位",
                    })}
                    id="content"
                    className="form-control form-control-custom border-0 bg-white"
                    rows="10"
                    placeholder="請輸入內容"
                  />
                  {errors.content && (
                    <small className="text-danger">
                      {errors.content.message}
                    </small>
                  )}
                </div>
                <div className="w-100 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 w-lg-25 py-2 fs-base fs-7 fw-bolder"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    {isSubmitting ? "送出中..." : "送出"}
                  </button>
                  {errors.root && (
                    <small className="text-danger">{errors.root.message}</small>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BulletinBoard;
