import Swal from "sweetalert2";

export const CheckModal = Swal.mixin({
  buttonsStyling: false, // 接受按鈕樣式：false => 開啟自訂
  heightAuto: false, // 取消預設自適應高度
  customClass: {
    confirmButton: "btn btn-primary-1 border-white px-8 me-2",
    cancelButton: "btn btn-primary-0 border-white px-8 ms-2",
    container: "",
    popup: "bg-primary-10 border border-white pt-5 pb-10",
    title: "text-white fs-5 pt-0",
    htmlContainer: "text-white pt-0 pb-10",
  }
})

export const AdminCheckModal = Swal.mixin({
  buttonsStyling: false, // 接受按鈕樣式：false => 開啟自訂
  heightAuto: false, // 取消預設自適應高度
  customClass: {
    confirmButton: "btn btn-primary-1 border-white px-8 me-2",
    cancelButton: "btn btn-primary-0 border-white px-8 ms-2",
    container: "",
    popup: "bg-primary-10 border border-white pt-5 pb-10",
    title: "text-white fs-5 pt-0",
    htmlContainer: "text-white pt-0 pb-10",
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