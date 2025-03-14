import { useEffect, useState, useMemo } from "react";
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
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FEEDBACK_FORM,
    mode: "onChange",
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
    console.log("提交的資料:", data);
  };

  // 處理檔案上傳並轉換為 base64
  const handleFileUpload = (choiceIndex, file) => {
    if (!file) {
      setValue(`choice.${choiceIndex}.image`, null);

      return;
    }

    // 轉換檔案為 base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setValue(`choice.${choiceIndex}.image`, base64String, {
        shouldValidate: true,
      });
    };
    reader.readAsDataURL(file);
  };

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

  // 監聽整個表單，檢查是否所有必填欄位都有值
  const formValues = watch();

  // 檢查所有選項是否都已填寫完整
  const allFieldsValid = useMemo(() => {
    // 每個選項
    return choiceFields.every((_, choiceIndex) => {
      const choice = formValues.choice[choiceIndex];
      // 基本欄位
      if (!choice.image || !choice.title || !choice.price) {
        return false;
      }
      // 內容項目
      return choice.contents.every((content) => !!content.item);
    });
  }, [formValues, choiceFields]);

  return (
    <>
      <div className="container py-20">
        <div className="card bg-primary-2 text-primary-8">
          <div className="card-body">
            <h5 className="mb-4">回饋項目</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              {choiceFields.map((choice, choiceIndex) => {
                const imageValue = watch(`choice.${choiceIndex}.image`);
                const imageInputID = `feedbackImageInput-${choice.id}`;
                const titleInputID = `feedbackTitleInput-${choice.id}`;
                const priceInputID = `feedbackPriceInput-${choice.id}`;
                const hasImage = !!imageValue;

                return (
                  <section
                    key={choice.id}
                    className="mb-3 border border-3 border-primary-7 rounded p-5"
                  >
                    {/* 上傳圖片區塊 */}
                    <div className="mb-3">
                      {/* 隱藏的 image 欄位，由 react-hook-form 管理 */}
                      <input
                        type="hidden"
                        {...register(`choice.${choiceIndex}.image`, {
                          required: "您必須有一張示意圖片",
                        })}
                      />

                      {/* 實際的檔案上傳元素，但不受 react-hook-form 直接管理 */}
                      <input
                        id={imageInputID}
                        type="file"
                        accept="image/*"
                        className="form-control d-none"
                        disabled={editingIndex !== choiceIndex}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          handleFileUpload(choiceIndex, file);
                        }}
                      />
                      <label htmlFor={imageInputID} className="d-block mb-0">
                        {hasImage ? (
                          // 有圖片時顯示預覽
                          <div className="position-relative">
                            <img
                              src={imageValue}
                              alt="Preview"
                              className="img-thumbnail w-100 object-fit-cover"
                              style={{
                                maxWidth: "100%",
                                // maxHeight: "400px",
                                cursor:
                                  editingIndex === choiceIndex
                                    ? "pointer"
                                    : "default",
                              }}
                            />
                            {editingIndex === choiceIndex && (
                              <div className="position-absolute top-0 end-0 p-5">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning rounded-circle"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document
                                      .getElementById(imageInputID)
                                      .click();
                                  }}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          // 無圖片時顯示上傳區塊
                          <div className="d-flex flex-column align-items-center cursor-pointer border border-2 border-dashed p-4 rounded">
                            <i className="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                            <p className="mb-1 required">上傳圖片</p>
                            <p className="text-primary-6 small">
                              請點擊此處上傳
                            </p>
                          </div>
                        )}
                      </label>
                      {errors.choice?.[choiceIndex]?.image && (
                        <small className="text-danger mt-1">
                          {errors.choice[choiceIndex].image.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={titleInputID}
                        className="form-label required"
                      >
                        項目名稱
                      </label>
                      <input
                        {...register(`choice.${choiceIndex}.title`, {
                          required: "您必須填入項目名稱",
                        })}
                        disabled={editingIndex !== choiceIndex}
                        id={titleInputID}
                        type="text"
                        className="form-control bg-white text-primary-8"
                      />
                      {errors.choice?.[choiceIndex]?.title && (
                        <small className="text-danger mt-1">
                          {errors.choice[choiceIndex].title.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor={priceInputID}
                        className="form-label required"
                      >
                        金額設定
                      </label>
                      <input
                        {...register(`choice.${choiceIndex}.price`, {
                          required: "您必須填入項目金額",
                          min: { value: 1, message: "項目金額必須大於 0" },
                        })}
                        disabled={editingIndex !== choiceIndex}
                        id={priceInputID}
                        type="number"
                        min={1}
                        className="form-control bg-white text-primary-8"
                      />
                      {errors.choice?.[choiceIndex]?.price && (
                        <small className="text-danger mt-1">
                          {errors.choice[choiceIndex].price.message}
                        </small>
                      )}
                    </div>
                    {/* 動態欄位 */}
                    <ContentItems
                      control={control}
                      choiceIndex={choiceIndex}
                      register={register}
                      editingIndex={editingIndex}
                      errors={errors}
                      watch={watch}
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
                disabled={!allFieldsValid}
              >
                新增回饋項目
              </button>
              <button type="submit" className="btn btn-success ms-2">
                送出
              </button>
              {!allFieldsValid && (
                <small className="text-mute mt-2">
                  請完成所有欄位才能新增回饋項目
                </small>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const ContentItems = ({
  control,
  choiceIndex,
  register,
  editingIndex,
  errors,
  watch,
}) => {
  const {
    fields: contentFields,
    append: appendContent,
    remove: removeContent,
  } = useFieldArray({
    control,
    name: `choice.${choiceIndex}.contents`,
  });
  const contents = watch(`choice.${choiceIndex}.contents`);
  const isLastItemEmpty =
    contents &&
    contents.length > 0 &&
    !contents[contents.length - 1].item.trim();
  return (
    <div className="mt-3">
      <label htmlFor="" className="form-label required">
        項目內容
      </label>
      {contentFields.map((content, contentIndex) => {
        const contentInputID = `item-${content.id}`;
        return (
          <div key={content.id} className="mb-2 d-flex align-items-center">
            {/* fields */}

            <div className="input-group">
              <input
                {...register(
                  `choice.${choiceIndex}.contents.${contentIndex}.item`,
                  {
                    required: "你必須填寫完所有的項目內容",
                  }
                )}
                id={contentInputID}
                disabled={editingIndex !== choiceIndex}
                type="text"
                className="form-control bg-white text-primary-8 "
              />

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeContent(contentIndex)}
                disabled={
                  contentFields.length === 1 || editingIndex !== choiceIndex
                }
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        );
      })}
      {errors.choice?.[choiceIndex]?.contents && (
        <small className="text-danger mt-1">你必須填寫完所有的項目內容</small>
      )}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => appendContent({ item: "" })}
          disabled={editingIndex !== choiceIndex || isLastItemEmpty}
        >
          新增項目
        </button>
      </div>
    </div>
  );
};

export default FeedbackFormTest;
