import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// const API_BASE = import.meta.env.VITE_API_BASE;
const DEFAULT_FEEDBACK_FORM = {
  choice: [
    {
      image: null,
      title: "",
      price: "",
      contents: [{ item: "" }],
    },
  ],
};

function FeedbackFormTest() {
  const { handleSubmit, register, control, watch, setValue } = useForm({
    defaultValues: DEFAULT_FEEDBACK_FORM,
  });
  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: "choice",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const [previews, setPreviews] = useState({});

  // 監聽圖片變化
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name.includes("image")) {
        const match = name.match(/choice\.(\d+)\.image/);
        if (match) {
          const index = parseInt(match[1]);
          const file = value.choice[index].image;

          if (file instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
              setPreviews((prev) => ({ ...prev, [index]: reader.result }));
            };
            reader.readAsDataURL(file);
          } else {
            setPreviews((prev) => ({ ...prev, [index]: null }));
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const [editingIndex, setEditingIndex] = useState(0);
  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  const addNewChoice = () => {
    const newIndex = choiceFields.length;
    appendChoice({
      image: null,
      title: "",
      price: "",
      contents: [{ item: "" }],
    });
    setEditingIndex(newIndex);
  };

  return (
    <>
      <div className="container py-20">
        <div className="card bg-primary-2 text-primary-8">
          <div className="card-body">
            <h5 className="mb-4">回饋項目</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              {choiceFields.map((choice, choiceIndex) => {
                // const imageFile = watch(`choice.${choiceIndex}.image`);
                const inputId = `feedbackImageInput-${choiceIndex}`;
                const hasPreview = previews[choiceIndex];

                return (
                  <section
                    key={choice.id}
                    className="mb-3 border border-3 border-primary-7 rounded p-5"
                  >
                    <div className="mb-3">
                      <input
                        {...register(`choice.${choiceIndex}.image`)}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setValue(`choice.${choiceIndex}.image`, file);

                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setPreviews((prev) => ({
                                ...prev,
                                [choiceIndex]: reader.result,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        disabled={editingIndex !== choiceIndex}
                        id={inputId}
                        type="file"
                        accept="image/*"
                        className="form-control d-none"
                      />
                      <label htmlFor={inputId} className="d-block mb-0">
                        {hasPreview ? (
                          // 有預覽圖時顯示預覽圖，點擊可重新上傳
                          <div className="position-relative">
                            <img
                              src={previews[choiceIndex]}
                              alt="回饋項目預覽圖片"
                              className="img-thumbnail"
                              style={{
                                maxWidth: "100%",
                                cursor:
                                  editingIndex === choiceIndex
                                    ? "pointer"
                                    : "default",
                              }}
                            />
                            {editingIndex === choiceIndex && (
                              // 啟用時顯示可編輯示意圖
                              <div className="position-absolute top-0 end-0 p-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning rounded-circle"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(inputId).click();
                                  }}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          // 無預覽圖時顯示上傳區塊
                          <div className="d-flex flex-column align-items-center cursor-pointer border border-2 border-dashed p-4 rounded">
                            <i className="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                            <p className="mb-1 required">上傳圖片</p>
                            <p className="text-primary-6 small">
                              請點擊此處上傳
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label required">
                        項目名稱
                      </label>
                      <input
                        {...register(`choice.${choiceIndex}.title`)}
                        disabled={editingIndex !== choiceIndex}
                        type="text"
                        className="form-control bg-white text-primary-8"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label required">
                        金額設定
                      </label>
                      <input
                        {...register(`choice.${choiceIndex}.price`)}
                        disabled={editingIndex !== choiceIndex}
                        type="number"
                        min={0}
                        className="form-control bg-white text-primary-8"
                      />
                    </div>
                    {/* 動態欄位 */}
                    <ContentItems
                      control={control}
                      choiceIndex={choiceIndex}
                      register={register}
                      editingIndex={editingIndex}
                    />

                    <button
                      type="button"
                      className={`btn mt-2 ${
                        editingIndex === choiceIndex
                          ? "btn-success"
                          : "btn-warning"
                      }`}
                      onClick={() => toggleEdit(choiceIndex)}
                    >
                      {editingIndex === choiceIndex ? "鎖定" : "編輯"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-2 ms-2"
                      onClick={() => removeChoice(choiceIndex)}
                      disabled={
                        choiceFields.length === 1 ||
                        editingIndex !== choiceIndex
                      }
                    >
                      刪除此回饋項目
                    </button>
                  </section>
                );
              })}
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNewChoice}
              >
                新增回饋項目
              </button>
              <button type="submit" className="btn btn-success ms-2">
                送出
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const ContentItems = ({ control, choiceIndex, register, editingIndex }) => {
  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({
    control,
    name: `choice.${choiceIndex}.contents`,
  });

  return (
    <div className="mt-3">
      <label htmlFor="" className="form-label required">
        項目內容
      </label>
      {contentFields.map((content, contentIndex) => (
        <div key={content.id} className="mb-2 d-flex align-items-center">
          {/* fields */}
          <input
            {...register(`choice.${choiceIndex}.contents.${contentIndex}.item`)}
            disabled={editingIndex !== choiceIndex}
            type="text"
            className="form-control bg-white text-primary-8"
          />
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={() => removeContent(contentIndex)}
            disabled={
              contentFields.length === 1 || editingIndex !== choiceIndex
            }
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      ))}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => appendContent({ item: "" })}
          disabled={editingIndex !== choiceIndex}
        >
          新增項目
        </button>
      </div>
    </div>
  );
};

export default FeedbackFormTest;
