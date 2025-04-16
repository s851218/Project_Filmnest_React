import PropTypes from "prop-types";

const UploadProjectImage = ({ onUploadSuccess }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; //取目標files的內容
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        const fileUrl = reader.result;

        if (onUploadSuccess) {
          onUploadSuccess(fileUrl);
        }
      };
    }
  };

  return (
    <>
      <h2 className="fs-base fw-bolder mb-2">更換封面圖片</h2>
      <input
        type="file"
        className="w-100"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
};

UploadProjectImage.propTypes = {
  onUploadSuccess: PropTypes.func,
};
export default UploadProjectImage;
