import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

export default function BonusCalculator ({ originPrice , totalPrice , setTotalPrice }) {
  const { register , reset , control , handleSubmit } = useForm({defaultValues:{customized:""}})

  // 處理按鈕金額
  const handleAddBonus = (e) => {
    const addBouns = Number(e.target.value)
    const newPrice = totalPrice + addBouns
    setTotalPrice(newPrice)
  }

  // 處理重製
  const handleResetBonus = (e) => {
    const resetPrice = Number(e.target.value)
    setTotalPrice(resetPrice)
  }
  
  // 處理自訂金額
  const onsubmit = (data) => {
    const addBouns = Number(data.customized)
    const newPrice = totalPrice + addBouns
    setTotalPrice(newPrice)
    reset()
  }

  // 表單監控
  const watch = useWatch({control})
  useEffect(()=>{
    console.log(watch);
  },[watch])


  return (
    <>
      <div className="btn-group w-100 mb-4">
        <button className="btn btn-secondary w-100 add-amount rounded-start-1" value={100} onClick={(e) => handleAddBonus(e)}>+100</button>
        <button className="btn btn-secondary w-100 add-amount" value={500} onClick={(e) => handleAddBonus(e)}>+500</button>
        <button className="btn btn-secondary w-100 add-amount rounded-end-1" value={1000} onClick={(e) => handleAddBonus(e)}>+1,000</button>
      </div>
      <div className="input-group mb-4">
        <input type="text" name="customized" id="customized" placeholder="自訂金額" className="form-control rounded-start-1" {...register("customized")} />
        <button type="button" className="btn btn-primary border-white" id="addCustomAmount" onClick={handleSubmit(onsubmit)}>加碼</button>
        <button type="button" className="btn btn-secondary rounded-end-1" id="resetCustomAmount" value={originPrice} onClick={(e) => handleResetBonus(e)}>重設</button>
      </div>
      
    </>
  )
}