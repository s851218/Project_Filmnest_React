import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../slice/categorySlice";
import { setSearchText, setSearchValue, setIsSearchOpen } from "../slice/searchSlice";

export default function HeaderSmSearch() {
  const profile = useSelector((state) => state.user.profile);
  const searchValue = useSelector((state) => state.search.value);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const categoryData = ["喜劇", "愛情", "恐怖", "懸疑", "科幻", "紀錄片", "動畫", "實驗電影"];
  const [isExpand, setIsExpand] = useState({ category: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIsExpand = () => {
    setIsExpand((prev) => ({ ...prev, category: !prev.category }));
  };
  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setSearchValue("");
    }
    dispatch(setIsSearchOpen(!isSearchOpen));
  };
  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      dispatch(setSearchText(searchValue));
      dispatch(setIsSearchOpen(!isSearchOpen));
      navigate("/projectExplore");
    }
  };
  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <Link
            className="p-0 me-3"
            onClick={() => {
              handleSearchToggle();
              navigate(-1);
            }}
          >
            <img src="close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="logo" style={{ width: "20px" }} />
          </Link>
        </div>
        <div className="w-100">
          <div className="search-container">
            <div className={`search-input-container w-100 ${isSearchOpen ? "open" : ""}`}>
              <input type="text" className="search-input" placeholder="輸入影片名稱" value={searchValue} onChange={(e) => dispatch(setSearchValue(e.target.value))} />
              <span className="material-symbols-outlined search-input-search-icon" onClick={handleSearchSubmit}>
                Search
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
