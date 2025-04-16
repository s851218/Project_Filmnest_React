import axios from "axios";
import { Collapse } from "bootstrap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import GrayScreenLoading from "../../components/GrayScreenLoading";
import { Toast } from "../../assets/js/costomSweetAlert";
const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectIntroNews() {
  const { id } = useParams();
  const [projectPosts, setProjectPosts] = useState([]);
  const [postsIsOpen, setPostsIsOpen] = useState([]);
  const newsCollapseRef = useRef([]);
  const newsCollapseInstances = useRef([]);
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getTime = (time) => {
    const newTime = new Date(time)
      .toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-");
    return newTime;
  };

  //處理params
  useLayoutEffect(() => {
    if (id) {
      const paramsArry = id.split("&");
      let paramsObj = {};
      paramsArry.forEach((param) => {
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
        {projectPosts.map((item, index) => {
          return (
            <div className="row mb-5" key={item.id}>
              <div className="col-10 mx-auto">
                <div className="border border-0 border-primary-5 rounded box-shadow">
                  <button
                    className={`text-white py-3 px-4 w-100 fs-5 d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between border-1 ${
                      postsIsOpen[index].isOpen
                        ? "bg-primary-6"
                        : "bg-primary-10"
                    }`}
                    type="button"
                    onClick={() => handleCollapse(item.id)}
                  >
                    <span className="fs-base d-flex justify-content-between">
                      {item.title}
                      {postsIsOpen[index].isOpen ? (
                        <i className="bi bi-chevron-up fs-sm d-lg-none"></i>
                      ) : (
                        <i className="bi bi-chevron-down fs-sm d-lg-none"></i>
                      )}
                    </span>

                    <span className="d-flex align-self-start align-items-center">
                      <time className="fs-xs fs-md-sm text-primary-5 me-2">
                        {getTime(item.date)}
                      </time>
                      {postsIsOpen[index].isOpen ? (
                        <i className="bi bi-chevron-up fs-7 d-none d-lg-block"></i>
                      ) : (
                        <i className="bi bi-chevron-down fs-7 d-none d-lg-block"></i>
                      )}
                    </span>
                  </button>
                  <div
                    className="collapse "
                    ref={(el) => (newsCollapseRef.current[index] = el)}
                  >
                    <div className="card card-body">{item.content}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
