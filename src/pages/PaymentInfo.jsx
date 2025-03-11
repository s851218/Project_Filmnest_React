import { useRef } from "react"
import PaymentAside from "../components/PaymentAside"
import PaymentMobileFooter from "../components/PaymentMobileFooter"
import PaymentInfoFrom from "../components/PaymentInfoFrom"
import PaymentCollapseFrom from "../components/PaymentCollapseFrom"

export default function PaymentInfo () {

  const infoFromRef = useRef()
  const paymentFromRef = useRef()

  // 送出表單 => props傳遞給aside footer
  const handleFormsSubmit = async() => {
    console.log(infoFromRef.current.submitForm())
    console.log(paymentFromRef.current.submitForm)
    await infoFromRef.current.submitForm()
    await paymentFromRef.current.submitForm()
  }
  
  return (
    <>
      <div className="container mb-20" style={{marginTop: 88}}>
        <div className="row">
          <main className="col-lg-8">
            {/* 付款資料 V */}
            <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款資料</h2>
            <PaymentInfoFrom reference={infoFromRef} />
            {/* 付款方式 V */}
            <h2 className="fs-lg-3 fs-4 text-primary-2 mb-4">付款方式</h2>
            <PaymentCollapseFrom reference={paymentFromRef}/>
          </main>
          
          <PaymentAside handleFormsSubmit={handleFormsSubmit}/>
        </div>
      </div>

      <PaymentMobileFooter handleFormsSubmit={handleFormsSubmit} />
      
      
    </>
  )
}