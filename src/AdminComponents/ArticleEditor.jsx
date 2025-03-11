import Editor from "quill/core/editor";
import "quill/dist/quill.snow.css";

export default function ArticleEditor({ projectId }) {
  return (
    <>
      <h3>這是文字編輯器</h3>
      <p>{projectId}</p>
    </>
  );
}
