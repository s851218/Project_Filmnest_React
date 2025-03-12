import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProjectIntroContent() {
  const projectInfo = useOutletContext();

  const [proposerPhoto, setProposerPhoto] = useState("");

  // 取得提案人照片
  useEffect(() => {
    if (!projectInfo.studioId) return;
    const getProposerData = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/studios/${projectInfo.studioId}`
        );
        setProposerPhoto(res.data.studioProfile?.studioImageUrl);
      } catch (error) {
        console.log("取得提案人資料失敗：", error);
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
                <img
                  className="object-fit-cover rounded-1 mb-4"
                  style={{ maxWidth: 200, height: 200 }}
                  src={proposerPhoto}
                  alt="導演照片"
                />
                <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">導演：周禹丞</h6>
                <p className="mb-3 mb-lg-4 text-start">
                  畢業於世新大學廣播電視電影學系電影組，現就讀國立臺北藝術大學電影創作學系研究所導演組。
                </p>
                <p className="mb-10 mb-lg-12 text-start">
                  善於觀察溫柔情感和人際關係的鏡頭捕捉，近年來從紀錄片創作中找到極大樂趣。希望能藉由更多的影像創作中找到真實且精彩的人生。攝影作品數部橫跨MV、廣告、形象、紀錄/劇情短片各類商業及藝術領域。
                </p>
                <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">
                  製片/企劃：陳甄容
                </h6>
                <p className="mb-3 mb-lg-4 text-start">
                  淡江大學中國文學系，現就讀台北藝術大學電影創作學系研究所電影產業研究組。
                </p>
                <p className="mb-10 mb-lg-12 text-start">
                  曾任職台北市電影委員會期間辦理電影劇本徵選、電影合作行銷計畫及國際動畫論壇講座等。曾任職國影中心擔任107年度優良電影劇本活動執行；2020【藝文記者實驗室】專案活動統籌、勞動金像獎&amp;勞工影展活動執行，2021【藝文記者入門課】專案活動統籌、2021蒙藏影展專案活動統籌、2022世界民族電影節活動執行、2022外交部新南向電影節活動執行、2023國影中心《影視聽名人堂》專案執行等。
                </p>
                <h6 className="mb-2 mb-lg-3 fs-sm fs-lg-base">攝影：黃泰誠</h6>
                <p className="mb-3 mb-lg-4 text-start">
                  朝陽科技大學傳播藝術系（Chaoyang University of Technology -
                  Department of Communication
                  Arts）畢業，北京電影學院攝影系交換生(2016)、金馬電影學院攝影學員(2021)，從短片創作、紀錄片逐漸累積成長養分。
                </p>
                <p className="text-start">
                  現今作品跨足於劇情片、紀錄片、廣告、MV等領域。
                  關注文化、在地、人性議題，著力於建立與導演意念連結之影像。以自然光感、色彩運用、有機攝影機運動轉譯角色情緒、故事本質。善於觀察與聆聽，具有創造性思維，在宏觀與微觀環境之中，發掘隱藏事物。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
