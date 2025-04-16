import { Helmet } from "react-helmet-async";

export default function ProjectIntroInfoDisclosure() {
  return (
    <>
      <Helmet>
        <title>資訊揭露與承諾</title>
      </Helmet>
      <section className="information-disclosure">
        <div className="container pt-8 pb-10 py-md-15">
          <div className="row">
            <div className="col-10 mx-auto">
              <h2 className="fs-7 fs-lg-5 mb-3 mb-lg-5">資訊揭露與承諾條款</h2>
              <ol className="list-unstyled">
                <h3 className="fs-base fs-lg-7">1. 資訊揭露義務</h3>
                <li className="fs-sm fs-lg-base">
                  1.1
                  真實性與完整性:發起人(即募資項目發起者)承諾提供的所有信息均為真實、準確和完整,不得故意隱瞞、歪曲或虛報與募資項目有關的任何資訊。
                </li>
                <li className="fs-sm fs-lg-base">
                  1.2
                  及時性:發起人應在募資過程中及時更新所有與募資項目相關的資訊,包括但不限於項目進展、資金使用情況及風險提示。
                </li>
                <li className="fs-sm fs-lg-base">
                  1.3
                  關鍵信息披露:發起人應在募資前向投資者披露所有可能影響投資決策的重要信息,包括但不限於公司背景、財務狀況、業務計劃、風險因素等。
                </li>
              </ol>
              <ol className="list-unstyled">
                <h3 className="fs-base fs-lg-7">2. 資訊保密承諾</h3>
                <li className="fs-sm fs-lg-base">
                  2.1
                  保密義務:發起人和募資平台雙方承諾對於在募資過程中獲取的任何機密信息保密,未經對方書面同意,不得向任何第三方披露該信息。
                </li>
                <li className="fs-sm fs-lg-base">
                  2.2
                  使用限制:雙方同意僅將機密信息用於募資目的,不得將該信息用於其他目的或進行商業利用。
                </li>
                <li className="fs-sm fs-lg-base">
                  2.3
                  資料保護:雙方應採取合理的技術和管理措施,保護機密信息不被未經授權的第三方獲取或使用。
                </li>
              </ol>
              <ol className="list-unstyled">
                <h3 className="fs-base fs-lg-7">3. 承諾和擔保</h3>
                <li className="fs-sm fs-lg-base">
                  3.1
                  準確性承諾:發起人承諾所提供的資訊在所有實質方面均為準確、真實和完整,並對所提供資訊的準確性承擔法律責任。
                </li>
                <li className="fs-sm fs-lg-base">
                  3.2
                  不侵權承諾:發起人保證其提供的資訊和募資項目不侵犯任何第三方的知識產權,包括但不限於專利權、商標權和著作權。
                </li>
                <li className="fs-sm fs-lg-base">
                  3.3
                  合法性:發起人承諾其募資項目及其相關活動符合所有適用的法律、法規和規範。
                </li>
              </ol>
              <ol className="list-unstyled">
                <h3 className="fs-base fs-lg-7">4. 違約責任</h3>
                <li className="fs-sm fs-lg-base">
                  4.1
                  賠償責任:若發起人未能遵守本條款,導致投資者或募資平台蒙受損失,發起人應對所有實際損失負責,並賠償投資者或募資平台的損害。
                </li>
                <li className="fs-sm fs-lg-base">
                  4.2
                  解除合同:若發起人嚴重違反本條款,募資平台有權終止募資協議,並要求發起人賠償因此造成的損失。
                </li>
              </ol>
              <ol className="list-unstyled">
                <h3 className="fs-base fs-lg-7">5. 例外情況</h3>
                <li className="fs-sm fs-lg-base">
                  5.1
                  法律要求:如法律、法庭命令或政府機構要求披露資訊,發起人可在符合法律要求的情況下披露必要的信息,但應儘可能提前通知募資平台。
                </li>
                <li className="fs-sm fs-lg-base">
                  5.2
                  公共信息:若某些信息已公開或不再具備機密性,則保密義務不再適用。
                </li>
              </ol>
              <ol className="list-unstyled mb-6 mb-lg-8">
                <h3 className="fs-base fs-lg-7">6. 條款有效性</h3>
                <li className="fs-sm fs-lg-base">
                  6.1
                  持續有效:本條款在募資活動結束後仍然有效,直到所有相關機密信息被正式公開或不再具備機密性。
                </li>
              </ol>
              <p className="fs-sm fs-lg-base text-danger">
                這份範例條款內容設計了發起人與募資平台之間的資訊揭露與保密義務,並涵蓋了承諾、擔保、違約責任和例外情況。根據實際情況和平台要求,您可能需要進一步調整和補充具體條款。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
