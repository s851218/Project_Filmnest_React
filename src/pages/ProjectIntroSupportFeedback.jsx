import { useSelector } from "react-redux";
import FeedbackSwiper from "../components/FeedbackSwiper";

export default function ProjectIntroSupportFeedback() {
  const userId = useSelector((state) => state.user.profile.userId);
  const selected = useSelector((state) => state.paymentInfo.selected);

  console.log("userId", userId, "selected", selected);
  return (
    <>
      <FeedbackSwiper />
    </>
  );
}
