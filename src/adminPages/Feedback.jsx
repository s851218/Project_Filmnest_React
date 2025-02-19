import { useForm, useFieldArray } from "react-hook-form";

function AddFeedbackOption() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      price: "",
      contents: [{ item: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="card">
      <h2 className="mb-4">回饋項目</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="product-title" className="form-label">
            項目名稱
          </label>
          <input
            {...register("title")}
            id="product-title"
            type="text"
            className="form-control"
            placeholder="請輸入這個項目的名稱"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product-price" className="form-label">
            金額設定
          </label>
          <input
            {...register("price")}
            id="product-price"
            type="text"
            className="form-control"
            placeholder="請輸入您設定的金額"
          />
        </div>

        <button
          onClick={() => {
            append({ item: "" });
          }}
          type="button"
          className="btn btn-secondary w-100"
        >
          新增回饋內容
        </button>

        {fields.map((field, index) => (
          <div key={field.id} className="input-group mb-3">
            <input
              {...register(`contents.${index}.item`)}
              className="form-control"
            />
            <button
              onClick={() => remove(index)}
              type="button"
              className="btn btn-secondary"
            >
              刪除
            </button>
          </div>
        ))}

        <div className="mt-4">
          <button type="submit" className="btn btn-secondary w-100">
            新增項目
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFeedbackOption;
