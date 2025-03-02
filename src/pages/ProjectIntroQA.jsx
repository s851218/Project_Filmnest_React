import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroQA() {
  const { id } = useParams();
  const [projectFaqs, setProjectFaqs] = useState([]);
  const [faqsIsOpen,setFaqsIsOpen] = useState([]);
  const faqsCollapseRef = useRef([]);
  const faqsCollapseInstances = useRef([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiBase}/faqs?projectId=${id}`);
        setProjectFaqs(response.data);
        setFaqsIsOpen(response.data.map((item)=>{
          return ({id:item.id,isOpen:false})
        }))
      } catch (error) {
        alert("最新消息取得失敗");
      }
    })();
  }, []);

  useEffect(() => {
    faqsCollapseRef.current.forEach((item, index) => {
      if (item) {
        faqsCollapseInstances.current[index] = new Collapse(item, { toggle: false });
      }
    });
  }, [projectFaqs]);

  const handleCollapse = (id) => {
    setFaqsIsOpen((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      );
    });

    const index = projectFaqs.findIndex((item)=>item.id === id)
    faqsCollapseInstances.current[index].toggle();
    
  };
  

  return (
    <>
      <div className="container pt-8 pb-10 py-md-15">
        {projectFaqs.map((item,index) => {
          return (
              <div className="row mb-3" key={item.id}>
                  <div className="col-10 mx-auto">
                      <button class="btn btn-primary w-100 fs-5 d-flex justify-content-between" type="button" onClick={() => handleCollapse(item.id)}>
                      <span><span className="me-3">Q{index+1}:</span>{item.title} </span>{(faqsIsOpen[index].isOpen) ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
                      </button>
                    <div class="collapse " ref={(el) => (faqsCollapseRef.current[index] = el)}>
                      <div class="card card-body">{item.content}</div>
                    </div>
                  </div>
              </div>
          );
        })}
      </div>
    </>
  );
}
