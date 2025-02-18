import { createHashRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProjectExplore from "../pages/ProjectExplore";
import Login from "../pages/Login";
import AboutProposal from "../pages/AboutProposal";
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
import Feedback from "../adminPages/Feedback";
import AboutStudio from "../pages/AboutStudio";
import TermsOfUse from "../pages/TermsOfUse";

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
        path: "aboutProposal",
        element: <AboutProposal />,
      },
      {
        path: "aboutStudio",
        element: <AboutStudio />,
      },{
        path: "termsOfUse",
        element: <TermsOfUse />,
      }
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
            path: "adminAnsComment",
            element: <AdminAnsComment />,
          },
          {
            path: "adminEdit",
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
                element: <Feedback />,
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
          {
            path: "adminChart",
            element: <AdminChart />,
          },
        ],
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
