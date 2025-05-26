import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Toast } from "../../js/customSweetAlert";
import GrayScreenLoading from "../../components/GrayScreenLoading";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroQA() {
  const { id } = useParams();
  const [projectFaqs, setProjectFaqs] = useState([]);
  const [faqsIsOpen, setFaqsIsOpen] = useState([]);
  const faqsCollapseRef = useRef([]);
  const faqsCollapseInstances = useRef([]);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //處理params
  useLayoutEffect(() => {
    if (id) {
      const paramsArray = id.split("&");
      let paramsObj = {};
      paramsArray.forEach((param) => {
        let [key, value] = param.split("=");
        paramsObj[key] = Number(value);
      });
      setParams(paramsObj);
    }
  }, [id]);

  useLayoutEffect(() => {
    if (params.projectId) {
      (async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${apiBase}/faqs?projectId=${params.projectId}`
          );
          setProjectFaqs(response.data);
          setFaqsIsOpen(
            response.data.map((item) => {
              return { id: item.id, isOpen: false };
            })
          );
        } catch (error) {
          if (error) {
            Toast.fire({
              icon: "error",
              title: "常見問題取得失敗",
            });
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [params]);

  useEffect(() => {
    faqsCollapseRef.current.forEach((item, index) => {
      if (item) {
        faqsCollapseInstances.current[index] = new Collapse(item, {
          toggle: false,
        });
      }
    });
  }, [projectFaqs]);

  const handleCollapse = (id) => {
    setFaqsIsOpen((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      );
    });

    const index = projectFaqs.findIndex((item) => item.id === id);

    if (faqsCollapseInstances.current[index]) {
      faqsCollapseInstances.current[index].toggle();
    } else {
      console.warn(`Collapse instance for FAQ id ${id} 未建立，操作中斷`);
    }
  };

  return (
    <>
      <Helmet>
        <title>常見問題</title>
      </Helmet>
      <div className="container pt-8 pb-10 py-md-15">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="accordion" id="accordionPanelsStayOpenQA">
              {projectFaqs.map((faq, index) => (
                <div
                  className="accordion-item border border-primary-5 rounded mb-5"
                  key={faq.id}
                >
                  <h4 className="accordion-header" id={`heading-${faq.id}`}>
                    <button
                      className={`accordion-button rounded ${
                        faqsIsOpen[index]?.isOpen ? "" : "collapsed"
                      } ${
                        faqsIsOpen[index]?.isOpen
                          ? "bg-primary-8 text-white"
                          : "bg-primary-10 text-white"
                      }`}
                      type="button"
                      aria-expanded="false"
                      aria-controls={`collapse-${faq.id}`}
                      onClick={() => handleCollapse(faq.id)}
                    >
                      <span className="me-4 fw-bolder">Q{index + 1}</span>
                      <span>{faq.title}</span>
                    </button>
                  </h4>
                  <div
                    id={`collapse-${faq.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${faq.id}`}
                    data-bs-parent="#accordionPanelsStayOpenQA"
                    ref={(el) => (faqsCollapseRef.current[index] = el)}
                  >
                    <div className="accordion-body fs-sm fs-md-base">
                      {faq.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
