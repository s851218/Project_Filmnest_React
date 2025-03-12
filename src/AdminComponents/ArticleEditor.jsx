import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function ArticleEditor({ setValue, defaultContent }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // 文字編輯器
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });
      // 送出編輯後內容
      quillRef.current.on("text-change", () => {
        const content = quillRef.current.root.innerHTML;
        setValue("content", content);
      });
    }
  }, [setValue]);

  // 編輯器顯示原始圖文內容
  useEffect(() => {
    if (quillRef.current && defaultContent) {
      quillRef.current.root.innerHTML = defaultContent;
      setValue("content", defaultContent);
    }
  }, [defaultContent, setValue]);

  return (
    <>
      <div ref={editorRef} />
    </>
  );
}
