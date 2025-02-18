import { useDispatch } from "react-redux";
import { setLogout } from "../slice/userSlice";

export default function PersonalCenter() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <>
      <div className="container pt-20 pb-10">
        <h1>會員中心</h1>
        <button type="button" className="btn btn-info" onClick={handleLogout}>
          登出
        </button>
      </div>
    </>
  );
}
