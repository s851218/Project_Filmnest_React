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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiBase}/posts?projectId=${id}`);
        setProjectPosts(response.data);
        setPostsIsOpen(response.data.map((item)=>{
          return ({id:item.id,isOpen:false})
        }))
      } catch (error) {
        alert("最新消息取得失敗");
      }
    })();
  }, []);

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
                        {item.title} {(postsIsOpen[index].isOpen) ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
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
