import { useOutletContext } from "react-router";

export default function ProjectIntroContent() {
  const projectInfo = useOutletContext();

  return (
    <>
      <div className="pt-8 pb-10 py-md-15">
        <div className="container">
          <div className="row justify-content-between">
            {/* 專案介紹內文 */}
            <div
              className="col-lg-8"
              dangerouslySetInnerHTML={{ __html: projectInfo.content }}
            />
            {/* 製作團隊介紹 */}
            <div className="col-lg-4 ps-lg-12">
              <div className="p-5 p-sm-8 p-lg-10 bg-producer text-center">
                  <h4 className="mb-3 mb-lg-5 fs-base fs-lg-7 fw-bolder">
                    製作團隊介紹
                  </h4>
                  {projectInfo.team?.map((member,index) => (
                    <div key={member.id} className={`${ index+1 === projectInfo.team.length ? "" : "mb-6 mb-lg-12"}`}>
                      {" "}
                      <img
                        className="object-fit-cover rounded-1 mb-4"
                        style={{ maxWidth: 200, height: 200 }}
                        src={member.photo || "sampleImg.jpg"}
                        alt={`${member.name} 照片`}
                      />
                      <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">{`${member.jobTitle}：${member.name}`}</h6>
                      <p className="fs-sm text-start mb-0">{member.introduction}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* 專案介紹內文 */}
          {/* <section className="row mb-8 mb-lg-15">
            <div className="col-lg-1" />
            <div
              className="col-lg-10"
              dangerouslySetInnerHTML={{ __html: projectInfo.content }}
            ></div>
            <div className="col-lg-1" />
          </section> */}
          {/* 製作團隊介紹 */}
          {/* <section className="row pt-10 pb-8">
            <div className="col-lg-8 mx-auto">
              <div className="p-5 p-lg-10 bg-producer text-center">
                <h4 className="mb-3 mb-lg-5 fs-base fs-lg-7 fw-bolder">
                  製作團隊介紹
                </h4>
                {projectInfo.team?.map((member) => (
                  <div key={member.id} className="mb-12">
                    {" "}
                    <img
                      className="object-fit-cover rounded-1 mb-4"
                      style={{ maxWidth: 200, height: 200 }}
                      src={member.photo || "sampleImg.jpg"}
                      alt={`${member.name} 照片`}
                    />
                    <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">{`${member.jobTitle}：${member.name}`}</h6>
                    <p>{member.introduction}</p>
                  </div>
                ))}
              </div>
            </div>
          </section> */}
        </div>
      </div>
      {/* <GrayScreenLoading isLoading={isLoading} /> */}
    </>
  );
}
