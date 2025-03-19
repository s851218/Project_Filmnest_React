import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
    setUserInfo(state, action) {
      // 寫入會員資料
      state.userInfo = action.payload
    },
    setRecipientInfo(state, action) {
      // 寫入收件人資料
      state.recipientInfo = action.payload
    },
    setAddress(state, action) {
      // 寫入地址
      state.address = action.payload
    },
    setSameAsMember(state, action) {
      // 收件人同會員
      state.sameAsMember = action.payload
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

export const { setUserInfo , setAddress , setRecipientInfo , setSameAsMember , setAccordionIndex , setPaymentOption } = paymentInfoSlice.actions

export default paymentInfoSlice.reducer