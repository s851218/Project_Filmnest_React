import { createHashRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProjectExplore from "../pages/ProjectExplore";
import Login from "../pages/Login";
import Admin from "../Admin";
import AdminHome from "../adminPages/AdminHome";
import AdminProfile from "../adminPages/AdminProfile";
import AdminAnsComment from "../adminPages/AdminAnsComment";
import AdminEdit from "../adminPages/AdminEdit";
import AdminMedia from "../adminPages/AdminMedia";
import AdminUpload from "../adminPages/AdminUpload";
import AdminChart from "../adminPages/AdminChart";
import Post from "../adminPages/Post";
import Intro from "../adminPages/Intro";
import Faq from "../adminPages/Faq";
import SignUp from "../pages/Signup";
import TermsOfUse from "../pages/TermsOfUse";
import FeedbackPage from "../pages/FeedbackPage";
import ProjectIntro from "../pages/ProjectIntro";
import ProjectIntroContent from "../pages/ProjectIntroContent";
import ProjectIntroNews from "../pages/ProjectIntroNews";
import ProjectIntroSupportFeedback from "../pages/ProjectIntroSupportFeedback";
import ProjectIntroQA from "../pages/ProjectIntroQA";
import ProjectIntroComments from "../pages/ProjectIntroComments";
import ProjectIntroInfoDisclosure from "../pages/ProjectIntroInfoDisclosure";
import HeaderSm from "../components/HeaderSm";
import HeaderSmSec from "../components/HeaderSmSec";
import HeaderSmSearch from "../components/HeaderSmSearch";
import AdminProjectsHome from "../adminPages/AdminProjectsHome";
import AdminHeaderSm from "../AdminComponents/AdminHeaderSm";
import FeedbackOption from "../pages/FeedbackOption";
import AdminFeedbackForm from "../adminPages/Feedback";
// aboutStudioPage
import AboutStudio from "../pages/aboutStudio/AboutStudio";
import AboutContent from "../pages/aboutStudio/AboutContent";
// PersonalCenter
import ViewRecords from "../pages/personalCenter/ViewRecords";
import FavoriteVideo from "../pages/personalCenter/FavoriteVideo";
import PersonalCenter from "../pages/personalCenter/PersonalCenter";
import Profile from "../pages/personalCenter/Profile";
import FavoriteProject from "../pages/personalCenter/FavoriteProject";
import OrderRecords from "../pages/personalCenter/OrderRecords";
import OrderRecordsAll from "../pages/personalCenter/OrderRecordsAll";
import OrderRecordsDetail from "../pages/personalCenter/OrderRecordsDetail";
import ProfilePassword from "../pages/personalCenter/ProfilePassword";
// proposal
import AboutProposal from "../pages/proposal/AboutProposal";
import CreateProposal from "../pages/proposal/CreateProposal";
import CompleteProposal from "../pages/proposal/CompleteProposal";
// payment
import PaymentInfo from "../pages/payment/PaymentInfo";
import PaymentComplete from "../pages/payment/PaymentComplete";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "projectExplore",
        element: <ProjectExplore />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "personalCenter",
        element: <PersonalCenter />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profilePassword",
            element: <ProfilePassword />,
          },
          {
            path: "favoriteProject",
            element: <FavoriteProject />,
          },
          {
            path: "orderRecords",
            element: <OrderRecords />,
            children: [
              {
                path: "orderRecordsAll",
                element: <OrderRecordsAll />,
              },
              {
                path: "orderRecordsSuccess",
                element: <OrderRecordsAll />,
              },
              {
                path: "orderRecordsFailed",
                element: <OrderRecordsAll />,
              },
              {
                path: "orderRecordsUnpaid",
                element: <OrderRecordsAll />,
              },
              {
                path: ":id",
                element: <OrderRecordsDetail />,
              },
            ],
          },
          {
            path: "favoriteVideo",
            element: <FavoriteVideo />,
          },
          {
            path: "viewRecords",
            element: <ViewRecords />,
          },
        ],
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "aboutProposal",
        element: <AboutProposal />,
      },
      {
        path: "termsOfUse",
        element: <TermsOfUse />,
      },
      {
        path: "createProposal",
        element: <CreateProposal />,
      },
      {
        path: "completeProposal",
        element: <CompleteProposal />,
      },
      {
        path: "feedbackPage/:id",
        element: <FeedbackPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectIntro />,
        children: [
          {
            index: true,
            element: <ProjectIntroContent />,
          },
          {
            path: "news",
            element: <ProjectIntroNews />,
          },
          {
            path: "supportFeedback",
            element: <ProjectIntroSupportFeedback />,
          },
          {
            path: "QA",
            element: <ProjectIntroQA />,
          },
          {
            path: "comments",
            element: <ProjectIntroComments />,
          },
          {
            path: "infoDisclosure",
            element: <ProjectIntroInfoDisclosure />,
          },
          {
            path: "aboutStudio",
            element: <AboutStudio />,
            children: [
              {
                path: "aboutStudioOngoing",
                element: <AboutContent />,
              },
              {
                path: "aboutStudioFin",
                element: <AboutContent />,
              },
              {
                path: "aboutStudioOthers",
                element: <AboutContent />,
              },
            ],
          },
        ],
      },
      {
        path: "feedbackOption/:id",
        element: <FeedbackOption />,
      },
      {
        path: "paymentInfo/:id",
        element: <PaymentInfo />,
      },
      {
        path: "completePayment",
        element: <PaymentComplete />,
      },
      {
        path: "completeOrder",
        element: <PaymentComplete />,
      },
      {
        path: "headerSm",
        element: <HeaderSm />,
      },
      {
        path: "headerSmSec",
        element: <HeaderSmSec />,
      },
      {
        path: "headerSmSearch",
        element: <HeaderSmSearch />,
      },
      {
        path: "adminHeaderSm",
        element: <AdminHeaderSm />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <AdminHome />,
        children: [
          {
            path: "adminProfile",
            element: <AdminProfile />,
          },
          {
            path: "adminProjectsHome",
            element: <AdminProjectsHome />,
          },
          {
            path: ":id",
            element: <AdminEdit />,
            children: [
              {
                path: "intro",
                element: <Intro />,
              },
              {
                path: "post",
                element: <Post />,
              },
              {
                path: "faq",
                element: <Faq />,
              },
              {
                path: "feedback",
                element: <AdminFeedbackForm />,
              },
              {
                path: "adminChart",
                element: <AdminChart />,
              },
              {
                path: "adminAnsComment",
                element: <AdminAnsComment />,
              },
            ],
          },
          {
            path: "adminMedia",
            element: <AdminMedia />,
          },
          {
            path: "adminUpload",
            element: <AdminUpload />,
          },
        ],
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
