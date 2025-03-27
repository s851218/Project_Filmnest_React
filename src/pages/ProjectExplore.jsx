import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import Card from "../components/Card";
import { ScrollRestoration, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import GrayScreenLoading from "../components/GrayScreenLoading";
import { Alert } from "../assets/js/costomSweetAlert";

const apiBase = import.meta.env.VITE_API_BASE;

export default function ProjectExplore() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.type);
  const searchText = useSelector((state) => state.search.text);

  const getProjectsData = useCallback(async () => {
    setIsLoading(true);
    let apiUrl;
    if (!category || category === "all") {
      apiUrl = `${apiBase}/projects`;
    } else if (category && category !== "all") {
      apiUrl = `${apiBase}/projects?category=${category}`;
      dispatch(setCategory(category));
    }
    try {
      const response = await axios.get(apiUrl);
      if (searchText) {
        const newData = response.data.filter((item) => item.projectTitle.toLowerCase().includes(searchText.toLowerCase())); //toLowerCase()轉小寫比較
        setProjects(newData);
      } else {
        setProjects(response.data);
      }
    } catch (error) {
      if (error) {
        Alert.fire({
          icon: "error",
          title: "取得專案資料失敗",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, searchText, dispatch]);

  const handleSwitchCategory = (e) => {
    const { value } = e.target;
    dispatch(setCategory(value));
  };

  useLayoutEffect(() => {
    getProjectsData();
  }, [getProjectsData, category, searchText]);

  useEffect(() => {
    return () => {
      dispatch(setCategory("all"));
    };
  }, [location.pathname, dispatch]);

  return (
    <>
      <ScrollRestoration />
      <Helmet>
        <title>探索全部專案</title>
      </Helmet>
      <div className="container pt-20 pb-10">
        <div className="pt-5">
          <div className="container" style={{ boxShadow: "0px 20px 20px -20px #ffffff33" }}>
            <div className="d-flex pb-5 border-bottom border-primary-9 project-spacing">
              <div className="d-flex align-items-center">
                <span className="project-select me-md-3 fs-sm fs-md-base">專案分類</span>
                <select className="form-select fs-sm fs-md-base project-option" aria-label="Default select example" defaultValue={category} onChange={handleSwitchCategory}>
                  <option value="all">全部專案</option>
                  <option value="喜劇">喜劇</option>
                  <option value="愛情">愛情</option>
                  <option value="恐怖">恐怖</option>
                  <option value="懸疑">懸疑</option>
                  <option value="科幻">科幻</option>
                  <option value="紀錄片">紀錄片</option>
                  <option value="動畫">動畫</option>
                  <option value="實驗電影">實驗電影</option>
                </select>
              </div>
              <div className="d-flex align-items-center">
                <span className="project-select me-md-3 fs-sm fs-md-base">專案狀態</span>
                <select className="form-select fs-sm fs-md-base" aria-label="Default select example">
                  <option value="3">進行中</option>
                  <option value="1">即將開始</option>
                  <option value="2">已結案</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            {projects.length !== 0 ? (
              <Card projects={projects} isSwiper={false} />
            ) : (
              <div className="row justify-content-center mt-15">
                <div className="col-8 bg-primary-6 rounded-3">
                  <div className="d-flex justify-content-center py-15">
                    <h2 className="fs-base fs-lg-6">無任何資料</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <GrayScreenLoading isLoading={isLoading} />
    </>
  );
}
