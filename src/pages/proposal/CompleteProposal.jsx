import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

export default function CompleteProposal() {
  
  return (
    <>
      <Helmet>
        <title>完成提案 | 影巢 FilmNest</title>
      </Helmet>

      <div className="container pt-20 pt-xl-40 pb-10 pb-md-15 pb-xl-30 text-center">
        <div className="p-5 p-sm-8 p-md-10 text-center">
          <h1 className="fs-5 fs-md-1 mb-4"><i className="bi bi-check-circle me-2" />專案已提交</h1>
          <h2 className="fs-5 fs-md-1 mb-8"><i className="bi bi-clock me-2" />待審核</h2>
          <p className="fs-base fs-md-6">感謝您的提交<br/>我們會在3~5個工作日審核完畢<br/>請您耐心等待</p>
        </div>
        <Link to="/" className="btn btn-primary fw-bolder py-3 px-20 w-100 w-md-auto mb-4 mb-md-0 me-md-5">返回首頁</Link>
        <Link to="/projectExplore" className="btn btn-primary fw-bolder py-3 px-20 w-100 w-md-auto">查看其他專案</Link>
      </div>
    </>
  )
}