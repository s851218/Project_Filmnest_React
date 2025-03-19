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
