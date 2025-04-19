import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setSearchText, setSearchValue, setIsSearchOpen } from "../slice/searchSlice";

export default function HeaderSmSearch() {
  const searchValue = useSelector((state) => state.search.value);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchToggle = () => {
    dispatch(setIsSearchOpen(!isSearchOpen));
  };
  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      dispatch(setSearchText(searchValue));
      navigate("/projectExplore");
    } else {
      dispatch(setSearchText(""));
      navigate("/projectExplore");
    }
  };
  return (
    <>
      <div className="py-3 d-flex justify-content-between align-items-center container">
        <div>
          <Link
            className="me-3"
            onClick={() => {
              handleSearchToggle();
              navigate(-1);
            }}
          >
            <img src="close_white.png" alt="close" style={{ width: "20px" }} />
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
