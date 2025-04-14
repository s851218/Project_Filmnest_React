import { createSlice } from "@reduxjs/toolkit";

const paymentInfoSlice = createSlice({
  name: "paymentInfo",
  initialState: {
    userInfo: {
      userName: "",
      userPhone: "",
      userEmail: "",
    },
    recipientInfo: {
      recipientName: "", 
      recipientPhone: "", 
      recipientEmail: "", 
    },
    sameAsMember: false, 
    address: {

    },
    accordion: {
      index: 0,
    },
    paymentOption: {

    },
  },
  reducers: {
    setPaymentInfo(state, action) {
      const { type , data } = action.payload
      state[type] = data
    },
    setAccordionIndex(state, action) {
      // 寫入當前手風琴選擇 => 付款方式(信用卡/ATM/超商代碼)
      state.accordion.index = action.payload
    },
    setPaymentOption(state, action) {
      // 寫入付款方式內容
      state.paymentOption = action.payload
    },
  }
})

export const { setPaymentInfo , setAccordionIndex , setPaymentOption } = paymentInfoSlice.actions

export default paymentInfoSlice.reducer