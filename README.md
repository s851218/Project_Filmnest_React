orderStatus 訂單狀態:
0：訂單建立 => 未選擇付款別
1：訂單成立 => 已選擇付款別
2：訂單取消 => 取消訂單

paymentStatus 付款狀態:
0：未付款
1：已付款
2：已退款

shippingStatus 出貨狀態:
0：未出貨
1：已出貨
2：已退貨

"canCancel": true, // 可否取消訂單，已付款後 false
"canRefund": false, // 已付款後啟用，可否取消付款
"canReturn": false, // 已出貨後啟用，可否退貨

paymentMethod 付款方式 = {
type: {
0：信用卡付款
1：ATM 轉帳
2：超商代碼付款
}
"cardType": "creditCard" "信用卡" / "unionPay" "銀聯卡"
"method": "oneTime": "一次付清" / "installments": "分期付款",

---

"bankCode": "700", // 銀行代碼
"bankName": "中華郵政", // 銀行名稱
"accountNumber": "7003956781285716" // 帳戶號碼

---

paymentCode 超商繳費代碼
}
