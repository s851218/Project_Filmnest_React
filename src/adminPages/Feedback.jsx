import axios from "axios";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router";
import LightScreenLoading from "../AdminComponents/LightScreenLoading";
import { AdminCheckModal, Toast } from "../assets/js/costomSweetAlert";
import PropTypes from "prop-types";

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
  const [isLoading, setIsLoading] = useState(false);

  const originalFeedbackRef = useRef([]);

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    setFocus,
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

  const handleRemoveChoice = (choiceIndex) => {
    console.log(choiceIndex);

    const item = feedbackData[choiceIndex];
    console.log(item);

    if (!item) {
      AdminCheckModal.fire({
        title: "是否要刪除此回饋項目",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "取消",
      }).then((result) => {
        console.log(result);
        if (result.value) {
          console.log("已確認刪除");
          removeChoice(choiceIndex);
        }
      });
    } else {
      AdminCheckModal.fire({
        title: "是否要刪除此回饋項目",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        html: `<hr><img src="${item.image}"><p class="fs-4">【${item.title}】</p>`,
      }).then((result) => {
        console.log(result);
        if (result.value) {
          console.log("已確認刪除");
          removeChoice(choiceIndex);
        }
      });
    }
  };

  const getFeedbackData = useCallback( async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/products?projectId=${id}`);
      originalFeedbackRef.current = response.data;
      setFeedbackData(response.data);
      reset({ choice: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  },[id,reset])
  useEffect(() => {
    getFeedbackData();
  }, [reset,getFeedbackData]);

  const onSubmit = async (data) => {
    // 處理批量請求：比對資料
    const currentItems = data.choice;
    const originalItems = originalFeedbackRef.current;

    // 更新項目：id 相同，且內容不同者
    const updatedItems = currentItems.filter((item) => {
      const original = originalItems.find((o) => o.id === item.id);
      return original && JSON.stringify(original) !== JSON.stringify(item);
    });

    // 新增項目：沒有 id 者
    const newItems = currentItems.filter((item) => !item.id);

    // 刪除項目：之前有 id，但現在沒有者
    const deletedItems = originalItems.filter(
      (item) => !currentItems.some((current) => current.id === item.id)
    );
    try {
      const requests = [];

      // 更新請求
      if (updatedItems.length > 0) {
        updatedItems.forEach((updatedItem) => {
          const updateRequest = axios.put(
            `${API_BASE}/products/${updatedItem.id}`,
            { ...updatedItem, price: Number(updatedItem.price) }
          );
          requests.push(updateRequest);
        });
      }

      // 新增請求
      if (newItems.length > 0) {
        newItems.forEach((newItem) => {
          const postRequest = axios.post(`${API_BASE}/products`, {
            ...newItem,
            projectId: id,
            price: Number(newItem.price),
          });
          requests.push(postRequest);
        });
      }

      // 刪除請求
      if (deletedItems.length > 0) {
        deletedItems.forEach((deletedItem) => {
          const deleteRequest = axios.delete(
            `${API_BASE}/products/${deletedItem.id}`
          );
          requests.push(deleteRequest);
        });
      }

      const results = await Promise.allSettled(requests);

      // 處理請求結果
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error("請求失敗:", result.reason);
        }
      });
      Toast.fire({
        icon: "success",
        title: "請求已完成",
      });
      setEditingIndex(null);
      getFeedbackData();
    } catch (error) {
      console.error(`提交失敗: ${error.message}`);
      Toast.fire({
        icon: "error",
        title: "提交失敗",
      });
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
    setTimeout(() => setFocus(`choice.${newIndex}.title`), 0);
    // setFocus(`choice.${newIndex}.title`);
  };

  // 監聽整個表單，檢查是否所有必填欄位都有值
  const formValues = watch();

  // 檢查所有選項是否都已填寫完整
  const allFieldsValid = useMemo(() => {
    // 確保 choiceFields 存在
    if (!choiceFields || choiceFields.length === 0) {
      return false;
    }
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

      // 基本欄位檢查
      if (!choice.image || !choice.title || !choice.price) {
        return false;
      }

      // 檢查 contents 陣列存在
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

  // 檢查表單是否變更過
  const isFormChanged = useMemo(() => {
    if (!formValues || !originalFeedbackRef.current) return false;

    const currentItems = formValues.choice;
    const originalItems = originalFeedbackRef.current;

    // 檢查是否有變更（更新、刪除、新增）
    const hasUpdates = currentItems.some((item) => {
      const originalItem = originalItems.find((o) => o.id === item.id);
      return (
        originalItem && JSON.stringify(originalItem) !== JSON.stringify(item)
      );
    });

    const hasNewItems = currentItems.some((item) => !item.id);
    const hasDeletedItems = originalItems.some(
      (item) => !currentItems.some((c) => c.id === item.id)
    );

    return hasUpdates || hasNewItems || hasDeletedItems;
  }, [formValues]);

  return (
    <>
      <div className="container py-10">
        <div className="card shadow-sm bg-primary-2 text-primary-8">
          <div className="card-header bg-primary-3 py-3 d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold">回饋方案設定</h4>
            <button
              type="button"
              className="btn btn-primary d-flex justify-content-center align-items-center"
              onClick={addNewChoice}
              disabled={!allFieldsValid}
            >
              <i className="bi bi-plus-circle me-2"></i>
              新增回饋項目
            </button>
          </div>
          <div className="card-body p-4">
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
                      isEditing
                        ? "border-primary-7 border-2"
                        : "border-primary-3"
                    }`}
                  >
                    {/* 標題列與操作按鈕 */}
                    <div className="bg-light p-3 d-flex justify-content-between align-items-center rounded-top">
                      <h5 className="mb-0">回饋項目 #{choiceIndex + 1}</h5>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className={`btn ${
                            isEditing
                              ? "btn-outline-primary-6"
                              : "btn-primary-3"
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
                          onClick={() => handleRemoveChoice(choiceIndex)}
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
                              type="hidden"
                              {...register(`choice.${choiceIndex}.image`, {
                                required: "您必須上傳一張示意圖片",
                              })}
                            />
                            <input
                              id={imageInputID}
                              type="file"
                              accept="image/*"
                              className="form-control d-none"
                              disabled={!isEditing}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                handleFileUpload(choiceIndex, file);
                              }}
                            />
                            <label
                              htmlFor={imageInputID}
                              className="d-block mb-0"
                            >
                              {hasImage ? (
                                <div className="position-relative">
                                  <div className="ratio ratio-4x3 overflow-hidden rounded">
                                    <img
                                      src={imageValue}
                                      alt="Preview"
                                      className="w-100 h-100 object-fit-cover border border-2 border-primary-8 rounded"
                                    />
                                  </div>
                                  {isEditing && (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-warning position-absolute top-0 end-0 m-2 rounded-circle"
                                      style={{ width: "32px", height: "32px" }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        document
                                          .getElementById(imageInputID)
                                          .click();
                                      }}
                                    >
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="d-flex flex-column align-items-center justify-content-center border-2 border-dashed rounded bg-light p-4 ratio ratio-16x9"
                                  style={{
                                    cursor: isEditing ? "pointer" : "default",
                                  }}
                                >
                                  {errors.choice?.[choiceIndex]?.image && (
                                    <div className="text-danger small p-2">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.choice[choiceIndex].image.message}
                                    </div>
                                  )}
                                  <div
                                    className={`d-flex align-items-center justify-content-center border ${
                                      errors.choice?.[choiceIndex]?.image &&
                                      "border-danger"
                                    }`}
                                  >
                                    <div
                                      className={`d-flex flex-column align-items-center justify-content-center ${
                                        errors.choice?.[choiceIndex]?.image
                                          ? "text-danger"
                                          : "text-primary-6"
                                      }`}
                                    >
                                      <i className="bi bi-cloud-arrow-up fs-1 mb-2"></i>
                                      <p className="mb-1 fw-bold required">
                                        上傳圖片
                                      </p>
                                      <p className="small mb-0">
                                        {isEditing
                                          ? "點擊此處上傳圖片"
                                          : "尚未上傳圖片"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* 右側表單欄位 */}
                        <div className="col-md-7">
                          <div className="row mb-3">
                            <div className="col-md-7 mb-3 mb-md-0">
                              <label
                                htmlFor={titleInputID}
                                className="form-label fw-bold required"
                              >
                                項目名稱
                              </label>
                              <input
                                {...register(`choice.${choiceIndex}.title`, {
                                  required: "您必須填入項目名稱",
                                })}
                                disabled={!isEditing}
                                id={titleInputID}
                                type="text"
                                placeholder="請輸入回饋項目名稱"
                                className={`form-control bg-white text-primary-8 ${
                                  errors.choice?.[choiceIndex]?.title
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.choice?.[choiceIndex]?.title && (
                                <div className="invalid-feedback">
                                  {errors.choice[choiceIndex].title.message}
                                </div>
                              )}
                            </div>
                            <div className="col-md-5">
                              <label
                                htmlFor={priceInputID}
                                className="form-label fw-bold required"
                              >
                                金額設定
                              </label>
                              <div className="input-group">
                                <span className="input-group-text bg-white text-primary-8">
                                  NT$
                                </span>
                                <input
                                  {...register(`choice.${choiceIndex}.price`, {
                                    required: "您必須填入項目金額",
                                    min: {
                                      value: 1,
                                      message: "金額必須大於 0",
                                    },
                                  })}
                                  disabled={!isEditing}
                                  id={priceInputID}
                                  type="number"
                                  min={1}
                                  placeholder="0"
                                  className={`form-control bg-white text-primary-8 ${
                                    errors.choice?.[choiceIndex]?.price
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {errors.choice?.[choiceIndex]?.price && (
                                  <div className="invalid-feedback">
                                    {errors.choice[choiceIndex].price.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* 內容項目列表 */}
                          <ContentItems
                            control={control}
                            choiceIndex={choiceIndex}
                            register={register}
                            editingIndex={editingIndex}
                            errors={errors}
                            watch={watch}
                          />
                          <div>
                            {!allFieldsValid && (
                              <div className="text-primary-7 fst-italic text-end">
                                <i className="bi bi-info-circle me-1"></i>
                                <small className="me-2">
                                  完成所有欄位才能新增回饋項目唷
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}

              {/* 表單操作按鈕區 */}
              <div className="d-flex justify-content-center align-items-center mt-4 pt-3 border-top">
                <div className="d-flex gap-2 w-lg-50 w-sm-75 w-100 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary d-flex justify-content-center align-items-center w-lg-50 w-sm-75 w-100"
                    onClick={addNewChoice}
                    disabled={!allFieldsValid}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    新增回饋項目
                  </button>
                  <button
                    disabled={isSubmitting || !isFormChanged}
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
      <LightScreenLoading isLoading={isLoading} />
    </>
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

  const handleRemoveContent = (contentIndex) => {
    const itemName = contentFields[contentIndex].item;
    console.log(itemName);

    AdminCheckModal.fire({
      title: "是否要刪除此回饋項目",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      html: `<hr><p class="fs-6">【${itemName}】</p>`,
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log("已確認刪除");
        removeContent(contentIndex);
      }
    });
  };

  const contents = watch(`choice.${choiceIndex}.contents`);
  const isLastItemEmpty =
    contents &&
    contents.length > 0 &&
    !contents[contents.length - 1].item.trim();

  const isEditing = editingIndex === choiceIndex;

  return (
    <>
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
                      errors.choice?.[choiceIndex]?.contents?.[contentIndex]
                        ?.item
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger border-0 rounded-end"
                    onClick={() => handleRemoveContent(contentIndex)}
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
    </>
  );
};

ContentItems.propTypes = {
  control: PropTypes.object,
  choiceIndex: PropTypes.number,
  register: PropTypes.func,
  editingIndex: PropTypes.number,
  errors: PropTypes.object,
  watch: PropTypes.func,
};

export default AdminFeedbackForm;
