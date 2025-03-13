import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroNews() {
  const { id } = useParams();
  const [projectPosts, setProjectPosts] = useState([]);
  const [postsIsOpen,setPostsIsOpen] = useState([]);
  const newsCollapseRef = useRef([]);
  const newsCollapseInstances = useRef([]);
  const [ params , setParams ] = useState({})

  const getTime = (time) =>{
    const newTime = new Date(time).toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(/\//g, "-")
    return newTime
  }

  //處理params
  useEffect(()=>{
    if (id) {
      const paramsArry = id.split("&")
      let paramsObj = {}
      paramsArry.forEach((param)=>{
        let [ key , value ] = param.split("=")
        paramsObj[key] = Number(value)
      })
      console.log(paramsObj);
      setParams(paramsObj)
    }
  },[id])

  useEffect(() => {
    if (params.projectId) {
      (async () => {
        try {
          const response = await axios.get(`${apiBase}/posts?projectId=${params.projectId}`);
          setProjectPosts(response.data);
          setPostsIsOpen(response.data.map((item)=>{
            return ({id:item.id,isOpen:false})
          }))
        } catch (error) {
          alert("最新消息取得失敗");
        }
      })();
    }
  }, [params]);

  useEffect(() => {
    newsCollapseRef.current.forEach((item, index) => {
      if (item) {
        newsCollapseInstances.current[index] = new Collapse(item, { toggle: false });
      }
    });
  }, [projectPosts]);

  const handleCollapse = (id) => {
    setPostsIsOpen((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      );
    });

    const index = projectPosts.findIndex((item)=>item.id === id)
    newsCollapseInstances.current[index].toggle();
    
  };
  

  return (
    <>
      <div className="container pt-8 pb-10 py-md-15">
        {projectPosts.map((item,index) => {
          return (
              <div className="row mb-3" key={item.id}>
                  <div className="col-10 mx-auto">
                      <button class="btn btn-primary w-100 fs-5 d-flex justify-content-between" type="button" onClick={() => handleCollapse(item.id)}>
                        <span>{item.title}</span> <span className="d-flex align-items-center"><span className="fs-base me-2">{getTime(item.date)}</span>{(postsIsOpen[index].isOpen) ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}</span>
                      </button>
                    <div class="collapse " ref={(el) => (newsCollapseRef.current[index] = el)}>
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
