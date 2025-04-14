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
  }
})

export const { setPaymentInfo } = paymentInfoSlice.actions

export default paymentInfoSlice.reducer