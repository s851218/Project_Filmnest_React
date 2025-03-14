import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
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

function AdminFeedbackForm() {
  const { projectId } = useParams();
  let id = projectId || 1;
  const [feedbackData, setFeedbackData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
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

  const getFeedbackData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products?projectId=${id}`);
      setFeedbackData(response.data);
      reset({ choice: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeedbackData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const datasToSend = data.choice.map((feedback) => ({
        ...feedback,
        projectId: id,
      }));
      const requests = datasToSend.map((data) => {
        return axios.put(`${API_BASE}/products/${id}`, data);
      });
      const responses = await Promise.all(requests);
      console.log("全部的請求成功：", responses);
      alert("已成功提交");
      setEditingIndex(null);
      getFeedbackData();
    } catch (error) {
      alert(`提交失敗: ${error.message}`);
    }
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
    // 確保 choiceFields 存在且不為空
    if (!choiceFields || choiceFields.length === 0) {
      return false;
    }

    // 每個選項
    return choiceFields.every((_, choiceIndex) => {
      // 確保 formValues 和 formValues.choice 以及對應的 choice 對象存在
      if (
        !formValues ||
        !formValues.choice ||
        !formValues.choice[choiceIndex]
      ) {
        return false;
      }

      const choice = formValues.choice[choiceIndex];

      // 基本欄位檢查，確保每個字段存在且有值
      if (!choice.image || !choice.title || !choice.price) {
        return false;
      }

      // 確保 contents 數組存在
      if (!Array.isArray(choice.contents) || choice.contents.length === 0) {
        return false;
      }

      // 內容項目檢查，確保每個 item 存在且有值
      return choice.contents.every((content) => {
        return (
          content &&
          typeof content.item === "string" &&
          content.item.trim() !== ""
        );
      });
    });
  }, [formValues, choiceFields]);

  return (
    <div className="container py-10">
      <div className="card shadow-sm bg-primary-2 text-primary-8">
        <div className="card-header bg-primary-3 py-3">
          <h4 className="mb-0 fw-bold">回饋方案設定</h4>
        </div>
        <div className="card-body p-4">
          {/* 表單提交錯誤統一顯示區域 */}
          {/* {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              表單中有錯誤需要修正，請檢查各欄位
            </div>
          )} */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {choiceFields.map((choice, choiceIndex) => {
              const imageValue = watch(`choice.${choiceIndex}.image`);
              const imageInputID = `feedbackImageInput-${choice.id}`;
              const titleInputID = `feedbackTitleInput-${choice.id}`;
              const priceInputID = `feedbackPriceInput-${choice.id}`;
              const hasImage = !!imageValue;
              const isEditing = editingIndex === choiceIndex;

              return (
                <section
                  key={choice.id}
                  className={`mb-4 border rounded ${
                    isEditing ? "border-primary-7 border-2" : "border-primary-3"
                  }`}
                >
                  {/* 標題列與操作按鈕 */}
                  <div className="bg-light p-3 d-flex justify-content-between align-items-center rounded-top">
                    <h5 className="mb-0">回饋項目 #{choiceIndex + 1}</h5>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={`btn ${
                          isEditing ? "btn-outline-primary-6" : "btn-primary-3"
                        } btn-sm d-flex align-items-center`}
                        onClick={() => toggleEdit(choiceIndex)}
                      >
                        <i
                          className={`bi ${
                            isEditing ? "bi-lock" : "bi-pencil"
                          } me-1`}
                        ></i>
                        {isEditing ? "鎖定" : "編輯"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm d-flex align-items-center"
                        onClick={() => removeChoice(choiceIndex)}
                        disabled={choiceFields.length === 1 || !isEditing}
                      >
                        <i className="bi bi-trash me-1"></i>
                        刪除
                      </button>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="row">
                      {/* 左側圖片區域 */}
                      <div className="col-md-5 mb-3 mb-md-0">
                        <div className="mb-1">
                          <label className="form-label mb-2 fw-bold required">
                            項目圖片
                          </label>
                          <input
                            type="text"
                            defaultValue={items.item}
                            disabled={!isEditable}
                            className="form-control"
                            {...register(`item.${index + 1}`)}
                          />
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit((data) => onSubmit(data, feedback.id))}
            >
              送出
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setInputChosen(feedback.id);
                setFocus(`title[${feedback.id}]`);
              }}
              type="button"
              className="btn btn-primary"
            >
              編輯
            </button>
          </form>
        );
      })}
    </>
  );
}

// 新增回饋選項表單
function AddFeedbackOption() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { feedbackOptions: [DEFAULT_FEEDBACK_OPTION] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "feedbackOptions",
  });
  const [showFields, setShowFields] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedfile = event.target.files[0];
    console.log(selectedfile);
    if (selectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedfile);
      reader.onloadend = () => {
        setFile(reader.result); // 存 Base64 字串
      };
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("請選擇一張圖片");
      return;
    }
    const data = {
      image: file, // Base64 格式的圖片
    };

    try {
      const response = await axios.post(`${API_BASE}/uploadImages`, data);
      console.log("成功上傳：", response.data);
      // alert("圖片上傳成功！");
    } catch (error) {
      console.error("上傳失敗：", error);
      // alert("圖片上傳失敗");
    }
  };

  const handleAddNewOption = () => {
    if (showFields === false) {
      setShowFields(true);
      return;
    }
    append(DEFAULT_FEEDBACK_OPTION);
  };

  const onSubmit = async (data) => {
    console.log("data:", data);
    const dataToSend = data.feedbackOptions.map((option) => ({
      projectId: 1,
      ...option,
      image: file,
      price: Number(option.price),
    }));
    console.log("dataToSend:", dataToSend);

    try {
      await Promise.all(
        dataToSend.map((item) => axios.post(`${API_BASE}/products`, item))
      );
    } catch (error) {
      console.error(error);
      alert("新增失敗");
    } finally {
      setShowFields(false);
      reset();
    }
  };
  return (
    <>
      <AddFormBtn handleAddNewOption={handleAddNewOption} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {showFields &&
          fields.map((field, index) => (
            <div key={field.id}>
              <h3>回饋項目 #{index + 1}</h3>

              <div className="my-3">
                <label
                  htmlFor={`feedback-title${index + 1}`}
                  className="form-label"
                >
                  項目名稱
                </label>
                <input
                  {...register(`feedbackOptions.${index}.title`)}
                  id={`feedback-title${index + 1}`}
                  type="text"
                  className="form-control"
                  placeholder="請輸入回饋名稱"
                />
              </div>
              <div className="my-3">
                <label
                  htmlFor={`feedback-price${index + 1}`}
                  className="form-label"
                >
                  金額設定
                </label>
                <input
                  {...register(`feedbackOptions.${index}.price`)}
                  id={`feedback-price${index + 1}`}
                  type="number"
                  className="form-control"
                  placeholder="請輸入回饋金額"
                />
              </div>
              <FeedbackItems
                optionIndex={index}
                control={control}
                register={register}
              />

              <div className="my-3">
                <label
                  htmlFor={`feedback-image${index + 1}`}
                  className="form-label"
                >
                  上傳圖片
                </label>
                <input
                  onChange={handleFileChange}
                  id={`feedback-image${index + 1}`}
                  type="file"
                  accept="image/*"
                  className="form-control"
                />
              </div>

              <div className="d-flex">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary-8 d-flex justify-content-center align-items-center w-lg-50 w-sm-75 w-100"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                      <span role="status">提交中…</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i> 確認送出
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// 內容項目元件
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

  const isEditing = editingIndex === choiceIndex;

  return (
    <div className="mt-1">
      <label className="form-label fw-bold required">項目內容</label>
      <div className="border rounded p-3 bg-primary-1">
        {contentFields.map((content, contentIndex) => {
          const contentInputID = `item-${content.id}`;
          return (
            <div key={content.id} className="mb-2 d-flex align-items-center">
              <div
                className="me-2 text-primary-8 fw-bold"
                style={{ width: "24px" }}
              >
                {contentIndex + 1}.
              </div>
              <div className="input-group">
                <input
                  {...register(
                    `choice.${choiceIndex}.contents.${contentIndex}.item`,
                    {
                      required: "內容項目不可為空",
                    }
                  )}
                  id={contentInputID}
                  disabled={!isEditing}
                  type="text"
                  placeholder="請輸入回饋內容項目"
                  className={`form-control bg-white text-primary-8 ${
                    errors.choice?.[choiceIndex]?.contents?.[contentIndex]?.item
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger border-0 rounded-end"
                  onClick={() => removeContent(contentIndex)}
                  disabled={contentFields.length === 1 || !isEditing}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            </div>
          );
        })}

        {errors.choice?.[choiceIndex]?.contents && (
          <div className="text-danger small mt-1 mb-2">
            <i className="bi bi-exclamation-circle me-1"></i>
            您必須填寫完所有的項目內容
          </div>
        )}

        {isEditing && (
          <div className="d-flex justify-content-center py-2">
            <button
              type="button"
              className="btn btn-primary-7 d-flex align-items-center justify-content-center"
              onClick={() => appendContent({ item: "" })}
              disabled={isLastItemEmpty}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedbackForm;
