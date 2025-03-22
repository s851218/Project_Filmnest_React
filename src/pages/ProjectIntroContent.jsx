import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import GrayScreenLoading from "../components/GrayScreenLoading";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroContent() {
  const projectInfo = useOutletContext();

  const [proposerPhoto, setProposerPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 取得提案人照片
  useEffect(() => {
    if (!projectInfo.studioId) return;
    const getProposerData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/studios/${projectInfo.studioId}`
        );
        setProposerPhoto(res.data.studioProfile?.studioImageUrl);
      } catch (error) {
        console.log("取得提案人資料失敗：", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProposerData();
  }, [projectInfo.studioId]);

  return (
    <>
      {/* 專案介紹內文 */}
      <div className="pt-8 pb-10 py-md-15">
        <div className="container">
          <section className="row mb-8 mb-lg-15">
            <div className="col-lg-1" />
            <div
              className="col-lg-10"
              dangerouslySetInnerHTML={{ __html: projectInfo.content }}
            ></div>
            <div className="col-lg-1" />
          </section>
          {/* 製作團隊介紹 */}
          <section className="row pt-10 pb-8">
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
                      src={member.photo || "假圖.jpg"}
                      alt={`${member.name} 照片`}
                    />
                    <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">{`${member.jobTitle}：${member.name}`}</h6>
                    <p>{member.introduction}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
