import { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router";

// const BASE_URL = "https://json-server-vercel-tdcc.onrender.com";

function ModalComponent({modalRef,isModalOpen,setIsModalOpen,children}) {

  const { id } = useParams
  // const [messages, setMessages] = useState([]);

  // const getMessage = async (id = 1) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/comments?projectId=${id}`);
  //     console.log(response.data);
  //     setMessages(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getMessage();
  // }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setError,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const onSubmit = async (data) => {
  //   try {
  //     const timestamp = new Date().toLocaleString();
  //     const dataToSend = {
  //       ...data,
  //       date: timestamp,
  //     };
  //     const response = await axios.post(`${BASE_URL}/comments`, dataToSend);
  //     console.log("送出成功：", response.data);
  //     reset();
  //     hideModal();
  //     alert("送出成功！感謝您的鼓勵與回饋！");
  //     getMessage();
  //   } catch (error) {
  //     console.error("錯誤：", error);
  //     setError("root", {
  //       message: "噢，有地方出錯了…",
  //     });
  //   }
  // };

  // const modalRef = useRef(null);
  // const modalInstance = useRef(null);

  useEffect(() => {
    console.log("初始化",modalRef.current);
    
    // 建立Modal實例
    new Modal(modalRef.current , {
      backdrop : false,
      // 取消Modal背景&預設點擊外面關閉的功能
      keyboard : false
      // 取消Modal使用鍵盤操控
    });
  },[])

  useEffect(() => {
    console.log(isModalOpen);
    if (isModalOpen) {
      Modal.getInstance(modalRef.current).show()
    } else {
      Modal.getInstance(modalRef.current).hide()
    }
  },[isModalOpen])

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
      
        <div className="modal-content bg-primary-9 rounded-1 border-1 border-white">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5" id="exampleModalLabel">更改方案</h1>
            <button
              type="button"
              className="btn-close btn-close-white p-2"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <div className="modal-body px-5 px-lg-10 pb-5 pb-lg-10 pt-0">

            {children}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
