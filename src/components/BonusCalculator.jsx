import PropTypes from "prop-types"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"

export default function BonusCalculator ({ bonus , setBonus , type , reference }) {
  const { register , reset , handleSubmit } = useForm({defaultValues:{customized:""}})

  useImperativeHandle(reference,() => ({
    submit : handleSubmit(onsubmit),
  }))

  // 處理按鈕金額
  const handleAddBonus = (e) => {
    const addBonus = Number(e.target.value)
    const newBonus = bonus + addBonus
    setBonus(newBonus)
  }

  // 處理重製
  const handleResetBonus = () => {
    setBonus(0)
  }
  
  // 處理自訂金額
  const onsubmit = (data) => {
    const addBouns = Number(data.customized)
    const newBonus = bonus + addBouns
    setBonus(newBonus)
    reset()
  }

  return (
    <>
      <div className="btn-group w-100 mb-4">
        <button className="btn btn-secondary btn-base w-100 add-amount rounded-start-1" value={100} onClick={(e) => handleAddBonus(e)}>+100</button>
        <button className="btn btn-secondary btn-base w-100 add-amount" value={500} onClick={(e) => handleAddBonus(e)}>+500</button>
        <button className="btn btn-secondary btn-base w-100 add-amount rounded-end-1" value={1000} onClick={(e) => handleAddBonus(e)}>+1,000</button>
      </div>
      <div className="input-group mb-4">
        <input type="text" name="customized" id="customized" placeholder="自訂金額" className="form-control rounded-start-1" {...register("customized")} />
        { (type === "layout") && <button type="button" className="btn btn-primary btn-base border-white" id="addCustomAmount" onClick={handleSubmit(onsubmit)}>加碼</button> }
        <button type="button" className="btn btn-secondary btn-base rounded-end-1" id="resetCustomAmount" onClick={handleResetBonus}>重設</button>
      </div>
    </>
  )
}
BonusCalculator.propTypes = {
  bonus: PropTypes.number, 
  setBonus: PropTypes.func, 
  type: PropTypes.string, 
  reference: PropTypes.shape({ current: PropTypes.any }),
};