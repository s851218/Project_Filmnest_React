import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const paymentInfoSlice = createSlice({
  name: "paymentInfo",
  initialState: {
    userInfo: {
      userName: "王曉明",
      userPhone: "0912345678",
      userEmail: "aaa@gmail.com",
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
    requried: {
      paymentInfo: false,
      paymentType: false,
    },
  },
  reducers: {
    setUserInfo(state, action) {
      // 寫入會員資料

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
      if (action.payload) {
        return {
          ...state,
          sameAsMember: action.payload,
        }
      }
    },
    setAccordionIndex(state, action) {
      // 寫入當前手風琴選擇 => 付款方式(信用卡/ATM/超商代碼)
      state.accordion.index = action.payload
    },
    setPaymentOption(state, action) {
      // 寫入付款方式內容
      state.paymentOption = action.payload
    },
    setRequried(state,action) {
      console.log(action.payload)
      const { name , value } = action.payload
      switch (name) {
        case "paymentInfo":
          state.requried.paymentInfo = value
          break;
        case "paymentType":
          state.requried.paymentType = value
          break;
      
        default:
          break;
      }
    },
  }
})

export const { setAddress , setRecipientInfo , setSameAsMember , setAccordionIndex , setPaymentOption , setRequried } = paymentInfoSlice.actions

export default paymentInfoSlice.reducer