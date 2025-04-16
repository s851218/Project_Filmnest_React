import Swal from "sweetalert2";

export const CheckModal = Swal.mixin({
  buttonsStyling: false, // 取消預設按鈕樣式
  heightAuto: false, // 取消預設自適應高度
  customClass: {
    confirmButton: "btn btn-primary-1 border-white px-8 me-2 p-3 fw-bolder",
    cancelButton: "btn btn-primary-0 border-white px-8 ms-2 p-3 fw-bolder",
    container: "",
    popup: "bg-primary-10 border border-white py-7",
    title: "text-white fs-5 pt-0",
    htmlContainer: "text-white pt-0",
  }
})

export const AdminCheckModal = Swal.mixin({
  buttonsStyling: false, // 取消預設按鈕樣式
  heightAuto: false, // 取消預設自適應高度
  customClass: {
    confirmButton: "btn btn-outline-primary-10 border-primary-10 px-8 me-2 p-3 fw-bolder",
    cancelButton: "btn btn-outline-primary-10 border-primary-10 px-8 ms-2 p-3 fw-bolder",
    container: "",
    popup: "bg-primary-2 border border-primary-5 py-7 shadow-lg",
    title: "text-primary-10 fs-5 pt-0",
    htmlContainer: "text-primary-10 pt-0 pb-10",
  }
})

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const Alert = Swal.mixin({
  allowOutsideClick: false, // 允許外部點擊：false
  position: "center",
  showConfirmButton: false,
  timer: 1200,
  timerProgressBar: true,
  heightAuto: false, // 取消預設自適應高度
  customClass: {
    popup: "bg-primary-10 border border-white pt-10 pb-15",
  },
});

// Toast.fire({
//   icon: "success",
//   title: "Signed in successfully"
// });

// .then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
//     Swal.fire("Saved!", "", "success");
//   } else if (result.isDenied) {
//     Swal.fire("Changes are not saved", "", "info");
//   }
// });