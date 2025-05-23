import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import { Toast } from "../../js/customSweetAlert";
import getNewTime from "../../helpers/getNewTime";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroNews() {
  const { id } = useParams();
  const [projectPosts, setProjectPosts] = useState([]);
  const [postsIsOpen, setPostsIsOpen] = useState([]);
  const newsCollapseRef = useRef([]);
  const newsCollapseInstances = useRef([]);
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
            `${apiBase}/posts?projectId=${params.projectId}`
          );
          const sortData = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setProjectPosts(sortData);
          setPostsIsOpen(
            response.data.map((item) => {
              return { id: item.id, isOpen: false };
            })
          );
        } catch (error) {
          if (error) {
            Toast.fire({
              icon: "error",
              title: "最新消息取得失敗",
            });
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [params]);

  useEffect(() => {
    newsCollapseRef.current.forEach((item, index) => {
      if (item) {
        newsCollapseInstances.current[index] = new Collapse(item, {
          toggle: false,
        });
      }
    });
  }, [projectPosts]);

  const handleCollapse = (id) => {
    setPostsIsOpen((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      );
    });

    const index = projectPosts.findIndex((item) => item.id === id);
    newsCollapseInstances.current[index].toggle();
  };

  return (
    <>
      <Helmet>
        <title>最新消息</title>
      </Helmet>
      <div className="container pt-8 pb-10 py-md-15">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="accordion" id="accordionPanelsStayOpenQA">
              {projectPosts.map((post, index) => (
                <div
                  className="accordion-item border border-primary-5 rounded mb-5"
                  key={post.id}
                >
                  <h4 className="accordion-header" id={`heading-${post.id}`}>
                    <button
                      className={`accordion-button rounded ${
                        postsIsOpen[index]?.isOpen ? "" : "collapsed"
                      } ${
                        postsIsOpen[index]?.isOpen
                          ? "bg-primary-8 text-white"
                          : "bg-primary-10 text-white"
                      }`}
                      type="button"
                      aria-expanded="false"
                      aria-controls={`collapse-${post.id}`}
                      onClick={() => handleCollapse(post.id)}
                    >
                      <div className="d-md-flex justify-content-md-between align-items-center w-100">
                        <h3 className="fs-base">{post.title}</h3>
                        <time className="fs-xs fs-md-sm text-primary-5 me-3">
                          {getNewTime(post.date)}
                        </time>
                      </div>
                    </button>
                  </h4>
                  <div
                    id={`collapse-${post.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${post.id}`}
                    data-bs-parent="#accordionPanelsStayOpenQA"
                    ref={(el) => (newsCollapseRef.current[index] = el)}
                  >
                    <div className="accordion-body fs-sm fs-md-base">
                      {post.content}
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
