import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const UploadProjectImage = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0]; //取目標files的內容
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile); // 轉換為 Base64，會進入onload狀態
      reader.onloadend = () => {
        //事件處理器，於每一次讀取結束之後觸發（不論成功或失敗）
        setFile(reader.result); // 存 Base64 字串
        setPreviewUrl(reader.result); // 預覽圖片
      };
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("請選擇一張圖片");
      return;
    }

    const updateData = {
      projectImage: file, // Base64 格式的圖片
    };

    try {
      // 上傳至 projects，patch 部分更新
      const uploadRes = await axios.patch(`${API_BASE}/projects/1`, updateData);
      console.log("成功上傳：", uploadRes.data);
      alert("圖片上傳成功！");

      // 清空狀態
      setFile(null);
      setPreviewUrl("");

      // 如果有 onUploadSuccess 回調，執行
      if (onUploadSuccess) {
        onUploadSuccess(uploadRes.data);
      }
    } catch (error) {
      console.error("上傳失敗：", error);
      alert("圖片上傳失敗");
    }
  };

  return (
    <div>
      <h5>更換封面圖片</h5>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div className="my-2">
          <h5>圖片預覽</h5>
          <img src={previewUrl} alt="" style={{ width: "200px" }} />
        </div>
      )}
      <button type="button" onClick={handleUpload}>
        上傳
      </button>
    </div>
  );
};

export default UploadProjectImage;
