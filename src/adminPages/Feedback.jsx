import axios from "axios";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;
const DEFAULT_FEEDBACK_OPTION = {
  title: "",
  price: null,
  contents: [{ item: "" }],
  image: "",
};

// 新增表單按鈕
function AddFormBtn({ handleAddNewOption }) {
  return (
    <div className="d-flex justify-content-end mb-2">
      <i
        type="button"
        className="btn btn-primary bi bi-plus-lg fs-1 lh-1 p-1 rounded-2"
        onClick={handleAddNewOption}
      ></i>
    </div>
  );
}

// 新增內容項目欄位
function FeedbackItems({ optionIndex, control, register }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `feedbackOptions.${optionIndex}.contents`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="my-3">
          <label
            htmlFor={`feedback-item${optionIndex + 1}-${index + 1}`}
            className="form-label"
          >
            回饋內容 #{index + 1}
          </label>
          <div className="input-group">
            <input
              {...register(
                `feedbackOptions.${optionIndex}.contents.${index}.item`
              )}
              id={`feedback-item${optionIndex + 1}-${index + 1}`}
              type="text"
              className="form-control"
            />
            <button
              onClick={() => remove(index)}
              type="button"
              className="btn btn-secondary"
              disabled={fields.length === 1}
            >
              刪除
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          append({ item: "" });
        }}
        type="button"
        className="btn btn-secondary w-100 my-3"
      >
        新增回饋內容
      </button>
    </>
  );
}

function EditFeedbackOption() {}

// 新增回饋選項表單
function AddFeedbackOption() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      feedbackOptions: [DEFAULT_FEEDBACK_OPTION],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "feedbackOptions",
  });
  const [showFields, setShowFields] = useState(false);

  const handleAddNewOption = () => {
    if (showFields === false) {
      setShowFields(true);
      return;
    }
    append(DEFAULT_FEEDBACK_OPTION);
  };

  const onSubmit = async (data) => {
    const dataToSend = data.feedbackOptions.map((option) => ({
      projectId: 1,
      ...option,
      price: Number(option.price),
    }));
    console.log(dataToSend);
    try {
      await axios.post(`${API_BASE}/products`, dataToSend);
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
                <label className="form-label">上傳圖片</label>
                <input
                  {...register(`feedbackOptions.${index}.image`)}
                  type="file"
                  className="form-control"
                />
              </div>

              <div className="d-flex">
                <button type="submit" className="my-3 w-50 btn btn-primary">
                  確認送出
                </button>
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="my-3 w-50 btn btn-primary"
                >
                  取消新增
                </button>
              </div>
            </div>
          ))}
      </form>
    </>
  );
}

export default AddFeedbackOption;
