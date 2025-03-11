import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;
const DEFAULT_FEEDBACK_OPTION = {
  title: "",
  price: "",
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

function EditFeedbackOption({ submittedData }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [inputChosen, setInputChosen] = useState(null);
  // const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit, setFocus } = useForm();

  // 取得資料
  useEffect(() => {
    const controller = new AbortController();
    const getFeedbackData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/products`, {
          signal: controller.signal,
        });
        const allData = response.data;
        const dataId1 = allData.filter((data) => data.projectId === 1); // 暫定寫死
        setFeedbackData(dataId1);
      } catch (error) {
        if (axios.isCancel(error)) console.log("請求已被取消:", error.message);
        else console.error("獲取資料失敗：", error);
      }
    };

    getFeedbackData();

    return () => controller.abort();
  }, [submittedData]);

  const onSubmit = (data, id) => {
    console.log(data, id);
  };

  return (
    <>
      {feedbackData.map((feedback, index) => {
        const targetID = `accordion-${feedback.id}`;
        const isEditable = inputChosen === feedback.id;

        return (
          <form key={feedback.id}>
            <div className="accordion" id="FeedbackAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${targetID}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={targetID}
                  >
                    #{index + 1} {feedback.title}
                  </button>
                </h2>
                <div
                  id={targetID}
                  className="accordion-collapse collapse show"
                  data-bs-parent="#FeedbackAccordion"
                >
                  <div className="accordion-body">
                    <div>
                      <img src={feedback.image} alt={feedback.title} />
                    </div>
                    <label className="form-label my-3" htmlFor="">
                      項目名稱
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        defaultValue={feedback.title}
                        disabled={!isEditable}
                        className="form-control"
                        {...register(`title[${feedback.id}]`)}
                      />
                    </div>
                    <label className="form-label my-3" htmlFor="">
                      項目金額
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        defaultValue={feedback.price}
                        disabled={!isEditable}
                        className="form-control"
                        {...register(`price[${feedback.id}]`)}
                      />
                    </div>
                    <label htmlFor="">項目內容</label>
                    {feedback.contents.map((items, index) => (
                      <section key={index}>
                        <div className="input-group my-3">
                          <label className="form-label" htmlFor="">
                            {index + 1}.
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
                  onClick={handleUpload}
                  type="submit"
                  className="my-3 w-50 btn btn-primary"
                >
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
      <EditFeedbackOption submittedData={onSubmit} />
    </>
  );
}

export default AddFeedbackOption;
